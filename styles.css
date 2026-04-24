:root {
  --bg: #050816;
  --bg-deep: #030510;
  --panel: rgba(8, 13, 30, 0.84);
  --line: rgba(94, 197, 255, 0.24);
  --line-strong: rgba(117, 226, 255, 0.58);
  --text: #ebf8ff;
  --muted: #8cabc5;
  --accent: #58e6ff;
  --accent-strong: #8cf4ff;
  --success: #90ffba;
  --warning: #ffd06e;
  --danger: #ff7fa6;
  --shadow: 0 28px 80px rgba(0, 0, 0, 0.52);
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

html,
body {
  margin: 0;
  min-height: 100%;
}

body {
  position: relative;
  overflow-x: hidden;
  background:
    radial-gradient(circle at top, rgba(58, 121, 211, 0.18), transparent 30%),
    linear-gradient(145deg, #02030a 0%, #061120 40%, #03050d 100%);
  color: var(--text);
  font-family: "Orbitron", sans-serif;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background:
    linear-gradient(rgba(140, 244, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(140, 244, 255, 0.045) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), transparent 85%);
  pointer-events: none;
}

.background-glow {
  position: fixed;
  border-radius: 999px;
  filter: blur(60px);
  opacity: 0.55;
  pointer-events: none;
}

.background-glow-left {
  top: 12%;
  left: -8%;
  width: 280px;
  height: 280px;
  background: rgba(62, 120, 255, 0.3);
}

.background-glow-right {
  right: -10%;
  bottom: 14%;
  width: 320px;
  height: 320px;
  background: rgba(88, 230, 255, 0.2);
}

.shell {
  position: relative;
  z-index: 1;
  width: min(1480px, calc(100% - 28px));
  margin: 18px auto 32px;
}

.panel {
  border: 1px solid var(--line);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(22, 40, 88, 0.18), transparent 34%),
    var(--panel);
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
}

.hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 24px;
  margin-bottom: 18px;
}

.hero-copy {
  max-width: 760px;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.app-brand-copy {
  display: grid;
  gap: 8px;
}

.app-brand-icon {
  width: 76px;
  height: 76px;
  border-radius: 18px;
  border: 1px solid rgba(140, 244, 255, 0.35);
  box-shadow:
    0 0 0 1px rgba(140, 244, 255, 0.12),
    0 20px 40px rgba(0, 0, 0, 0.35);
}

.hero-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.eyebrow,
.section-label {
  margin: 0;
  color: var(--accent-strong);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
}

h1,
h2 {
  margin: 0;
  font-family: "Cinzel", serif;
  letter-spacing: 0.04em;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.02;
  text-shadow: 0 0 26px rgba(88, 230, 255, 0.28);
}

h2 {
  font-size: 1.3rem;
}

.hero-text,
.section-note,
.chart-caption {
  color: var(--muted);
}

.hero-text {
  margin: 14px 0 0;
  font-size: 0.98rem;
  line-height: 1.7;
  max-width: 580px;
}

.app-tip {
  margin: 14px 0 0;
  color: var(--accent-strong);
  font-size: 0.84rem;
  letter-spacing: 0.04em;
}

.hero-controls {
  display: flex;
  align-items: end;
  gap: 14px;
  flex-wrap: wrap;
}

.state-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 34px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(88, 230, 255, 0.3);
  background: rgba(88, 230, 255, 0.12);
  color: var(--text);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.state-pill-muted {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
}

.control {
  display: grid;
  gap: 10px;
}

.control span,
.stat-title,
.mini-stat-card span {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--accent-strong);
}

select,
.reset-button,
.install-button,
.nav-tab {
  appearance: none;
  border: 1px solid var(--line-strong);
  border-radius: 14px;
  padding: 13px 16px;
  min-height: 50px;
  background: rgba(4, 11, 28, 0.88);
  color: var(--text);
  font: inherit;
}

select {
  min-width: 220px;
}

.reset-button,
.install-button,
.nav-tab {
  cursor: pointer;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease,
    opacity 160ms ease;
}

.install-button {
  border-color: rgba(144, 255, 186, 0.55);
  background:
    radial-gradient(circle at top, rgba(144, 255, 186, 0.22), transparent 65%),
    rgba(5, 17, 28, 0.92);
  box-shadow: 0 0 18px rgba(144, 255, 186, 0.12);
}

