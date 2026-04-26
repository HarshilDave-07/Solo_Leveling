const STORAGE_KEY = "awakening-system-progress-v1";
const TAB_STORAGE_KEY = "awakening-system-active-tab-v1";

const habits = [
  "Wake up 04:00 AM",
  "Read",
  "Study 3 HR",
  "Meditate",
  "30 Min Exercise",
  "Pray to God",
  "30 Min No Phone",
  "3D / VFX",
  "Building Project",
  "Sleep at 11:00",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthSelect = document.querySelector("#monthSelect");
const habitMatrix = document.querySelector("#habitMatrix");
const resetMonthButton = document.querySelector("#resetMonthButton");
const installAppButton = document.querySelector("#installAppButton");
const installHint = document.querySelector("#installHint");
const installStateBadge = document.querySelector("#installStateBadge");
const gridTitle = document.querySelector("#gridTitle");
const gridNote = document.querySelector("#gridNote");
const overallCompletion = document.querySelector("#overallCompletion");
const currentStreak = document.querySelector("#currentStreak");
const perfectDays = document.querySelector("#perfectDays");
const rankBadge = document.querySelector("#rankBadge");
const chartCaption = document.querySelector("#chartCaption");
const topicProgressList = document.querySelector("#topicProgressList");
const chartCanvas = document.querySelector("#performanceChart");
const chartContext = chartCanvas.getContext("2d");
const todayDateLabel = document.querySelector("#todayDateLabel");
const todayQuestList = document.querySelector("#todayQuestList");
const dailyRing = document.querySelector("#dailyRing");
const dailyRingValue = document.querySelector("#dailyRingValue");
const todayCompleted = document.querySelector("#todayCompleted");
const todayRemaining = document.querySelector("#todayRemaining");
const todayRank = document.querySelector("#todayRank");
const completeTodayButton = document.querySelector("#completeTodayButton");
const clearTodayButton = document.querySelector("#clearTodayButton");
const navTabs = Array.from(document.querySelectorAll(".nav-tab"));
const appPanels = Array.from(document.querySelectorAll(".app-panel"));

const liveNow = getNow();
let selectedMonthIndex = liveNow.getMonth();
let year = liveNow.getFullYear();
let allProgress = loadProgress();
let activeTab = loadActiveTab();
let lastSeenDateStamp = getDateStamp(liveNow);
let lastSeenLiveYear = liveNow.getFullYear();
let lastSeenLiveMonthIndex = liveNow.getMonth();
let deferredInstallPrompt = null;

populateMonthSelect();
setupTabs();
render();
startCalendarSync();
setupInstallFlow();
registerServiceWorker();

monthSelect.addEventListener("change", () => {
  selectedMonthIndex = Number(monthSelect.value);
  render();
});

resetMonthButton.addEventListener("click", () => {
  const daysInMonth = getDaysInMonth(year, selectedMonthIndex);
  const confirmed = window.confirm(
    `Reset all progress for ${monthNames[selectedMonthIndex]} ${year}?`,
  );

  if (!confirmed) {
    return;
  }

  allProgress[getMonthKey(year, selectedMonthIndex)] = createMonthState(daysInMonth);
  saveProgress();
  render();
});

habitMatrix.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".checkbox");

  if (!checkbox) {
    return;
  }

  updateHabitValue(
    year,
    selectedMonthIndex,
    Number(checkbox.dataset.habitIndex),
    Number(checkbox.dataset.dayIndex),
    checkbox.checked,
  );
  render();
});

todayQuestList.addEventListener("change", (event) => {
  const checkbox = event.target.closest(".today-checkbox");

  if (!checkbox) {
    return;
  }

  const now = getNow();

  updateHabitValue(
    now.getFullYear(),
    now.getMonth(),
    Number(checkbox.dataset.habitIndex),
    now.getDate() - 1,
    checkbox.checked,
  );
  render();
});

