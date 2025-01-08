
const popups = {
    gliAllineatori: `
        <h2>Gli allineatori</h2>
        <button onclick="showAnswer('Se hai il seguente passa al prossimo, altrimenti torna al precedente. NON RIMANERE SENZA')">
            <span class="icon">❓</span> Ho perso il mio allineatore, cosa devo fare?
        </button>
        <button onclick="showAnswer('Prova quella successiva, se anche quella dopo non entra torna alla precedente e contatta lo studio per anticipare la tua visita')">
            <span class="icon">➡️</span> La mascherina dopo non calza
        </button>
        <button onclick="showAnswer('Puó capitare, ogni mascherina ha un effetto diverso, assicurati di cambiarle la sera, prima di andare a dormire. Puoi eccezionalmente prendere un antinfiammatorio')">
            <span class="icon">💊</span> La mascherina nuova fa piú male del solito
        </button>
        <button onclick="showAnswer(' Tutto nella norma, gli attachments vengono messi con una colla provvisoria, saremo noi a valutare se dovremo rimetterli, NON anticipare il tuo appuntamento')">
            <span class="icon">🔧</span> Ho perso degli attachments
        </button>
        <button onclick="showAnswer('Continua assolutamente a portare gli elastici dal lato che te lo permette, chiama lo studio per anticipare il tuo appuntamento al primo disponibile')">
            <span class="icon">🦷</span> Ho perso uno dei bottoni per mettere gli elastici
        </button>
        <button onclick="showAnswer('Allunga di alcuni giorni l\'utilizzo della mascherina fino ad un massimo di una settimana extra, assicurati di usarla per 22h al giorno. NOTA BENE Se succede sui due denti superiori laterali la problematica NON è rilevante, continua normalmente')">
            <span class="icon">⚠️</span> La mascherina calza male / Non copre tutti miei denti
        </button>
        <button onclick="showAnswer('Mantieni l\'ultima solo di notte fino al tuo prossimo appuntamento, NON RIMANERE MAI SENZA!')">
            <span class="icon">⏳</span> Non ho piú mascherine da cambiare
        </button>
        <button onclick="showAnswer('Lima il bordo tagliente con una limetta per le unghie senza alcun timore')">
            <span>&#x1FA78;</span> Il bordo della mascherina mi graffia
        </button>
    `,
    leContenzioni: `
        <h2>Le contenzioni</h2>
        <button onclick="showAnswer('Usa la contenzione giorno e notte per almeno 2 settimane, è normale avere fastidio, se dopo due settimane le contenzioni non calzano bene, prenota una visita')">
            <span class="icon">🕒</span> Sono rimasto senza contenzioni per piú di un mese ed ora non calzano bene
        </button>
        <button onclick="showAnswer('Mettiti in contatto con lo studio per valutare una eventuale ristampa')">
            <span class="icon">📞</span> Sono arrivato alla terza contenzione, dopo non ne ho piú
        </button>
        <button onclick="showAnswer('Contatta SUBITO lo studio e fissa un appuntamento urgente')">
            <span class="icon">🚨</span> Mi si è rotto lo splintaggio
        </button>
    `,
    usoManutenzione: `
        <h2>Uso, cambi, manutenzione</h2>
        <button onclick="showAnswer('Lavare con acqua fredda spazzolino e dentifricio, o utilizzare prodotti specifici tipo: Geldis')">
            <span class="icon">🧽</span> Lavaggio
        </button>
        <button onclick="showAnswer('Conservare sempre nella loro custodia')">
            <span class="icon">🗂️</span> Conservazione
        </button>
        <button onclick="showAnswer('Si puó bere tutto, caldo o freddo che sia, assicurarsi solo di sciacquare la bocca se il liquido è colorato')">
            <span class="icon">🥤</span> Bere
        </button>
        <button onclick="showAnswer('Si, il caffé è concesso')">
            <span class="icon">☕</span> Caffè
        </button>
        <button onclick="showAnswer('Per mangiare vanno rimossi')">
            <span class="icon">🍴</span> Mangiare
        </button>
          <button onclick="showAnswer('Non puoi lavare i denti? sciacqua bocca e mascherine con un po' di acqua, ma indossale')">
            <span>&#x1F355;</span> Dopo Mangiato
        </button>

       
        <button onclick="showAnswer('Si fuma con gli allineatori INDOSSATI')">
            <span class="icon">🚬</span> Fumare
        </button>
    `
};

function openPopup(type) {
    const popupBody = document.getElementById('popupBody');
    if (popups[type]) {
        popupBody.innerHTML = popups[type];
        document.getElementById('popup').classList.remove('hidden');
        document.getElementById('popup').style.display = 'flex';
    } else {
        popupBody.innerHTML = '<p>Errore: Contenuto non trovato</p>';
    }
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
    document.getElementById('popup').style.display = 'none';
}

function showAnswer(answer) {
    const popupBody = document.getElementById('popupBody');
    popupBody.innerHTML = `<h3>Fai così:</h3><p>${answer}</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.add('hidden');
        popup.style.display = 'none';
    }
});
