"use client";

import { useMemo, useState } from "react";

type OptionKey = "A" | "B" | "C" | "D";

type Question = {
  section: string;
  prompt: string;
  options: Record<OptionKey, string>;
  correct: OptionKey;
  explanation: string;
};

type PatientData = {
  firstName: string;
  lastName: string;
  alignId: string;
};

type Report = PatientData & {
  score: number;
  percent: number;
  passed: boolean;
  prizeStatus: string;
  completedAt: string;
  wrongAnswers: { question: string; selected: string; correct: string }[];
};

const PASS_PERCENT = 80;
const STORAGE_KEY = "patient-expert-program-reports";

const questions: Question[] = [
  {
    section: "Problemi comuni",
    prompt: "Se si stacca un attachment, cosa bisogna fare?",
    options: {
      A: "Sospendere subito la terapia fino al prossimo controllo.",
      B: "Tornare alla mascherina precedente.",
      C: "Continuare normalmente con le mascherine e segnalarlo allo studio al prossimo controllo o secondo le indicazioni ricevute.",
      D: "Usare la mascherina solo di notte.",
    },
    correct: "C",
    explanation:
      "La perdita di un attachment non richiede quasi mai l'interruzione immediata della terapia. Nella maggior parte dei casi si continua ad avanzare con le mascherine, salvo diversa indicazione del medico.",
  },
  {
    section: "Problemi comuni",
    prompt: "Se si stacca un bottone per gli elastici da un lato, cosa bisogna fare?",
    options: {
      A: "Sospendere tutti gli elastici e fermare la terapia.",
      B: "Continuare a usare l'elastico dall'altro lato, se presente, e proseguire con i cambi mascherina.",
      C: "Buttare la mascherina attuale.",
      D: "Tornare indietro di tre mascherine.",
    },
    correct: "B",
    explanation:
      "Se un bottone si stacca, non bisogna bloccare tutta la terapia. Si continua a usare l'altro lato, se presente, e si segnala il problema allo studio.",
  },
  {
    section: "Problemi comuni",
    prompt: "Appena si cambia mascherina, e normale che non calzi perfettamente?",
    options: {
      A: "No, deve essere perfetta dal primo minuto.",
      B: "Si, puo esserci un piccolo disadattamento iniziale che tende a migliorare nei primi giorni.",
      C: "No, bisogna sempre tornare alla mascherina precedente.",
      D: "Si, ma solo se non viene portata di notte.",
    },
    correct: "B",
    explanation:
      "Quando si cambia mascherina puo esserci una fase iniziale di adattamento. Di solito dopo uno o due giorni di uso corretto calza meglio.",
  },
  {
    section: "Problemi comuni",
    prompt: "Se la mascherina non fitta bene sui laterali superiori o sui canini, cosa bisogna fare?",
    options: {
      A: "Fermarsi immediatamente.",
      B: "Tagliare la mascherina nella zona che non fitta.",
      C: "Proseguire fino a diversa indicazione del medico, perche in quelle zone puo capitare un lieve disadattamento residuo.",
      D: "Portarla solo durante il giorno.",
    },
    correct: "C",
    explanation:
      "Laterali superiori e canini sono zone in cui puo capitare un piccolo disadattamento. Se il medico ha dato indicazione di proseguire, non bisogna interrompere autonomamente.",
  },
  {
    section: "Problemi comuni",
    prompt: "Se la mascherina non fitta bene in fondo appena cambiata, cosa conviene fare?",
    options: {
      A: "Cambiarla la mattina e controllare subito.",
      B: "Cambiarla la sera, dormirci sopra e valutare il mattino successivo.",
      C: "Buttarla e passare direttamente alla successiva.",
      D: "Non indossarla per 24 ore.",
    },
    correct: "B",
    explanation:
      "Se il problema e posteriore, spesso conviene cambiare mascherina la sera. Dopo una notte di utilizzo puo assestarsi meglio.",
  },
  {
    section: "Igiene e alimentazione",
    prompt: "Come si lavano correttamente le mascherine?",
    options: {
      A: "Con acqua bollente.",
      B: "Con acqua fredda, spazzolino e dentifricio, oppure con prodotti dedicati.",
      C: "In lavastoviglie.",
      D: "Con candeggina diluita.",
    },
    correct: "B",
    explanation:
      "Le mascherine vanno lavate con acqua fredda, spazzolino e dentifricio, oppure prodotti specifici. L'acqua calda puo deformarle.",
  },
  {
    section: "Igiene e alimentazione",
    prompt: "Si puo mangiare con le mascherine inserite?",
    options: {
      A: "Si, sempre.",
      B: "Si, ma solo cibi morbidi.",
      C: "No, bisogna toglierle per mangiare.",
      D: "Si, se poi si lavano subito.",
    },
    correct: "C",
    explanation:
      "Con le mascherine non si mangia. Mangiare con gli allineatori inseriti puo deformarli, sporcarli, romperli o compromettere l'igiene.",
  },
  {
    section: "Igiene e alimentazione",
    prompt: "Si puo bere con le mascherine inserite?",
    options: {
      A: "Si, soprattutto acqua; attenzione invece alle bevande colorate o zuccherate.",
      B: "No, non si puo bere nulla.",
      C: "Si, qualunque bevanda senza limiti.",
      D: "Solo bevande calde.",
    },
    correct: "A",
    explanation:
      "L'acqua e consentita. Bevande colorate, zuccherate o acide possono macchiare le mascherine e aumentare il rischio di carie.",
  },
  {
    section: "Sintomi e collaborazione",
    prompt: "Quali sintomi possono essere normali nei primi giorni con una nuova mascherina?",
    options: {
      A: "Dolenzia, fastidio alla masticazione e sensazione strana nel parlare.",
      B: "Febbre alta.",
      C: "Gonfiore importante del viso.",
      D: "Sanguinamento abbondante.",
    },
    correct: "A",
    explanation:
      "Nei primi giorni puo esserci dolenzia, fatica a masticare e una lieve alterazione della parlata. Sono sintomi comuni di adattamento.",
  },
  {
    section: "Uso corretto",
    prompt: "Cosa bisogna fare con le vecchie mascherine?",
    options: {
      A: "Buttarle appena si passa alla successiva.",
      B: "Tenerle fino a quando non si hanno le nuove mascherine e fino a diversa indicazione dello studio.",
      C: "Buttarle tutte ogni mese.",
      D: "Tenerne solo una a caso.",
    },
    correct: "B",
    explanation:
      "Non bisogna mai rimanere senza mascherine. Le precedenti possono servire in caso di perdita, rottura, problemi di fitting o ritardi.",
  },
  {
    section: "Problemi comuni",
    prompt: "Se si perde la mascherina attuale, cosa bisogna fare?",
    options: {
      A: "Rimanere senza mascherina fino al prossimo appuntamento.",
      B: "Valutare se passare alla successiva se calza bene, oppure usare la precedente se la successiva non entra correttamente.",
      C: "Smettere la terapia.",
      D: "Usare solo gli elastici senza mascherina.",
    },
    correct: "B",
    explanation:
      "Il paziente non deve restare senza allineatore. Se la successiva calza bene puo proseguire; se non calza, meglio usare la precedente e contattare lo studio.",
  },
  {
    section: "Problemi comuni",
    prompt: "Se una mascherina si rompe leggermente ma rimane utilizzabile, cosa bisogna fare?",
    options: {
      A: "Valutare se continuare a usarla fino al cambio previsto, se resta stabile e non ferisce.",
      B: "Buttarla sempre immediatamente.",
      C: "Usarla solo per mangiare.",
      D: "Tagliarla completamente.",
    },
    correct: "A",
    explanation:
      "Una piccola rottura non sempre richiede interruzione. Se la mascherina resta stabile, non punge e calza correttamente, spesso si puo continuare fino al cambio.",
  },
  {
    section: "Uso corretto",
    prompt: "Quante ore al giorno bisogna portare le mascherine?",
    options: {
      A: "Solo la notte.",
      B: "8 ore al giorno.",
      C: "Il piu possibile, generalmente circa 22 ore al giorno, salvo diversa indicazione.",
      D: "Solo quando si e a casa.",
    },
    correct: "C",
    explanation:
      "Gli allineatori funzionano solo se portati con costanza. Il riferimento e circa 22 ore al giorno, togliendoli principalmente per mangiare e lavare i denti.",
  },
  {
    section: "Sintomi e collaborazione",
    prompt: "Se si dimenticano gli elastici per un giorno, cosa bisogna fare?",
    options: {
      A: "Recuperare mettendo il doppio degli elastici il giorno dopo.",
      B: "Ricominciare appena possibile seguendo le indicazioni ricevute.",
      C: "Sospendere anche le mascherine.",
      D: "Tornare alla prima mascherina.",
    },
    correct: "B",
    explanation:
      "Non bisogna compensare con soluzioni improvvisate. Se si dimenticano gli elastici, si ricomincia appena possibile secondo le indicazioni del medico.",
  },
  {
    section: "Sintomi e collaborazione",
    prompt: "Se gli elastici vengono dimenticati spesso, cosa puo succedere?",
    options: {
      A: "Nulla, gli elastici sono decorativi.",
      B: "La terapia puo rallentare o non ottenere la correzione programmata.",
      C: "I denti si muovono piu velocemente.",
      D: "Le mascherine diventano piu comode.",
    },
    correct: "B",
    explanation:
      "Gli elastici, quando prescritti, sono parte attiva della terapia. Una collaborazione scarsa puo rallentare o compromettere il risultato.",
  },
  {
    section: "Problemi comuni",
    prompt: "Se una mascherina punge o graffia leggermente la gengiva o la guancia, cosa si puo fare?",
    options: {
      A: "Sospendere la terapia.",
      B: "Usare una limetta pulita per smussare delicatamente il bordo fastidioso, se indicato, oppure segnalarlo allo studio.",
      C: "Scaldare la mascherina con acqua bollente.",
      D: "Tagliare meta mascherina.",
    },
    correct: "B",
    explanation:
      "Un piccolo bordo fastidioso puo spesso essere rifinito con attenzione. Non bisogna deformare la mascherina con calore ne tagliarla in modo aggressivo.",
  },
  {
    section: "Uso corretto",
    prompt: "Quando si cambia mascherina, qual e il momento migliore?",
    options: {
      A: "Preferibilmente la sera, cosi la mascherina lavora durante la notte.",
      B: "Sempre prima di pranzo.",
      C: "Solo al mattino appena svegli.",
      D: "E meglio cambiarla mentre si mangia.",
    },
    correct: "A",
    explanation:
      "Cambiare la mascherina la sera e spesso piu comodo: le prime ore di pressione avvengono durante il sonno e il fitting puo migliorare entro il mattino.",
  },
  {
    section: "Sintomi e collaborazione",
    prompt: "Se una mascherina sembra molto stretta nei primi minuti, cosa significa?",
    options: {
      A: "E sempre sbagliata.",
      B: "Puo essere normale: la nuova mascherina esercita una pressione iniziale sui denti.",
      C: "Va buttata subito.",
      D: "Bisogna portarla solo 10 minuti al giorno.",
    },
    correct: "B",
    explanation:
      "Una sensazione di pressione iniziale e normale. Deve pero restare tollerabile e migliorare progressivamente.",
  },
  {
    section: "Uso corretto",
    prompt: "Se si rimane senza mascherina per diversi giorni, cosa puo succedere?",
    options: {
      A: "Nulla, i denti restano sempre fermi.",
      B: "I denti possono muoversi e la mascherina successiva potrebbe non calzare piu correttamente.",
      C: "La terapia accelera.",
      D: "Gli attachment si riattaccano da soli.",
    },
    correct: "B",
    explanation:
      "Interrompere l'uso delle mascherine puo causare perdita di tracking e spostamenti indesiderati. Per questo e fondamentale non rimanere senza allineatore.",
  },
  {
    section: "Igiene e alimentazione",
    prompt: "Se dopo aver mangiato non e possibile lavare subito i denti, cosa e meglio fare?",
    options: {
      A: "Non rimettere piu la mascherina per tutto il giorno.",
      B: "Sciacquare bene la bocca e rimettere la mascherina appena possibile, lavando i denti appena si puo.",
      C: "Rimettere la mascherina sporca di cibo senza sciacquare.",
      D: "Pulire i denti con alcol.",
    },
    correct: "B",
    explanation:
      "L'ideale e lavare sempre i denti prima di reinserire le mascherine. Se non e possibile, meglio sciacquare bene e lavare appena possibile.",
  },
  {
    section: "Igiene e alimentazione",
    prompt: "Se si beve caffe, te, vino o bevande colorate con le mascherine, cosa puo succedere?",
    options: {
      A: "Nulla.",
      B: "Le mascherine possono macchiarsi e aumentare il rischio di pigmentazioni o accumulo di residui, ma a livello di terapia non succede nulla.",
      C: "Le mascherine diventano piu resistenti.",
      D: "I denti si spostano piu velocemente.",
    },
    correct: "B",
    explanation:
      "Le bevande colorate possono macchiare le mascherine e trattenere residui. Meglio rimuoverle, bere, lavare o sciacquare la bocca e poi reinserirle.",
  },
  {
    section: "Sintomi e collaborazione",
    prompt: "Qual e il comportamento corretto durante tutta la terapia?",
    options: {
      A: "Decidere autonomamente quando fermarsi o cambiare programma.",
      B: "Seguire le indicazioni ricevute, portare le mascherine con costanza e non interrompere la terapia senza indicazione medica.",
      C: "Portare le mascherine solo quando fanno male.",
      D: "Cambiare mascherina piu velocemente se si vuole finire prima.",
    },
    correct: "B",
    explanation:
      "La terapia funziona se il paziente segue il programma. Cambiare tempi, sospendere o modificare l'uso senza indicazione medica puo compromettere il risultato.",
  },
  {
    section: "Problemi comuni",
    prompt: "Se una mascherina non entra completamente, cosa non bisogna fare?",
    options: {
      A: "Forzarla violentemente fino a deformarla.",
      B: "Controllare se e la mascherina corretta.",
      C: "Verificare se si sta inserendo nel verso giusto.",
      D: "Confrontarla con quella precedente.",
    },
    correct: "A",
    explanation:
      "La mascherina non va forzata in modo aggressivo. Se non entra davvero, bisogna verificare numero, verso e corretto inserimento, poi seguire le indicazioni dello studio.",
  },
  {
    section: "Sintomi e collaborazione",
    prompt: "Perche e importante presentarsi ai controlli con le mascherine indicate?",
    options: {
      A: "Perche il medico puo controllare fitting, tracking e andamento della terapia.",
      B: "Perche servono solo come promemoria estetico.",
      C: "Non serve portarle ai controlli.",
      D: "Perche vengono sempre buttate dallo studio.",
    },
    correct: "A",
    explanation:
      "Le mascherine permettono di verificare se il movimento programmato sta procedendo correttamente. Sono uno strumento di controllo clinico.",
  },
  {
    section: "Uso corretto",
    prompt: "Se una mascherina viene lasciata al sole, in auto o vicino a fonti di calore, cosa puo succedere?",
    options: {
      A: "Puo deformarsi.",
      B: "Diventa piu trasparente.",
      C: "Si sterilizza automaticamente.",
      D: "Diventa piu morbida e quindi migliore.",
    },
    correct: "A",
    explanation:
      "Il calore puo deformare gli allineatori. Le mascherine vanno conservate nella loro scatolina, lontano da fonti di calore.",
  },
];