.install-button.is-hidden {
  display: none;
}

.reset-button:hover,
.reset-button:focus-visible,
.install-button:hover,
.install-button:focus-visible,
.nav-tab:hover,
.nav-tab:focus-visible,
select:focus-visible,
.today-checkbox:focus-visible + .today-quest-content {
  outline: none;
  transform: translateY(-1px);
  border-color: var(--accent-strong);
  box-shadow: 0 0 0 4px rgba(88, 230, 255, 0.1);
}

.app-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  margin-bottom: 18px;
}

.nav-tab {
  min-height: 54px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.nav-tab.is-active {
  border-color: rgba(144, 255, 186, 0.55);
  background:
    radial-gradient(circle at top, rgba(88, 230, 255, 0.22), transparent 70%),
    rgba(6, 18, 38, 0.96);
  box-shadow:
    0 0 0 1px rgba(88, 230, 255, 0.16),
    0 0 24px rgba(88, 230, 255, 0.14);
}

.app-panel {
  display: none;
}

.app-panel.is-active {
  display: block;
}

.today-layout,
.stats-layout {
  display: grid;
  gap: 18px;
}

.today-layout {
  grid-template-columns: minmax(320px, 0.92fr) minmax(0, 1.08fr);
}

.today-overview,
.today-quests,
.tracker,
.stats-panel,
.chart-panel,
.progress-panel {
  padding: 22px;
}

.today-heading,
.tracker-header,
.chart-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 12px;
}

.daily-ring {
  --progress-angle: 0deg;
  position: relative;
  display: grid;
  place-items: center;
  width: 124px;
  height: 124px;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(4, 10, 26, 0.96) 56%, transparent 57%),
    conic-gradient(from 270deg, rgba(144, 255, 186, 0.96) 0deg, rgba(88, 230, 255, 0.96) var(--progress-angle), rgba(255, 255, 255, 0.06) var(--progress-angle));
  box-shadow:
    inset 0 0 0 1px rgba(88, 230, 255, 0.16),
    0 0 28px rgba(88, 230, 255, 0.16);
}

.daily-ring strong {
  display: block;
  font-size: 1.4rem;
}

.daily-ring span {
  display: block;
  margin-top: 4px;
  color: var(--muted);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mini-stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.mini-stat-card {
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(88, 230, 255, 0.12);
  background: linear-gradient(180deg, rgba(13, 23, 56, 0.9), rgba(5, 10, 24, 0.95));
}

.mini-stat-card strong {
  display: block;
  margin-top: 10px;
  font-size: 1.55rem;
}

.today-actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.today-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.today-quest {
  display: block;
}

.today-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.today-quest-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 78px;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(88, 230, 255, 0.12);
  background: linear-gradient(180deg, rgba(11, 20, 48, 0.92), rgba(6, 11, 25, 0.96));
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.today-quest.is-complete .today-quest-content {
  border-color: rgba(144, 255, 186, 0.34);
  background:
    radial-gradient(circle at right top, rgba(144, 255, 186, 0.12), transparent 40%),
    linear-gradient(180deg, rgba(10, 32, 42, 0.92), rgba(6, 14, 22, 0.96));
  box-shadow: 0 0 24px rgba(88, 230, 255, 0.08);
}

.today-quest-content:hover {
  transform: translateY(-1px);
  border-color: var(--accent-strong);
}

.quest-copy {
  display: grid;
  gap: 6px;
}

.quest-copy strong {
  font-size: 0.92rem;
  letter-spacing: 0.03em;
}

.quest-copy span {
  color: var(--muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.quest-toggle {
  position: relative;
  flex: 0 0 auto;
  width: 58px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid rgba(88, 230, 255, 0.24);
  background: rgba(255, 255, 255, 0.06);
}

.quest-toggle::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #dffaff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  transition: transform 180ms ease, background 180ms ease;
}

.today-quest.is-complete .quest-toggle {
  background: linear-gradient(90deg, rgba(88, 230, 255, 0.5), rgba(144, 255, 186, 0.72));
}

.today-quest.is-complete .quest-toggle::after {
  transform: translateX(25px);
  background: #ffffff;
}

.matrix-wrap {
  margin-top: 22px;
  overflow: auto;
  border-radius: 18px;
  border: 1px solid rgba(88, 230, 255, 0.12);
  background: rgba(2, 7, 19, 0.66);
}

.matrix {
  min-width: 1260px;
}

.matrix-row {
  display: grid;
  grid-template-columns: minmax(240px, 1.1fr) repeat(30, minmax(32px, 1fr));
  align-items: center;
}

.matrix-row:not(:last-child) {
  border-bottom: 1px solid rgba(88, 230, 255, 0.07);
}

.matrix-header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: rgba(4, 10, 27, 0.98);
}

.matrix-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  border-right: 1px solid rgba(88, 230, 255, 0.07);
}