completeTodayButton.addEventListener("click", () => {
  const now = getNow();
  const monthState = getMonthState(now.getFullYear(), now.getMonth());
  const todayIndex = now.getDate() - 1;

  monthState.forEach((habitDays) => {
    habitDays[todayIndex] = true;
  });

  saveProgress();
  render();
});

clearTodayButton.addEventListener("click", () => {
  const confirmed = window.confirm("Clear all of today's completed quests?");

  if (!confirmed) {
    return;
  }

  const now = getNow();
  const monthState = getMonthState(now.getFullYear(), now.getMonth());
  const todayIndex = now.getDate() - 1;

  monthState.forEach((habitDays) => {
    habitDays[todayIndex] = false;
  });

  saveProgress();
  render();
});

window.addEventListener("resize", () => {
  if (activeTab === "stats") {
    drawChart();
  }
});

function populateMonthSelect() {
  monthSelect.innerHTML = monthNames
    .map(
      (monthName, monthIndex) =>
        `<option value="${monthIndex}" ${
          monthIndex === selectedMonthIndex ? "selected" : ""
        }>${monthName} ${year}</option>`,
    )
    .join("");
}

function setupTabs() {
  navTabs.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tab);
    });
  });

  updateTabUi();
}

function setActiveTab(tabName) {
  activeTab = tabName;
  window.localStorage.setItem(TAB_STORAGE_KEY, activeTab);
  updateTabUi();

  if (activeTab === "stats") {
    window.requestAnimationFrame(drawChart);
  }
}

function updateTabUi() {
  navTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === activeTab);
  });

  appPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === activeTab);
  });
}

function render() {
  const daysInMonth = getDaysInMonth(year, selectedMonthIndex);
  const monthState = getMonthState(year, selectedMonthIndex);

  updateCalendarLabels(daysInMonth);
  renderTodayPanel();
  renderMatrix(monthState, daysInMonth);
  renderTopicProgress(monthState, daysInMonth);
  renderStats(monthState, daysInMonth);

  if (activeTab === "stats") {
    drawChart();
  }
}

function renderTodayPanel() {
  const now = getNow();
  const liveMonthState = getMonthState(now.getFullYear(), now.getMonth());
  const todayIndex = now.getDate() - 1;
  const todayValues = habits.map((_, habitIndex) => Boolean(liveMonthState[habitIndex][todayIndex]));
  const completedCount = todayValues.filter(Boolean).length;
  const percent = Math.round((completedCount / habits.length) * 100);

  todayDateLabel.textContent = formatDate(now);
  dailyRing.style.setProperty("--progress-angle", `${percent * 3.6}deg`);
  dailyRingValue.textContent = `${completedCount}/${habits.length}`;
  todayCompleted.textContent = `${completedCount}`;
  todayRemaining.textContent = `${habits.length - completedCount}`;
  todayRank.textContent = getRank(percent);

  todayQuestList.innerHTML = habits
    .map((habitName, habitIndex) => {
      const checked = todayValues[habitIndex];

      return `
        <label class="today-quest ${checked ? "is-complete" : ""}">
          <input
            class="today-checkbox"
            type="checkbox"
            data-habit-index="${habitIndex}"
            ${checked ? "checked" : ""}
          />
          <span class="today-quest-content">
            <span class="quest-copy">
              <strong>${habitName}</strong>
              <span>Quest ${habitIndex + 1}</span>
            </span>
            <span class="quest-toggle" aria-hidden="true"></span>
          </span>
        </label>
      `;
    })
    .join("");
}

