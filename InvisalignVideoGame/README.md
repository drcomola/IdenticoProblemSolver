# Aligner Breaker

Responsive browser mini game: **Aligner Breaker - Rompi la malocclusione**.

Open `index.html` in a browser to play. No backend, no database, no build step.

## Edit the game

- `config.js`: levels, level messages, power-ups, power-downs, microcopy, score values.
- `game.js`: game mechanics, drawing, collisions, controls, screen flow.
- `styles.css`: responsive layout, colors, medical-tech visual style.

The current MVP uses Canvas instead of Phaser so it can run as a single static client-side app without external dependencies. It is structured so Phaser, audio, leaderboard, richer sprites, and share-card generation can be added later.

Note: the end screen includes a local "codice sala d'attesa" visual. Replace it with a true QR code after publishing the game to a stable web URL.
