(() => {
  const canvas = document.querySelector("#gameCanvas");
  const ctx = canvas.getContext("2d");
  const ui = {
    title: document.querySelector("#titleScreen"),
    how: document.querySelector("#howScreen"),
    level: document.querySelector("#levelScreen"),
    end: document.querySelector("#endScreen"),
    startBtn: document.querySelector("#startBtn"),
    howBtn: document.querySelector("#howBtn"),
    backBtn: document.querySelector("#backBtn"),
    levelStartBtn: document.querySelector("#levelStartBtn"),
    replayBtn: document.querySelector("#replayBtn"),
    shareBtn: document.querySelector("#shareBtn"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#lives"),
    progressText: document.querySelector("#progressText"),
    levelName: document.querySelector("#levelName"),
    levelKicker: document.querySelector("#levelKicker"),
    levelTitle: document.querySelector("#levelTitle"),
    levelMessage: document.querySelector("#levelMessage"),
    effectMessage: document.querySelector("#effectMessage"),
    smileSteps: document.querySelector("#smileSteps"),
    resultTitle: document.querySelector("#resultTitle"),
    resultBody: document.querySelector("#resultBody"),
    tipText: document.querySelector("#tipText"),
    challengePill: document.querySelector("#challengePill"),
    cardScore: document.querySelector("#cardScore"),
    challengeResult: document.querySelector("#challengeResult"),
    levelsStat: document.querySelector("#levelsStat"),
    perfectStat: document.querySelector("#perfectStat"),
    minusStat: document.querySelector("#minusStat"),
    leaderboardList: document.querySelector("#leaderboardList"),
    qrCanvas: document.querySelector("#qrCanvas"),
    qrLabel: document.querySelector("#qrLabel"),
    bookingLink: document.querySelector("#bookingLink")
  };

  const state = {
    mode: "title",
    levelIndex: 0,
    score: 0,
    lives: GAME_CONFIG.lives,
    keys: new Set(),
    pointerX: null,
    bricks: [],
    drops: [],
    particles: [],
    balls: [],
    totalBricks: 0,
    destroyed: 0,
    activeEffects: {},
    messageUntil: 0,
    lastTime: 0,
    levelStartedAt: 0,
    levelLivesStart: GAME_CONFIG.lives,
    perfectLevels: 0,
    levelsCompleted: 0,
    minusCaught: 0,
    plusCaught: 0,
    challengeFailed: false,
    gameFinished: false
  };

  const paddle = {
    x: 480,
    y: 555,
    width: 170,
    baseWidth: 170,
    height: 24,
    speed: 660
  };

  const ballDefaults = {
    radius: 10,
    speed: 440
  };

  function showScreen(name) {
    [ui.title, ui.how, ui.level, ui.end].forEach((screen) => screen.classList.remove("active"));
    if (name) ui[name].classList.add("active");
    state.mode = name || "playing";
  }

  function setupSmileSteps() {
    ui.smileSteps.innerHTML = "";
    for (let i = 0; i < 5; i += 1) {
      const step = document.createElement("div");
      step.className = "smile-step";
      ui.smileSteps.appendChild(step);
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const scale = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * scale);
    canvas.height = Math.round(rect.height * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  function world() {
    const rect = canvas.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }

  function currentLevel() {
    return GAME_CONFIG.levels[state.levelIndex];
  }

  function setMessage(text, duration = 2600) {
    ui.effectMessage.textContent = text;
    state.messageUntil = performance.now() + duration;
  }

  function setTip(text) {
    ui.tipText.textContent = text;
  }

  function updateChallengePill() {
    ui.challengePill.textContent = state.challengeFailed ? "Challenge 22h interrotta" : "Challenge 22h attiva";
    ui.challengePill.classList.toggle("broken", state.challengeFailed);
  }

  function openLevelIntro() {
    const level = currentLevel();
    ui.levelKicker.textContent = `Livello ${state.levelIndex + 1}`;
    ui.levelTitle.textContent = level.name;
    ui.levelMessage.textContent = level.message;
    ui.levelName.textContent = level.name;
    setMessage(level.message, 5000);
    setTip(level.coach || GAME_CONFIG.tips[state.levelIndex % GAME_CONFIG.tips.length]);
    showScreen("level");
  }

  function makeBall(x, y, vx = 230, vy = -360, speed = ballDefaults.speed) {
    return {
      x,
      y,
      vx,
      vy,
      radius: ballDefaults.radius,
      speed
    };
  }

  function buildLevel() {
    const level = currentLevel();
    const { width, height } = world();
    const columns = 9;
    const brickGap = width < 600 ? 6 : 7;
    const brickW = Math.min(82, (width - 54 - brickGap * (columns - 1)) / columns);
    const smileZone = getSmileZoneHeight({ width, height });
    const startY = smileZone + (width < 600 ? 24 : 30);
    const availableRowsHeight = Math.max(120, height - startY - 104);
    const brickH = clamp((availableRowsHeight - brickGap * (level.rows - 1)) / level.rows, 16, width < 600 ? 21 : 25);
    const startX = (width - (brickW * columns + brickGap * (columns - 1))) / 2;

    state.bricks = [];
    for (let row = 0; row < level.rows; row += 1) {
      for (let col = 0; col < columns; col += 1) {
        const rule = brickRule(level.pattern, row, col, columns);
        if (!rule.exists) continue;
        const x = clamp(startX + col * (brickW + brickGap) + rule.shift, 12, width - brickW - 12);
        state.bricks.push({
          x,
          y: startY + row * (brickH + brickGap) + rule.yShift,
          width: brickW,
          height: brickH,
          hp: rule.hp,
          maxHp: rule.hp,
          hardUntil: 0
        });
      }
    }

    const size = world();
    paddle.baseWidth = Math.max(118, Math.min(178, size.width * 0.2));
    paddle.width = paddle.baseWidth;
    paddle.x = size.width / 2;
    paddle.y = size.height - 54;
    state.levelLivesStart = state.lives;
    const speed = ballDefaults.speed * (level.speed || 1);
    state.balls = [makeBall(paddle.x, paddle.y - 26, 210, -390, speed)];
    state.drops = [];
    state.particles = [];
    state.totalBricks = state.bricks.length;
    state.destroyed = 0;
    state.activeEffects = {};
    state.levelStartedAt = performance.now();
    updateHud();
    updateChallengePill();
  }

  function brickRule(pattern, row, col, columns) {
    let exists = true;
    let hp = 1;
    let shift = 0;
    let yShift = 0;
    if (pattern === "crowding") {
      exists = !((row === 0 && col % 3 === 0) || (row === 4 && col % 4 === 1));
      shift = ((row + col) % 3 - 1) * 9;
      yShift = (col % 2) * 5;
    }
    if (pattern === "openBite") {
      exists = row < 2 || row > 3;
      shift = row > 3 ? 12 : -12;
    }
    if (pattern === "deepBite") {
      exists = row < 4 || (col > 1 && col < columns - 2);
      hp = row === 1 || row === 2 ? 2 : 1;
      yShift = row > 1 ? -8 : 0;
    }
    if (pattern === "classTwo") {
      exists = !(row === 4 && (col === 0 || col === columns - 1));
      shift = row < 3 ? 34 : -8;
    }
    if (pattern === "classThree") {
      exists = !(row === 0 && (col === 0 || col === columns - 1));
      shift = row > 1 ? 34 : -8;
    }
    return { exists, hp, shift, yShift };
  }

  function startGame() {
    state.levelIndex = 0;
    state.score = 0;
    state.lives = GAME_CONFIG.lives;
    state.perfectLevels = 0;
    state.levelsCompleted = 0;
    state.minusCaught = 0;
    state.plusCaught = 0;
    state.challengeFailed = false;
    state.gameFinished = false;
    openLevelIntro();
    updateHud();
    updateChallengePill();
  }

  function startLevel() {
    buildLevel();
    showScreen(null);
    setMessage(currentLevel().message, 3200);
  }

  function updateHud() {
    const progress = state.totalBricks ? Math.round((state.destroyed / state.totalBricks) * 100) : 0;
    ui.score.textContent = String(state.score);
    ui.lives.textContent = String(state.lives);
    ui.progressText.textContent = `${progress}%`;
    ui.levelName.textContent = currentLevel().name;
    updateChallengePill();
    [...ui.smileSteps.children].forEach((step, index) => {
      step.classList.toggle("active", index < Math.ceil(progress / 20));
    });
  }

  function update(dt, now) {
    if (state.mode !== "playing") return;
    const size = world();
    updateEffects(now);
    movePaddle(dt, size);
    updateBalls(dt, size, now);
    updateDrops(dt, size, now);
    updateParticles(dt);
    if (state.messageUntil && now > state.messageUntil) {
      setMessage(randomMicrocopy(), 2200);
      setTip(randomTip());
      state.messageUntil = now + 5200;
    }
  }

  function updateEffects(now) {
    Object.entries(state.activeEffects).forEach(([id, effect]) => {
      if (effect.until && now > effect.until) delete state.activeEffects[id];
    });
    let multiplier = 1;
    if (state.activeEffects.perfectWear) multiplier = 1.35;
    if (state.activeEffects.lowWear) multiplier = 0.68;
    paddle.width = paddle.baseWidth * multiplier;
  }

  function movePaddle(dt, size) {
    if (state.pointerX !== null) {
      paddle.x += (state.pointerX - paddle.x) * Math.min(1, dt * 18);
    }
    if (state.keys.has("ArrowLeft")) paddle.x -= paddle.speed * dt;
    if (state.keys.has("ArrowRight")) paddle.x += paddle.speed * dt;
    paddle.x = clamp(paddle.x, paddle.width / 2 + 12, size.width - paddle.width / 2 - 12);
  }

  function updateBalls(dt, size, now) {
    state.balls.forEach((ball) => {
      const speedBoost = state.activeEffects.lostAligner ? 1.28 : 1;
      ball.x += ball.vx * dt * speedBoost;
      ball.y += ball.vy * dt * speedBoost;

      if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.vx = Math.abs(ball.vx);
      }
      if (ball.x > size.width - ball.radius) {
        ball.x = size.width - ball.radius;
        ball.vx = -Math.abs(ball.vx);
      }
      if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.vy = Math.abs(ball.vy);
      }
      if (ball.y > size.height + 40) ball.dead = true;

      collidePaddle(ball);
      collideBricks(ball, now);
    });
    state.balls = state.balls.filter((ball) => !ball.dead);
    if (!state.balls.length) loseLife();
  }

  function collidePaddle(ball) {
    const left = paddle.x - paddle.width / 2;
    const right = paddle.x + paddle.width / 2;
    const top = paddle.y - paddle.height / 2;
    const bottom = paddle.y + paddle.height / 2;
    if (ball.vy > 0 && ball.x > left && ball.x < right && ball.y + ball.radius > top && ball.y - ball.radius < bottom) {
      const impact = (ball.x - paddle.x) / (paddle.width / 2);
      const diagonal = state.activeEffects.elastics ? 1.22 : 1;
      ball.vx = impact * 360 * diagonal;
      ball.vy = -Math.abs(ball.vy) - 8;
      normalizeBall(ball);
      spawnParticles(ball.x, top, "#dff8ff", 8);
    }
  }

  function collideBricks(ball, now) {
    for (const brick of state.bricks) {
      if (brick.removed) continue;
      const hit = ball.x + ball.radius > brick.x && ball.x - ball.radius < brick.x + brick.width && ball.y + ball.radius > brick.y && ball.y - ball.radius < brick.y + brick.height;
      if (!hit) continue;
      ball.vy *= -1;
      const hard = brick.hardUntil > now || state.activeEffects.noTracking;
      const damage = state.activeEffects.attachments && !hard ? 2 : 1;
      brick.hp -= hard ? Math.max(0.5, damage - 1) : damage;
      spawnParticles(ball.x, ball.y, hard ? "#b5c7ff" : "#70dcff", 10);
      if (brick.hp <= 0) destroyBrick(brick);
      break;
    }
  }

  function destroyBrick(brick) {
    brick.removed = true;
    state.destroyed += 1;
    state.score += GAME_CONFIG.baseScore * brick.maxHp;
    if (Math.random() < (currentLevel().dropRate || 0.18)) createDrop(brick);
    updateHud();
    if (state.destroyed >= state.totalBricks) finishLevel();
  }

  function createDrop(brick) {
    const effect = pickWeightedEffect();
    state.drops.push({
      x: brick.x + brick.width / 2,
      y: brick.y + brick.height / 2,
      radius: 13,
      vy: 115,
      effect
    });
  }

  function pickWeightedEffect() {
    const bias = currentLevel().effectBias || {};
    const weighted = [];
    GAME_CONFIG.effects.forEach((effect) => {
      const count = bias[effect.id] || 1;
      for (let i = 0; i < count; i += 1) weighted.push(effect);
    });
    return weighted[Math.floor(Math.random() * weighted.length)] || GAME_CONFIG.effects[0];
  }

  function updateDrops(dt, size, now) {
    state.drops.forEach((drop) => {
      drop.y += drop.vy * dt;
      const caught = drop.x > paddle.x - paddle.width / 2 && drop.x < paddle.x + paddle.width / 2 && drop.y + drop.radius > paddle.y - paddle.height / 2 && drop.y - drop.radius < paddle.y + paddle.height / 2;
      if (caught) {
        applyEffect(drop.effect, now);
        drop.dead = true;
      }
      if (drop.y > size.height + 30) drop.dead = true;
    });
    state.drops = state.drops.filter((drop) => !drop.dead);
  }

  function applyEffect(effect, now) {
    setMessage(effect.message, 3400);
    setTip(effect.tip);
    if (effect.kind === "down") {
      state.minusCaught += 1;
      state.challengeFailed = true;
    } else {
      state.plusCaught += 1;
    }
    updateChallengePill();
    if (effect.duration) state.activeEffects[effect.id] = { until: now + effect.duration };
    if (effect.id === "elastics") {
      const base = state.balls[0] || makeBall(paddle.x, paddle.y - 28);
      state.balls.push(makeBall(base.x, base.y, -Math.abs(base.vx || 250), -Math.abs(base.vy || 360)));
      state.balls.push(makeBall(base.x, base.y, Math.abs(base.vx || 260), -Math.abs(base.vy || 360)));
    }
    if (effect.id === "forgotElastics") {
      state.bricks.filter((brick) => !brick.removed).slice(0, 5).forEach((brick) => {
        brick.hp = Math.min(brick.maxHp + 1, brick.hp + 1);
        brick.maxHp = Math.max(brick.maxHp, brick.hp);
      });
    }
    if (effect.id === "noTracking") {
      const until = now + effect.duration;
      state.activeEffects.noTracking = { until };
      state.bricks.filter((brick) => !brick.removed).sort(() => Math.random() - 0.5).slice(0, 7).forEach((brick) => {
        brick.hardUntil = until;
      });
    }
  }

  function loseLife() {
    state.lives -= 1;
    state.challengeFailed = true;
    updateChallengePill();
    updateHud();
    if (state.lives <= 0) {
      finishGame();
      return;
    }
    const size = world();
    state.balls = [makeBall(paddle.x, size.height - 86, 210, -390)];
    setMessage("No tracking detected.", 2500);
  }

  function finishLevel() {
    state.levelsCompleted = Math.max(state.levelsCompleted, state.levelIndex + 1);
    if (state.lives === state.levelLivesStart) {
      state.perfectLevels += 1;
      state.score += 550;
      setMessage("Tracking perfetto: bonus collaborazione!", 2600);
      setTip("Finire un livello senza perdere vite simula una terapia ben controllata: meno imprevisti, piu continuita.");
    }
    state.score += 800 + state.lives * 180;
    updateHud();
    if (state.levelIndex >= GAME_CONFIG.levels.length - 1) {
      finishGame();
      return;
    }
    state.levelIndex += 1;
    openLevelIntro();
  }

  function finishGameLegacy() {
    const maxLives = GAME_CONFIG.lives;
    let title = "Serve più costanza";
    if (state.lives >= maxLives - 1) title = "Sorriso in tracking perfetto";
    else if (state.lives >= 1) title = "Buona collaborazione";
    ui.resultTitle.textContent = title;
    ui.resultBody.textContent = `Final score: ${state.score}. Smile Progress: ${state.totalBricks ? Math.round((state.destroyed / state.totalBricks) * 100) : 100}%.`;
    showScreen("end");
  }

  function draw(now) {
    const size = world();
    ctx.clearRect(0, 0, size.width, size.height);
    drawClinicalBackground(size);
    drawSmileGuide(size);
    state.bricks.forEach((brick) => !brick.removed && drawBrick(brick, now));
    state.drops.forEach(drawDrop);
    state.balls.forEach(drawBall);
    drawPaddle();
    state.particles.forEach(drawParticle);
  }

  function drawSmileGuide(size) {
    const progress = state.totalBricks ? state.destroyed / state.totalBricks : 0;
    const centerX = size.width / 2;
    const zoneH = getSmileZoneHeight(size);
    const top = size.width < 600 ? 8 : 12;
    const teeth = [
      { type: "molar", w: 1.05, h: 0.72 },
      { type: "molar", w: 1.02, h: 0.74 },
      { type: "premolar", w: 0.82, h: 0.82 },
      { type: "premolar", w: 0.8, h: 0.84 },
      { type: "canine", w: 0.76, h: 1.08 },
      { type: "lateral", w: 0.7, h: 0.92 },
      { type: "central", w: 0.86, h: 1 },
      { type: "central", w: 0.86, h: 1 },
      { type: "lateral", w: 0.7, h: 0.92 },
      { type: "canine", w: 0.76, h: 1.08 },
      { type: "premolar", w: 0.8, h: 0.84 },
      { type: "premolar", w: 0.82, h: 0.82 },
      { type: "molar", w: 1.02, h: 0.74 },
      { type: "molar", w: 1.05, h: 0.72 }
    ];
    const baseH = clamp(zoneH * 0.44, 24, 44);
    const baseW = clamp(size.width / 28, 14, 28);
    const totalUnits = teeth.reduce((sum, tooth) => sum + tooth.w, 0);
    const gap = clamp(size.width * 0.004, 2, 4);
    const totalW = teeth.reduce((sum, tooth) => sum + tooth.w * baseW, 0) + gap * (teeth.length - 1);
    let cursorX = centerX - totalW / 2;

    ctx.save();
    ctx.fillStyle = "rgba(5, 20, 36, 0.58)";
    ctx.fillRect(0, 0, size.width, zoneH);
    ctx.strokeStyle = "rgba(184, 235, 255, 0.17)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(18, zoneH - 1);
    ctx.lineTo(size.width - 18, zoneH - 1);
    ctx.stroke();

    ctx.globalAlpha = 0.96;
    teeth.forEach((tooth, i) => {
      const toothW = tooth.w * baseW;
      const toothH = tooth.h * baseH;
      const arch = Math.pow((i - 6.5) / 6.5, 2) * clamp(zoneH * 0.22, 10, 22);
      const disorder = Math.sin(i * 1.7) * (1 - progress) * clamp(zoneH * 0.1, 5, 11);
      const rotation = (i % 2 ? -1 : 1) * (1 - progress) * 0.16;
      const x = cursorX + toothW / 2;
      const y = top + arch + disorder;
      ctx.save();
      ctx.translate(x, y + toothH / 2);
      ctx.rotate(rotation);
      drawToothShape(-toothW / 2, -toothH / 2, toothW, toothH, progress, tooth.type);
      ctx.restore();
      cursorX += toothW + gap;
    });

    ctx.globalAlpha = 0.55 + progress * 0.35;
    ctx.strokeStyle = progress > 0.85 ? "#70ffd6" : "#dff8ff";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const crooked = (1 - progress) * clamp(zoneH * 0.14, 8, 17);
    ctx.moveTo(size.width * 0.26, zoneH - 28 + crooked);
    ctx.quadraticCurveTo(size.width * 0.5, zoneH - 6 - crooked, size.width * 0.74, zoneH - 28);
    ctx.stroke();
    ctx.restore();
  }

  function getSmileZoneHeight(size) {
    return clamp(size.height * 0.19, size.width < 600 ? 82 : 96, size.width < 600 ? 108 : 128);
  }

  function drawToothShape(x, y, width, height, progress, type = "central") {
    const rootCurve = 10 + progress * 8;
    const grad = ctx.createLinearGradient(x, y, x, y + height);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
    grad.addColorStop(1, "rgba(166, 237, 255, 0.72)");
    ctx.beginPath();
    if (type === "molar") {
      ctx.moveTo(x + width * 0.08, y + height * 0.18);
      ctx.quadraticCurveTo(x + width * 0.25, y - height * 0.05, x + width * 0.45, y + height * 0.12);
      ctx.quadraticCurveTo(x + width * 0.65, y - height * 0.05, x + width * 0.92, y + height * 0.18);
      ctx.lineTo(x + width * 0.86, y + height * 0.78);
      ctx.quadraticCurveTo(x + width * 0.52, y + height * 0.98, x + width * 0.14, y + height * 0.78);
    } else if (type === "canine") {
      ctx.moveTo(x + width * 0.16, y + height * 0.1);
      ctx.quadraticCurveTo(x + width * 0.5, y - height * 0.08, x + width * 0.84, y + height * 0.1);
      ctx.lineTo(x + width * 0.72, y + height * 0.66);
      ctx.quadraticCurveTo(x + width * 0.5, y + height + rootCurve, x + width * 0.28, y + height * 0.66);
    } else if (type === "premolar") {
      ctx.moveTo(x + width * 0.12, y + height * 0.12);
      ctx.quadraticCurveTo(x + width * 0.34, y - height * 0.04, x + width * 0.5, y + height * 0.08);
      ctx.quadraticCurveTo(x + width * 0.66, y - height * 0.04, x + width * 0.88, y + height * 0.12);
      ctx.lineTo(x + width * 0.78, y + height * 0.76);
      ctx.quadraticCurveTo(x + width * 0.5, y + height * 0.98, x + width * 0.22, y + height * 0.76);
    } else {
      ctx.moveTo(x + width * 0.14, y + height * 0.08);
      ctx.quadraticCurveTo(x + width * 0.5, y - height * 0.08, x + width * 0.86, y + height * 0.08);
      ctx.lineTo(x + width * 0.82, y + height * 0.72);
      ctx.quadraticCurveTo(x + width * 0.62, y + height + rootCurve, x + width * 0.5, y + height * 0.86);
      ctx.quadraticCurveTo(x + width * 0.38, y + height + rootCurve, x + width * 0.18, y + height * 0.72);
    }
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.shadowColor = "rgba(112, 220, 255, 0.24)";
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.strokeStyle = "rgba(232, 250, 255, 0.58)";
    ctx.stroke();
  }

  function drawClinicalBackground(size) {
    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.strokeStyle = "#70ffd6";
    ctx.lineWidth = 1;
    for (let x = 24; x < size.width; x += 58) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 80, size.height);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "#bfefff";
    ctx.setLineDash([6, 10]);
    ctx.beginPath();
    ctx.arc(size.width * 0.5, size.height * 0.52, Math.min(size.width, size.height) * 0.34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawBrick(brick, now) {
    const hard = brick.hardUntil > now || state.activeEffects.noTracking;
    const health = brick.hp / brick.maxHp;
    const teeth = brick.width > 54 ? 2 : 1;
    const toothW = brick.width / teeth - 4;
    const toothH = brick.height + 10;
    ctx.save();
    ctx.shadowColor = hard ? "rgba(181, 199, 255, 0.52)" : "rgba(112, 220, 255, 0.32)";
    ctx.shadowBlur = hard ? 16 : 10;
    for (let i = 0; i < teeth; i += 1) {
      const x = brick.x + 2 + i * (brick.width / teeth) + 2;
      const y = brick.y - 4 + (i % 2) * 2;
      drawMiniTooth(x, y, toothW, toothH, health, hard);
    }
    if (brick.maxHp > 1 || hard) {
      ctx.globalAlpha = 0.38;
      ctx.fillStyle = "#061426";
      ctx.fillRect(brick.x + 8, brick.y + brick.height - 8, (brick.width - 16) * health, 3);
    }
    ctx.restore();
  }

  function drawMiniTooth(x, y, width, height, health, hard) {
    const grad = ctx.createLinearGradient(x, y, x, y + height);
    grad.addColorStop(0, hard ? "#dbe1ff" : "#ffffff");
    grad.addColorStop(1, health < 1 ? "#70ffd6" : "#bfefff");
    ctx.beginPath();
    ctx.moveTo(x + width * 0.12, y + height * 0.12);
    ctx.quadraticCurveTo(x + width * 0.5, y - height * 0.08, x + width * 0.88, y + height * 0.12);
    ctx.lineTo(x + width * 0.8, y + height * 0.72);
    ctx.quadraticCurveTo(x + width * 0.58, y + height, x + width * 0.5, y + height * 0.82);
    ctx.quadraticCurveTo(x + width * 0.42, y + height, x + width * 0.2, y + height * 0.72);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.58)";
    ctx.stroke();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "#061426";
    ctx.beginPath();
    ctx.moveTo(x + width * 0.5, y + height * 0.2);
    ctx.lineTo(x + width * 0.5, y + height * 0.72);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawPaddle() {
    ctx.save();
    ctx.shadowColor = "rgba(160, 234, 255, 0.56)";
    ctx.shadowBlur = 22;
    const x = paddle.x - paddle.width / 2;
    const y = paddle.y - paddle.height / 2;
    const grad = ctx.createLinearGradient(x, y, x, y + paddle.height);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.42)");
    grad.addColorStop(0.48, "rgba(164, 232, 255, 0.16)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0.28)");
    ctx.beginPath();
    ctx.moveTo(x + paddle.width * 0.08, y + paddle.height * 0.5);
    ctx.quadraticCurveTo(x + paddle.width * 0.18, y - paddle.height * 0.34, x + paddle.width * 0.5, y - paddle.height * 0.08);
    ctx.quadraticCurveTo(x + paddle.width * 0.82, y - paddle.height * 0.34, x + paddle.width * 0.92, y + paddle.height * 0.5);
    ctx.quadraticCurveTo(x + paddle.width * 0.82, y + paddle.height * 1.2, x + paddle.width * 0.5, y + paddle.height * 0.9);
    ctx.quadraticCurveTo(x + paddle.width * 0.18, y + paddle.height * 1.2, x + paddle.width * 0.08, y + paddle.height * 0.5);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(229, 250, 255, 0.76)";
    ctx.stroke();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(paddle.x, y + paddle.height * 0.1, paddle.width * 0.43, 0.08 * Math.PI, 0.92 * Math.PI);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
    ctx.stroke();
    ctx.restore();
  }

  function drawBall(ball) {
    ctx.save();
    const grad = ctx.createRadialGradient(ball.x - 3, ball.y - 4, 2, ball.x, ball.y, ball.radius * 2.4);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.5, "#82e5ff");
    grad.addColorStop(1, "rgba(112, 220, 255, 0)");
    ctx.fillStyle = grad;
    ctx.shadowColor = "rgba(112, 220, 255, 0.9)";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawDrop(drop) {
    ctx.save();
    ctx.shadowColor = drop.effect.color;
    ctx.shadowBlur = 16;
    drawDropIcon(drop);
    drawDropLabel(drop);
    ctx.restore();
  }

  function drawDropLabel(drop) {
    const labels = {
      attachments: "ATT",
      perfectWear: "22h",
      elastics: "EL",
      lowWear: "-h",
      lostAligner: "ROTTA",
      forgotElastics: "0 EL",
      noTracking: "NO TR"
    };
    ctx.shadowBlur = 0;
    ctx.font = "800 9px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = drop.effect.kind === "up" ? "#dff8ff" : "#ffccd2";
    ctx.fillText(labels[drop.effect.id] || drop.effect.label, drop.x, drop.y + drop.radius + 4);
  }

  function drawDropIcon(drop) {
    const x = drop.x;
    const y = drop.y;
    const r = drop.radius;
    ctx.lineWidth = 2;
    ctx.strokeStyle = drop.effect.color;
    ctx.fillStyle = drop.effect.kind === "up" ? "rgba(112, 255, 214, 0.18)" : "rgba(255, 143, 157, 0.18)";

    if (drop.effect.icon === "attachment") {
      roundedRect(x - r * 0.65, y - r * 0.75, r * 1.3, r * 1.5, 5);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - r * 0.3, y);
      ctx.lineTo(x + r * 0.3, y);
      ctx.stroke();
      return;
    }

    if (drop.effect.icon === "elastic") {
      ctx.beginPath();
      ctx.ellipse(x, y, r * 0.82, r * 0.52, -0.6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x, y, r * 0.5, r * 0.3, -0.6, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }

    if (drop.effect.icon === "case" || drop.effect.icon === "emptyElastics") {
      roundedRect(x - r, y - r * 0.62, r * 2, r * 1.25, 5);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - r * 0.75, y - r * 0.1);
      ctx.lineTo(x + r * 0.75, y - r * 0.1);
      ctx.stroke();
      if (drop.effect.icon === "emptyElastics") {
        ctx.beginPath();
        ctx.moveTo(x - r * 0.42, y + r * 0.36);
        ctx.lineTo(x + r * 0.42, y - r * 0.36);
        ctx.stroke();
      }
      return;
    }

    if (drop.effect.icon === "brokenAligner") {
      ctx.beginPath();
      ctx.moveTo(x - r, y);
      ctx.quadraticCurveTo(x - r * 0.45, y - r, x, y - r * 0.22);
      ctx.lineTo(x + r * 0.25, y - r * 0.58);
      ctx.lineTo(x + r * 0.1, y + r * 0.05);
      ctx.quadraticCurveTo(x + r * 0.62, y + r * 0.82, x + r, y);
      ctx.stroke();
      return;
    }

    if (drop.effect.icon === "clock") {
      ctx.beginPath();
      ctx.arc(x, y, r * 0.82, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - r * 0.45);
      ctx.moveTo(x, y);
      ctx.lineTo(x + r * 0.35, y + r * 0.2);
      ctx.stroke();
      return;
    }

    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r, y + r * 0.78);
    ctx.lineTo(x - r, y + r * 0.78);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i += 1) {
      state.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 160,
        vy: (Math.random() - 0.5) * 160,
        life: 0.55,
        color
      });
    }
  }

  function updateParticles(dt) {
    state.particles.forEach((p) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    });
    state.particles = state.particles.filter((p) => p.life > 0);
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life / 0.55);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function roundedRect(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function normalizeBall(ball) {
    const speed = ball.speed;
    const length = Math.hypot(ball.vx, ball.vy) || speed;
    ball.vx = (ball.vx / length) * speed;
    ball.vy = (ball.vy / length) * speed;
  }

  function randomMicrocopy() {
    return GAME_CONFIG.microcopy[Math.floor(Math.random() * GAME_CONFIG.microcopy.length)];
  }

  function randomTip() {
    return GAME_CONFIG.tips[Math.floor(Math.random() * GAME_CONFIG.tips.length)];
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - state.lastTime) / 1000 || 0);
    state.lastTime = now;
    update(dt, now);
    draw(now);
    requestAnimationFrame(loop);
  }

  function pointerToCanvasX(event) {
    const rect = canvas.getBoundingClientRect();
    return clamp(event.clientX - rect.left, 0, rect.width);
  }

  function finishGame() {
    if (state.gameFinished) return;
    state.gameFinished = true;
    const maxLives = GAME_CONFIG.lives;
    const completedAll = state.levelsCompleted >= GAME_CONFIG.levels.length && state.destroyed >= state.totalBricks;
    const challengeComplete = !state.challengeFailed && completedAll;
    let title = "Serve piu costanza";
    if (challengeComplete || state.lives >= maxLives - 1) title = "Sorriso in tracking perfetto";
    else if (state.lives >= 1 || state.levelsCompleted >= 3) title = "Buona collaborazione";
    ui.resultTitle.textContent = title;
    ui.resultBody.textContent = `Final score: ${state.score}. Smile Progress: ${state.totalBricks ? Math.round((state.destroyed / state.totalBricks) * 100) : 100}%.`;
    ui.cardScore.textContent = `${state.score} punti`;
    ui.challengeResult.textContent = challengeComplete ? "Challenge 22h completata" : "Challenge 22h da riprovare";
    ui.levelsStat.textContent = `${state.levelsCompleted}/${GAME_CONFIG.levels.length}`;
    ui.perfectStat.textContent = String(state.perfectLevels);
    ui.minusStat.textContent = state.minusCaught === 0 ? "tutti" : String(Math.max(0, state.plusCaught - state.minusCaught));
    saveLeaderboard(title, challengeComplete);
    renderLeaderboard();
    renderStudioCode();
    showScreen("end");
  }

  function saveLeaderboard(title, challengeComplete) {
    const entry = {
      score: state.score,
      title,
      challengeComplete,
      levels: state.levelsCompleted,
      perfect: state.perfectLevels,
      date: new Date().toLocaleDateString("it-IT")
    };
    const board = readLeaderboard();
    board.push(entry);
    board.sort((a, b) => b.score - a.score);
    localStorage.setItem("alignerBreakerLeaderboard", JSON.stringify(board.slice(0, 5)));
  }

  function readLeaderboard() {
    try {
      return JSON.parse(localStorage.getItem("alignerBreakerLeaderboard") || "[]");
    } catch {
      return [];
    }
  }

  function renderLeaderboard() {
    const board = readLeaderboard();
    ui.leaderboardList.innerHTML = "";
    if (!board.length) {
      const item = document.createElement("li");
      item.textContent = "Nessun risultato salvato";
      ui.leaderboardList.appendChild(item);
      return;
    }
    board.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = `${entry.score} pt - ${entry.title} - ${entry.date}`;
      ui.leaderboardList.appendChild(item);
    });
  }

  function renderStudioCode() {
    ui.qrLabel.textContent = GAME_CONFIG.studio.qrLabel;
    const qrCtx = ui.qrCanvas.getContext("2d");
    const size = ui.qrCanvas.width;
    const cells = 17;
    const cell = size / cells;
    const text = `${location.href}|${state.score}|${state.levelsCompleted}`;
    qrCtx.fillStyle = "#effdff";
    qrCtx.fillRect(0, 0, size, size);
    drawFinder(qrCtx, 1, 1, cell);
    drawFinder(qrCtx, cells - 6, 1, cell);
    drawFinder(qrCtx, 1, cells - 6, cell);
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    for (let y = 0; y < cells; y += 1) {
      for (let x = 0; x < cells; x += 1) {
        const inFinder = (x < 7 && y < 7) || (x > cells - 8 && y < 7) || (x < 7 && y > cells - 8);
        if (inFinder) continue;
        const bit = ((hash + x * 13 + y * 29 + x * y * 7) % 5) < 2;
        if (bit) qrCtx.fillRect(Math.floor(x * cell), Math.floor(y * cell), Math.ceil(cell), Math.ceil(cell));
      }
    }
  }

  function drawFinder(qrCtx, x, y, cell) {
    qrCtx.fillStyle = "#061426";
    qrCtx.fillRect(x * cell, y * cell, 5 * cell, 5 * cell);
    qrCtx.fillStyle = "#effdff";
    qrCtx.fillRect((x + 1) * cell, (y + 1) * cell, 3 * cell, 3 * cell);
    qrCtx.fillStyle = "#061426";
    qrCtx.fillRect((x + 2) * cell, (y + 2) * cell, cell, cell);
  }

  function bindEvents() {
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", (event) => state.keys.add(event.key));
    window.addEventListener("keyup", (event) => state.keys.delete(event.key));
    canvas.addEventListener("pointerdown", (event) => {
      state.pointerX = pointerToCanvasX(event);
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (event.pressure > 0 || event.pointerType !== "mouse") state.pointerX = pointerToCanvasX(event);
      if (event.pointerType === "mouse") state.pointerX = pointerToCanvasX(event);
    });
    canvas.addEventListener("pointerup", () => {
      state.pointerX = null;
    });
    ui.startBtn.addEventListener("click", startGame);
    ui.howBtn.addEventListener("click", () => showScreen("how"));
    ui.backBtn.addEventListener("click", () => showScreen("title"));
    ui.levelStartBtn.addEventListener("click", startLevel);
    ui.replayBtn.addEventListener("click", startGame);
    ui.bookingLink.href = GAME_CONFIG.studio.bookingUrl;
    ui.bookingLink.textContent = GAME_CONFIG.studio.bookingLabel;
    ui.shareBtn.addEventListener("click", shareResult);
  }

  async function shareResult() {
    const text = `Aligner Breaker: ${state.score} punti. ${ui.resultTitle.textContent}. by ${GAME_CONFIG.studio.author}`;
    const blob = await createShareCard();
    const file = blob ? new File([blob], "aligner-breaker-result.png", { type: "image/png" }) : null;
    if (file && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ title: GAME_CONFIG.studio.shareTitle, text, files: [file] });
      return;
    }
    if (navigator.share) {
      await navigator.share({ title: GAME_CONFIG.studio.shareTitle, text });
      return;
    }
    await navigator.clipboard?.writeText(text);
    setMessage("Risultato copiato negli appunti.", 2800);
  }

  function createShareCard() {
    return new Promise((resolve) => {
      const card = document.createElement("canvas");
      card.width = 1080;
      card.height = 1350;
      const c = card.getContext("2d");
      const gradient = c.createLinearGradient(0, 0, 1080, 1350);
      gradient.addColorStop(0, "#071426");
      gradient.addColorStop(0.6, "#0a2039");
      gradient.addColorStop(1, "#07303b");
      c.fillStyle = gradient;
      c.fillRect(0, 0, card.width, card.height);
      c.fillStyle = "rgba(112, 255, 214, 0.16)";
      c.beginPath();
      c.arc(900, 210, 240, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = "rgba(184, 235, 255, 0.28)";
      c.lineWidth = 4;
      c.strokeRect(70, 70, 940, 1210);
      c.fillStyle = "#70dcff";
      c.font = "800 42px system-ui, sans-serif";
      c.fillText("Aligner Breaker", 110, 170);
      c.fillStyle = "#ffffff";
      c.font = "900 76px system-ui, sans-serif";
      c.fillText(`${state.score} punti`, 110, 290);
      c.fillStyle = "#dff8ff";
      c.font = "700 42px system-ui, sans-serif";
      wrapCanvasText(c, ui.resultTitle.textContent, 110, 375, 820, 52);
      drawCardSmile(c, 540, 690, !state.challengeFailed);
      c.fillStyle = "#70ffd6";
      c.font = "800 34px system-ui, sans-serif";
      c.fillText(ui.challengeResult.textContent, 110, 1060);
      c.fillStyle = "#a9d9e8";
      c.font = "700 30px system-ui, sans-serif";
      c.fillText(`Perfect tracking: ${state.perfectLevels}  |  Livelli: ${state.levelsCompleted}/${GAME_CONFIG.levels.length}`, 110, 1125);
      c.fillText(`by ${GAME_CONFIG.studio.author}`, 110, 1210);
      card.toBlob(resolve, "image/png", 0.92);
    });
  }

  function wrapCanvasText(c, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    words.forEach((word) => {
      const test = `${line}${word} `;
      if (c.measureText(test).width > maxWidth && line) {
        c.fillText(line, x, y);
        line = `${word} `;
        y += lineHeight;
      } else {
        line = test;
      }
    });
    c.fillText(line, x, y);
  }

  function drawCardSmile(c, x, y, aligned) {
    c.save();
    c.translate(x, y);
    c.strokeStyle = aligned ? "#70ffd6" : "#dff8ff";
    c.lineWidth = 10;
    c.beginPath();
    c.moveTo(-260, 90);
    c.quadraticCurveTo(0, aligned ? 180 : 95, 260, 90);
    c.stroke();
    for (let i = -3; i <= 4; i += 1) {
      const wobble = aligned ? 0 : Math.sin(i * 2) * 24;
      c.fillStyle = "#ffffff";
      c.strokeStyle = "rgba(112, 220, 255, 0.72)";
      c.lineWidth = 3;
      roundedCardTooth(c, i * 62 - 28, -70 + wobble, 54, 92);
    }
    c.restore();
  }

  function roundedCardTooth(c, x, y, width, height) {
    c.beginPath();
    c.moveTo(x + width * 0.15, y + height * 0.08);
    c.quadraticCurveTo(x + width * 0.5, y - height * 0.08, x + width * 0.85, y + height * 0.08);
    c.lineTo(x + width * 0.78, y + height * 0.74);
    c.quadraticCurveTo(x + width * 0.5, y + height * 1.08, x + width * 0.22, y + height * 0.74);
    c.closePath();
    c.fill();
    c.stroke();
  }

  setupSmileSteps();
  resize();
  bindEvents();
  updateHud();
  requestAnimationFrame(loop);
})();