function renderMatrix(monthState, daysInMonth) {
  const rowColumns = `grid-template-columns: minmax(240px, 1.1fr) repeat(${daysInMonth}, minmax(32px, 1fr));`;
  habitMatrix.style.minWidth = `${Math.max(1260, 300 + daysInMonth * 38)}px`;

  const headerCells = Array.from({ length: daysInMonth }, (_, index) => {
    return `<div class="matrix-cell day-label" role="columnheader">${index + 1}</div>`;
  }).join("");

  const bodyRows = habits
    .map((habitName, habitIndex) => {
      const checkboxes = monthState[habitIndex]
        .map(
          (checked, dayIndex) => `
            <label class="matrix-cell" aria-label="${habitName} day ${dayIndex + 1}">
              <input
                class="checkbox"
                type="checkbox"
                data-habit-index="${habitIndex}"
                data-day-index="${dayIndex}"
                ${checked ? "checked" : ""}
              />
            </label>
          `,
        )
        .join("");

      return `
        <div class="matrix-row" style="${rowColumns}" role="row">
          <div class="matrix-cell matrix-label" role="rowheader">${habitName}</div>
          ${checkboxes}
        </div>
      `;
    })
    .join("");

  habitMatrix.innerHTML = `
    <div class="matrix-row matrix-header" style="${rowColumns}" role="row">
      <div class="matrix-cell matrix-label" role="columnheader">Routine / Day</div>
      ${headerCells}
    </div>
    ${bodyRows}
  `;
}