.matrix-row .matrix-cell:last-child {
  border-right: 0;
}

.matrix-label {
  justify-content: start;
  position: sticky;
  left: 0;
  z-index: 1;
  padding: 12px 16px;
  background: rgba(5, 11, 28, 0.97);
  font-size: 0.81rem;
  letter-spacing: 0.04em;
}

.matrix-header .matrix-label {
  z-index: 3;
  background: rgba(4, 10, 27, 0.98);
}

.day-label {
  font-size: 0.7rem;
  color: var(--muted);
}

.checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  margin: 0;
  border-radius: 4px;
  border: 1px solid rgba(131, 224, 255, 0.55);
  background: rgba(4, 12, 30, 0.9);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition:
    background 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
}

.checkbox:hover,
.checkbox:focus-visible {
  outline: none;
  transform: scale(1.08);
  border-color: var(--accent-strong);
  box-shadow: 0 0 14px rgba(88, 230, 255, 0.22);
}

.checkbox:checked {
  background:
    radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.9), transparent 22%),
    linear-gradient(135deg, rgba(144, 255, 186, 0.95), rgba(88, 230, 255, 0.95));
  border-color: rgba(144, 255, 186, 0.95);
  box-shadow:
    0 0 0 1px rgba(144, 255, 186, 0.2),
    0 0 18px rgba(88, 230, 255, 0.32);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.stat-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(88, 230, 255, 0.12);
  background: linear-gradient(180deg, rgba(13, 23, 56, 0.9), rgba(5, 10, 24, 0.95));
}

.stat-card strong {
  display: block;
  margin-top: 10px;
  font-size: clamp(1.5rem, 4vw, 2rem);
}

.rank-card strong {
  color: var(--warning);
  text-shadow: 0 0 18px rgba(255, 208, 110, 0.26);
}

#performanceChart {
  width: 100%;
  height: auto;
  margin-top: 18px;
  border-radius: 18px;
  background: radial-gradient(circle at top, rgba(88, 230, 255, 0.1), rgba(3, 6, 16, 0.95));
  border: 1px solid rgba(88, 230, 255, 0.08);
}

.progress-list {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.progress-item {
  display: grid;
  gap: 10px;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.78rem;
}

.progress-meta span:last-child {
  color: var(--accent-strong);
}

.progress-bar {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, rgba(88, 230, 255, 0.65), rgba(144, 255, 186, 0.95));
  box-shadow: 0 0 18px rgba(88, 230, 255, 0.24);
}

@media (max-width: 1180px) {
  .today-layout,
  .stats-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .shell {
    width: min(100% - 18px, 1480px);
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .hero,
  .today-overview,
  .today-quests,
  .tracker,
  .stats-panel,
  .chart-panel,
  .progress-panel {
    padding: 18px;
  }

  .hero {
    flex-direction: column;
  }

  .app-brand {
    align-items: start;
  }

  .app-brand-icon {
    width: 64px;
    height: 64px;
  }

  .hero-controls,
  .today-actions {
    flex-direction: column;
    align-items: stretch;
  }

  select,
  .reset-button,
  .install-button {
    width: 100%;
  }

  .app-nav {
    position: sticky;
    bottom: 10px;
    z-index: 8;
    gap: 8px;
    padding: 8px;
    margin-top: 14px;
    background: rgba(4, 10, 24, 0.9);
    backdrop-filter: blur(20px);
  }

  .nav-tab {
    min-height: 52px;
    padding-inline: 10px;
    font-size: 0.75rem;
  }

  .today-heading,
  .tracker-header,
  .chart-heading {
    flex-direction: column;
    align-items: start;
  }

  .daily-ring {
    width: 110px;
    height: 110px;
  }

  .mini-stat-grid,
  .stat-grid {
    grid-template-columns: 1fr;
  }

  .today-quest-content {
    min-height: 72px;
    padding: 16px;
  }
}