function hasAlignId(value: string) {
  return value.trim().length > 0;
}

function normalizePdfText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/[()\\]/g, "\\$&");
}

function makeCertificateCode(report: Report) {
  const seed = `${report.firstName}|${report.lastName}|${report.alignId}|${report.completedAt}|${report.score}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return `PEP-${hash.toString(16).toUpperCase().padStart(8, "0")}`;
}

function wrapLine(text: string, max = 78) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (`${current} ${word}`.trim().length > max) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  }
  if (current) lines.push(current);
  return lines;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function drawWrappedCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  words.forEach((word) => {
    const nextLine = `${line} ${word}`.trim();
    if (ctx.measureText(nextLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = word;
    } else {
      line = nextLine;
    }
  });
  if (line) ctx.fillText(line, x, y);
}

function jpegBytesToPdf(jpegBytes: Uint8Array) {
  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets = [0];
  let offset = 0;

  const addString = (value: string) => {
    const bytes = encoder.encode(value);
    chunks.push(bytes);
    offset += bytes.length;
  };
  const addBytes = (bytes: Uint8Array) => {
    chunks.push(bytes);
    offset += bytes.length;
  };
  const addObject = (id: number, body: () => void) => {
    offsets[id] = offset;
    addString(`${id} 0 obj\n`);
    body();
    addString("\nendobj\n");
  };

  const pageContent = "q 595 0 0 842 0 0 cm /CertImage Do Q";
  addString("%PDF-1.4\n");
  addObject(1, () => addString("<< /Type /Catalog /Pages 2 0 R >>"));
  addObject(2, () => addString("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"));
  addObject(3, () =>
    addString(
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /CertImage 4 0 R >> >> /Contents 5 0 R >>",
    ),
  );
  addObject(4, () => {
    addString(
      `<< /Type /XObject /Subtype /Image /Width 1240 /Height 1754 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`,
    );
    addBytes(jpegBytes);
    addString("\nendstream");
  });
  addObject(5, () =>
    addString(`<< /Length ${pageContent.length} >>\nstream\n${pageContent}\nendstream`),
  );

  const xrefOffset = offset;
  addString("xref\n0 6\n0000000000 65535 f \n");
  for (let i = 1; i <= 5; i += 1) {
    addString(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  addString(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  const blobParts = chunks.map((chunk) => new Uint8Array(chunk).buffer);
  return new Blob(blobParts, { type: "application/pdf" });
}

async function createPdf(report: Report) {
  const certificateCode = makeCertificateCode(report);
  const validPrize = report.passed && hasAlignId(report.alignId);
  const patientName = `${report.firstName.trim()} ${report.lastName.trim()}`.trim();
  const statusTitle = validPrize
    ? "Valido per il ritiro dello Smile Kit Extra"
    : "Non valido per il ritiro dello Smile Kit Extra";
  const statusBody = validPrize
    ? "Questo documento conferisce diritto al ritiro dello Smile Kit Extra."
    : "Per convalidarlo presentarsi eventualmente con il KIT INIZIALE fornito ad inizio terapia o ripetere il test inserendo il proprio ID Align.";
  const canvas = document.createElement("canvas");
  canvas.width = 1240;
  canvas.height = 1754;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas non disponibile");

  const [logo, watermark] = await Promise.all([
    loadImage("/images/brand/logo-trimmed.png"),
    loadImage("/images/brand/identico-filigree-watermark.png"),
  ]);

  ctx.fillStyle = "#F8FAFB";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (watermark) {
    ctx.globalAlpha = 0.5;
    ctx.drawImage(watermark, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
  }
  const wash = ctx.createLinearGradient(0, 0, 0, canvas.height);
  wash.addColorStop(0, "rgba(248,250,251,0.92)");
  wash.addColorStop(1, "rgba(239,248,250,0.96)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#02070A";
  ctx.fillRect(0, 0, canvas.width, 220);
  ctx.fillStyle = "#00323D";
  ctx.fillRect(0, 220, canvas.width, 18);
  ctx.fillStyle = "#00DDF9";
  ctx.fillRect(120, 232, 360, 5);

  if (logo) {
    const logoHeight = 112;
    const logoWidth = (logo.width / logo.height) * logoHeight;
    ctx.drawImage(logo, 110, 52, logoWidth, logoHeight);
  } else {
    ctx.fillStyle = "#F8FAFB";
    ctx.font = "700 54px Arial";
    ctx.fillText("iDenTiCo", 120, 118);
  }
  ctx.fillStyle = "#F8FAFB";
  ctx.font = "700 30px Arial";
  ctx.fillText("iDenTiCo", 260, 92);
  ctx.fillStyle = "#C5CCD3";
  ctx.font = "400 25px Arial";
  ctx.fillText("Dr. Giorgio Comola", 260, 128);
  ctx.fillStyle = "#00DDF9";
  ctx.font = "700 16px Arial";
  ctx.fillText("DIGITAL ORTHODONTICS & CLINICAL EDUCATION", 260, 162);

  ctx.fillStyle = "#006D88";
  ctx.font = "700 26px Arial";
  ctx.fillText("PATIENT EXPERT CERTIFICATE", 120, 386);
  ctx.fillStyle = "#A8B5BE";
  ctx.font = "400 21px Arial";
  ctx.fillText("Terapia con allineatori trasparenti", 120, 424);

  ctx.fillStyle = "#111827";
  ctx.font = "400 34px Arial";
  ctx.fillText("Si attesta che:", 120, 545);
  ctx.fillStyle = "#00323D";
  ctx.font = "700 72px Arial";
  ctx.fillText(patientName, 120, 638);
  ctx.fillStyle = "#111827";
  ctx.font = "400 38px Arial";
  ctx.fillText(`ha ottenuto ${report.percent}% di risposte corrette`, 120, 710);
  ctx.fillStyle = "#006D88";
  ctx.font = "700 22px Arial";
  ctx.fillText(`${report.score}/${questions.length} risposte corrette`, 120, 752);

  ctx.fillStyle = validPrize ? "#E8FCFF" : "#FFF7ED";
  ctx.strokeStyle = validPrize ? "#00DDF9" : "#F59E0B";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(120, 910, 1000, 270, 22);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = validPrize ? "#00323D" : "#92400E";
  ctx.font = "700 34px Arial";
  ctx.fillText(statusTitle, 170, 1004);
  ctx.fillStyle = "#111827";
  ctx.font = "400 25px Arial";
  drawWrappedCanvasText(ctx, statusBody, 170, 1060, 890, 36);

  ctx.fillStyle = "#111827";
  ctx.font = "400 22px Arial";
  ctx.fillText(
    `ID Align: ${hasAlignId(report.alignId) ? report.alignId.trim() : "non inserito"}`,
    120,
    1288,
  );
  ctx.fillText(`Data: ${report.completedAt}`, 120, 1330);
  ctx.fillText(`Codice certificato: ${certificateCode}`, 120, 1372);

  ctx.fillStyle = "#02070A";
  ctx.fillRect(0, 1595, canvas.width, 159);
  ctx.fillStyle = "#F8FAFB";
  ctx.font = "700 32px Arial";
  ctx.fillText("iDenTiCo", 120, 1680);
  ctx.fillStyle = "#C5CCD3";
  ctx.font = "400 21px Arial";
  ctx.fillText("Dr. Giorgio Comola", 300, 1680);
  ctx.fillStyle = "#00DDF9";
  ctx.font = "700 22px Arial";
  ctx.fillText("Smile Kit Extra", 910, 1680);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  const binary = window.atob(dataUrl.split(",")[1]);
  const jpegBytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) jpegBytes[i] = binary.charCodeAt(i);
  return jpegBytesToPdf(jpegBytes);
}

function saveReport(report: Report) {
  try {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Report[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([report, ...previous].slice(0, 50)));
  } catch {
    // Local persistence is optional: the certificate remains downloadable.
  }
}

export function PatientExpertProgram() {
  const [started, setStarted] = useState(false);
  const [patient, setPatient] = useState<PatientData>({
    firstName: "",
    lastName: "",
    alignId: "",
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<number, OptionKey>>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [showAlignConfirm, setShowAlignConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const current = questions[questionIndex];
  const selected = answers[questionIndex];
  const progress = report ? 100 : Math.round((questionIndex / questions.length) * 100);

  const canStart = patient.firstName.trim() && patient.lastName.trim();

  const score = useMemo(
    () =>
      questions.reduce(
        (total, question, index) => total + (answers[index] === question.correct ? 1 : 0),
        0,
      ),
    [answers],
  );

  function startQuiz() {
    if (!canStart) return;
    setStarted(true);
  }

  function chooseAnswer(key: OptionKey) {
    if (showFeedback || report) return;
    setAnswers((currentAnswers) => ({ ...currentAnswers, [questionIndex]: key }));
    setShowFeedback(true);
  }

  function buildReport(finalPatient: PatientData) {
    const finalScore = questions.reduce(
      (total, question, index) => total + (answers[index] === question.correct ? 1 : 0),
      0,
    );
    const percent = Math.round((finalScore / questions.length) * 100);
    const passed = percent >= PASS_PERCENT;
    const validPrize = passed && hasAlignId(finalPatient.alignId);
    const nextReport: Report = {
      ...finalPatient,
      score: finalScore,
      percent,
      passed,
      prizeStatus: validPrize
        ? "Valido per il ritiro dello Smile Kit Extra"
        : "Non valido per il ritiro dello Smile Kit Extra",
      completedAt: new Date().toLocaleString("it-IT"),
      wrongAnswers: questions
        .map((question, index) => ({
          question: question.prompt,
          selected: answers[index] ?? "-",
          correct: question.correct,
        }))
        .filter((item, index) => item.selected !== questions[index].correct),
    };
    saveReport(nextReport);
    setReport(nextReport);
    setShowAlignConfirm(false);
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((index) => index + 1);
      setShowFeedback(false);
      return;
    }
    const percent = Math.round((score / questions.length) * 100);
    if (percent >= PASS_PERCENT && !hasAlignId(patient.alignId)) {
      setShowAlignConfirm(true);
      return;
    }
    buildReport(patient);
  }

  function retry() {
    setAnswers({});
    setQuestionIndex(0);
    setShowFeedback(false);
    setReport(null);
    setShowAlignConfirm(false);
    setMessage("");
  }

  async function downloadPdf(nextReport = report) {
    if (!nextReport) return null;
    const blob = await createPdf(nextReport);
    const fileName = `patient-expert-certificate-${nextReport.lastName || "paziente"}.pdf`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    return new File([blob], fileName, { type: "application/pdf" });
  }

  async function sharePdf() {
    if (!report) return;
    const blob = await createPdf(report);
    const file = new File([blob], "patient-expert-certificate.pdf", {
      type: "application/pdf",
    });
    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: "Patient Expert Certificate",
        text: "Patient Expert Certificate - Dr. Giorgio Comola",
        files: [file],
      });
      return;
    }
    await downloadPdf(report);
    setMessage(
      "Condivisione diretta non disponibile su questo dispositivo. Scarica il PDF e invialo manualmente via WhatsApp.",
    );
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-titanium/60 bg-white/[0.92] p-5 shadow-panel sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            25 domande / soglia 80%
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-teal-deep sm:text-3xl">
            Completa i tuoi dati
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/[0.72]">
            Nome e cognome sono obbligatori. L&apos;ID paziente Align e opzionale per
            provare il quiz, ma necessario per rendere il certificato valido per
            il ritiro dello Smile Kit Extra.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-teal-deep">
            Nome
            <input
              required
              value={patient.firstName}
              onChange={(event) =>
                setPatient((value) => ({ ...value, firstName: event.target.value }))
              }
              className="rounded-lg border border-titanium/70 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-teal-deep">
            Cognome
            <input
              required
              value={patient.lastName}
              onChange={(event) =>
                setPatient((value) => ({ ...value, lastName: event.target.value }))
              }
              className="rounded-lg border border-titanium/70 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/30"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-teal-deep sm:col-span-2">
            ID paziente Align <span className="font-normal text-ink/55">opzionale</span>
            <input
              value={patient.alignId}
              onChange={(event) =>
                setPatient((value) => ({ ...value, alignId: event.target.value }))
              }
              className="rounded-lg border border-titanium/70 bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/30"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={startQuiz}
          disabled={!canStart}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-canvas transition hover:bg-teal disabled:cursor-not-allowed disabled:bg-titanium disabled:text-ink/45"
        >
          Inizia il Patient Expert Program
        </button>
      </div>
    );
  }

  if (showAlignConfirm) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-aqua/40 bg-night p-5 text-canvas shadow-panel sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aqua">
          ID Align mancante
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          Prima del PDF finale, vuoi inserire l&apos;ID paziente Align?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-canvas/[0.72]">
          Senza ID Align il certificato sara scaricabile, ma riportera: &quot;Non
          valido per il ritiro dello Smile Kit Extra&quot;.
        </p>
        <label className="mt-6 grid gap-2 text-sm font-semibold text-canvas">
          ID paziente Align
          <input
            value={patient.alignId}
            onChange={(event) =>
              setPatient((value) => ({ ...value, alignId: event.target.value }))
            }
            className="rounded-lg border border-white/[0.16] bg-white/[0.08] px-4 py-3 text-base text-canvas outline-none transition focus:border-aqua focus:ring-2 focus:ring-aqua/30"
          />
        </label>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => buildReport(patient)}
            className="rounded-full bg-aqua px-6 py-3 text-sm font-semibold text-night transition hover:bg-canvas"
          >
            Genera PDF con ID Align
          </button>
          <button
            type="button"
            onClick={() => buildReport({ ...patient, alignId: "" })}
            className="rounded-full border border-white/[0.18] px-6 py-3 text-sm font-semibold text-canvas transition hover:border-aqua hover:text-aqua"
          >
            Confermo senza ID
          </button>
        </div>
      </div>
    );
  }

  if (report) {
    const validPrize = report.passed && hasAlignId(report.alignId);
    return (
      <div className="mx-auto max-w-4xl rounded-xl border border-titanium/60 bg-white/[0.94] p-5 shadow-panel sm:p-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
              Risultato finale
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-teal-deep">
              {report.passed ? "Quiz superato" : "Quiz non superato"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/[0.72]">
              {report.passed
                ? validPrize
                  ? "Complimenti, il certificato e valido per il ritiro dello Smile Kit Extra e puo essere scaricato o condiviso via WhatsApp."
                  : "Complimenti, il certificato e scaricabile ma non e valido per il ritiro dello Smile Kit Extra perche non contiene l'ID paziente Align."
                : "Non hai ancora raggiunto il punteggio minimo. Rivedi le risposte corrette e riprova."}
            </p>
          </div>
          <div className="rounded-lg border border-titanium/60 bg-aqua-wash p-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Punteggio
            </span>
            <strong className="mt-2 block text-4xl text-teal-deep">
              {report.score}/{questions.length}
            </strong>
            <p className="mt-1 text-sm font-semibold text-ink/70">{report.percent}%</p>
            <p className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-deep">
              {report.prizeStatus}
            </p>
          </div>
        </div>

        {report.wrongAnswers.length ? (
          <div className="mt-6 rounded-lg border border-titanium/60 p-4">
            <h3 className="font-semibold text-teal-deep">Risposte da rivedere</h3>
            <ul className="mt-3 grid gap-2 text-sm text-ink/70">
              {report.wrongAnswers.map((item, index) => (
                <li key={`${item.question}-${index}`}>
                  {item.question} <strong>Corretta: {item.correct}</strong>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {report.passed ? (
            <>
              <button
                type="button"
                onClick={() => downloadPdf()}
                className="rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-canvas transition hover:bg-teal"
              >
                Scarica PDF
              </button>
              <button
                type="button"
                onClick={sharePdf}
                className="rounded-full bg-aqua px-6 py-3 text-sm font-semibold text-night transition hover:bg-teal hover:text-canvas"
              >
                Condividi WhatsApp
              </button>
            </>
          ) : null}
          <button
            type="button"
            onClick={retry}
            className="rounded-full border border-titanium/70 px-6 py-3 text-sm font-semibold text-teal-deep transition hover:border-aqua hover:bg-aqua/10"
          >
            Riprova
          </button>
        </div>
        {message ? <p className="mt-4 text-sm text-ink/65">{message}</p> : null}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-titanium/60 bg-white/[0.94] p-5 shadow-panel sm:p-8">
      <div className="mb-5">
        <div className="h-2 overflow-hidden rounded-full bg-titanium/50">
          <div
            className="h-full rounded-full bg-aqua transition-all"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          <span>{current.section}</span>
          <span>
            {questionIndex + 1}/{questions.length}
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold leading-tight text-teal-deep">
        {current.prompt}
      </h2>
      <div className="mt-6 grid gap-3">
        {(Object.keys(current.options) as OptionKey[]).map((key) => {
          const active = selected === key;
          const isCorrect = showFeedback && key === current.correct;
          const isWrong = showFeedback && active && key !== current.correct;
          return (
            <button
              key={key}
              type="button"
              onClick={() => chooseAnswer(key)}
              className={[
                "flex min-h-16 items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-aqua/40",
                isCorrect
                  ? "border-aqua bg-aqua/15 text-teal-deep"
                  : isWrong
                    ? "border-red-300 bg-red-50 text-red-900"
                    : active
                      ? "border-teal bg-teal/10 text-teal-deep"
                      : "border-titanium/70 bg-white text-ink/78 hover:border-aqua/70 hover:bg-aqua/5",
              ].join(" ")}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-deep text-xs text-canvas">
                {key}
              </span>
              <span>{current.options[key]}</span>
            </button>
          );
        })}
      </div>

      {showFeedback ? (
        <div className="mt-5 rounded-lg border border-titanium/60 bg-aqua-wash p-4 text-sm leading-relaxed text-ink/75">
          <strong className="text-teal-deep">
            {selected === current.correct ? "Risposta corretta." : "Da correggere."}
          </strong>{" "}
          {current.explanation}
        </div>
      ) : null}

      <button
        type="button"
        onClick={nextQuestion}
        disabled={!showFeedback}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-canvas transition hover:bg-teal disabled:cursor-not-allowed disabled:bg-titanium disabled:text-ink/45"
      >
        {questionIndex === questions.length - 1 ? "Vedi risultato" : "Prossima domanda"}
      </button>
    </div>
  );
}