function renderTopicProgress(monthState, daysInMonth) {
  topicProgressList.innerHTML = habits
    .map((habitName, habitIndex) => {
      const completedCount = monthState[habitIndex].filter(Boolean).length;
      const percentage = Math.round((completedCount / daysInMonth) * 100);

      return `
        <article class="progress-item">
          <div class="progress-meta">
            <span>${habitName}</span>
            <span>${completedCount} / ${daysInMonth}</span>
          </div>
          <div class="progress-bar" aria-hidden="true">
            <div class="progress-fill" style="width: ${percentage}%"></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderStats(monthState, daysInMonth) {
  const totalCompleted = monthState.flat().filter(Boolean).length;
  const totalPossible = habits.length * daysInMonth;
  const overallPercent = Math.round((totalCompleted / totalPossible) * 100);
  const dailyTotals = getDailyTotals(monthState, daysInMonth);
  const streak = getCurrentStreak(dailyTotals, daysInMonth);
  const perfectCount = dailyTotals.filter((count) => count === habits.length).length;
  const lastRelevantDayIndex = getLastRelevantDayIndex(daysInMonth);
  const relevantLabel = isCurrentSelectedMonth() ? "Today" : `Day ${lastRelevantDayIndex + 1}`;
  const relevantValue = dailyTotals[lastRelevantDayIndex] ?? 0;

  overallCompletion.textContent = `${overallPercent}%`;
  currentStreak.textContent = `${streak} days`;
  perfectDays.textContent = `${perfectCount}`;
  rankBadge.textContent = getRank(overallPercent);
  chartCaption.textContent = `${relevantLabel}: ${relevantValue} / ${habits.length}`;
}

function drawChart() {
  const daysInMonth = getDaysInMonth(year, selectedMonthIndex);
  const monthState = getMonthState(year, selectedMonthIndex);
  const dailyTotals = getDailyTotals(monthState, daysInMonth);
  const panelWidth = chartCanvas.parentElement?.clientWidth || 720;
  const computedWidth = Math.min(Math.max(panelWidth - 2, 320), 720);
  const pixelRatio = window.devicePixelRatio || 1;
  const logicalHeight = 360;

  chartCanvas.width = computedWidth * pixelRatio;
  chartCanvas.height = logicalHeight * pixelRatio;
  chartCanvas.style.width = `${computedWidth}px`;
  chartCanvas.style.height = `${logicalHeight}px`;
  chartContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  chartContext.clearRect(0, 0, computedWidth, logicalHeight);

  const padding = { top: 28, right: 20, bottom: 46, left: 48 };
  const graphWidth = computedWidth - padding.left - padding.right;
  const graphHeight = logicalHeight - padding.top - padding.bottom;
  const maxValue = habits.length;

  drawGrid(chartContext, padding, graphWidth, graphHeight, maxValue, daysInMonth);
  drawLine(
    chartContext,
    dailyTotals,
    padding,
    graphWidth,
    graphHeight,
    maxValue,
    daysInMonth,
  );
}

function drawGrid(ctx, padding, graphWidth, graphHeight, maxValue, daysInMonth) {
  ctx.save();
  ctx.strokeStyle = "rgba(140, 244, 255, 0.12)";
  ctx.fillStyle = "rgba(140, 244, 255, 0.7)";
  ctx.lineWidth = 1;
  ctx.font = '12px "Orbitron", sans-serif';

  for (let yValue = 0; yValue <= maxValue; yValue += 2) {
    const y = padding.top + graphHeight - (yValue / maxValue) * graphHeight;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + graphWidth, y);
    ctx.stroke();
    ctx.fillText(String(yValue), 12, y + 4);
  }

  for (let day = 0; day < daysInMonth; day += 1) {
    const x = padding.left + (day / Math.max(daysInMonth - 1, 1)) * graphWidth;

    if ((day + 1) % 5 === 0 || day === 0 || day === daysInMonth - 1) {
      ctx.fillText(String(day + 1), x - 8, padding.top + graphHeight + 26);
    }
  }

  ctx.restore();
}

function drawLine(ctx, dailyTotals, padding, graphWidth, graphHeight, maxValue, daysInMonth) {
  const points = dailyTotals.map((value, index) => ({
    x: padding.left + (index / Math.max(daysInMonth - 1, 1)) * graphWidth,
    y: padding.top + graphHeight - (value / maxValue) * graphHeight,
    value,
  }));

  const areaGradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + graphHeight);
  areaGradient.addColorStop(0, "rgba(88, 230, 255, 0.38)");
  areaGradient.addColorStop(1, "rgba(88, 230, 255, 0.02)");

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[0].x, padding.top + graphHeight);
  points.forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.lineTo(points[points.length - 1].x, padding.top + graphHeight);
  ctx.closePath();
  ctx.fillStyle = areaGradient;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#58e6ff";
  ctx.shadowColor = "rgba(88, 230, 255, 0.45)";
  ctx.shadowBlur = 16;
  ctx.stroke();

  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = point.value === maxValue ? "#90ffba" : "#8cf4ff";
    ctx.shadowBlur = 0;
    ctx.fill();
  });

  ctx.restore();
}

function updateHabitValue(targetYear, monthIndex, habitIndex, dayIndex, checked) {
  const monthState = getMonthState(targetYear, monthIndex);
  monthState[habitIndex][dayIndex] = checked;
  saveProgress();
}

function getDailyTotals(monthState, daysInMonth) {
  return Array.from({ length: daysInMonth }, (_, dayIndex) =>
    monthState.reduce((sum, habitDays) => sum + Number(habitDays[dayIndex]), 0),
  );
}

function getCurrentStreak(dailyTotals, daysInMonth) {
  const lastRelevantDayIndex = getLastRelevantDayIndex(daysInMonth);
  let streak = 0;

  for (let dayIndex = lastRelevantDayIndex; dayIndex >= 0; dayIndex -= 1) {
    if (dailyTotals[dayIndex] > 0) {
      streak += 1;
    } else if (streak > 0) {
      break;
    }
  }

  return streak;
}

function getRank(overallPercent) {
  if (overallPercent >= 95) return "S";
  if (overallPercent >= 85) return "A";
  if (overallPercent >= 70) return "B";
  if (overallPercent >= 55) return "C";
  if (overallPercent >= 35) return "D";
  return "E";
}

function getMonthKey(targetYear, monthIndex) {
  return `${targetYear}-${String(monthIndex + 1).padStart(2, "0")}`;
}

function getMonthState(targetYear, monthIndex) {
  const monthKey = getMonthKey(targetYear, monthIndex);
  const daysInMonth = getDaysInMonth(targetYear, monthIndex);

  if (!allProgress[monthKey]) {
    allProgress[monthKey] = createMonthState(daysInMonth);
    saveProgress();
  } else {
    const normalizedState = normalizeMonthState(allProgress[monthKey], daysInMonth);

    if (normalizedState !== allProgress[monthKey]) {
      allProgress[monthKey] = normalizedState;
      saveProgress();
    }
  }

  return allProgress[monthKey];
}

function createMonthState(daysInMonth) {
  return Array.from({ length: habits.length }, () =>
    Array.from({ length: daysInMonth }, () => false),
  );
}

function normalizeMonthState(monthState, daysInMonth) {
  if (
    Array.isArray(monthState) &&
    monthState.length === habits.length &&
    monthState.every((habitDays) => Array.isArray(habitDays) && habitDays.length === daysInMonth)
  ) {
    return monthState;
  }

  return Array.from({ length: habits.length }, (_, habitIndex) => {
    const savedDays = Array.isArray(monthState?.[habitIndex]) ? monthState[habitIndex] : [];
    return Array.from({ length: daysInMonth }, (_, dayIndex) => Boolean(savedDays[dayIndex]));
  });
}

function updateCalendarLabels(daysInMonth) {
  gridTitle.textContent = `${daysInMonth}-Day Mission Grid`;
  gridNote.textContent = `Each row tracks one routine for the real ${monthNames[selectedMonthIndex]} ${year} calendar.`;
  monthSelect.value = String(selectedMonthIndex);
}

function getDaysInMonth(targetYear, monthIndex) {
  return new Date(targetYear, monthIndex + 1, 0).getDate();
}

function getLastRelevantDayIndex(daysInMonth) {
  const now = getNow();

  if (isCurrentSelectedMonth(now)) {
    return Math.min(now.getDate(), daysInMonth) - 1;
  }

  return daysInMonth - 1;
}

function isCurrentSelectedMonth(now = getNow()) {
  return year === now.getFullYear() && selectedMonthIndex === now.getMonth();
}

function startCalendarSync() {
  window.setInterval(syncWithRealCalendar, 60_000);
  window.addEventListener("focus", syncWithRealCalendar);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      syncWithRealCalendar();
    }
  });
}

function syncWithRealCalendar() {
  const now = getNow();
  const currentDateStamp = getDateStamp(now);

  if (currentDateStamp === lastSeenDateStamp) {
    return;
  }

  const wasViewingLiveMonth =
    year === lastSeenLiveYear && selectedMonthIndex === lastSeenLiveMonthIndex;

  lastSeenDateStamp = currentDateStamp;
  lastSeenLiveYear = now.getFullYear();
  lastSeenLiveMonthIndex = now.getMonth();

  if (wasViewingLiveMonth) {
    year = now.getFullYear();
    selectedMonthIndex = now.getMonth();
    populateMonthSelect();
  }

  render();
}

function getDateStamp(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

function getNow() {
  return new Date();
}

function setupInstallFlow() {
  updateInstallUi();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallUi();
  });

  installAppButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      updateInstallUi();
      return;
    }

    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    updateInstallUi();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    updateInstallUi(true);
  });
}

function updateInstallUi(forceInstalled = false) {
  const isInstalled =
    forceInstalled ||
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  const isSecureAppContext =
    window.location.protocol === "https:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isInstalled) {
    installAppButton.classList.add("is-hidden");
    installStateBadge.textContent = "Installed";
    installHint.textContent = "This device is running the app in standalone mode.";
    return;
  }

  if (deferredInstallPrompt) {
    installAppButton.classList.remove("is-hidden");
    installStateBadge.textContent = "Ready To Install";
    installHint.textContent =
      "Tap Install App on Android to add Awakening System to your home screen.";
    return;
  }

  installAppButton.classList.add("is-hidden");
  installStateBadge.textContent = isSecureAppContext ? "App Ready" : "Host On HTTPS";
  installHint.textContent = isSecureAppContext
    ? "Open this on your phone in Chrome, then use Add to Home screen if the install prompt does not appear."
    : "For phone install, open this project from an HTTPS site or localhost so Android can treat it like an app.";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Could not register service worker.", error);
    });
  });
}

function loadProgress() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.warn("Could not load saved progress.", error);
    return {};
  }
}

function loadActiveTab() {
  return window.localStorage.getItem(TAB_STORAGE_KEY) || "today";
}

function saveProgress() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
}
