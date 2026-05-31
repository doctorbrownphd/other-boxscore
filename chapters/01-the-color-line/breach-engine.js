// The Breach · animation engine

(function() {
  const TEAMS = window.BREACH_TEAMS;
  const MAX_DAY = 4480;          // Pumpsie Green
  const REAL_SECONDS = 30;       // animation duration at 1x
  const SCALE = REAL_SECONDS * 1000 / MAX_DAY; // ms per day

  // === Build cells in diamond layout ===
  const grid = document.getElementById("diamond-grid");

  // Sort all teams by integration date
  const globalOrder = [...TEAMS].sort((a,b) => a.day - b.day);
  const seqOf = Object.fromEntries(globalOrder.map((t, i) => [t.id, i + 1]));

  // 4x4 grid, integration order left-to-right top-to-bottom
  function cellHTML(t, seq) {
    const res = t.resistant ? " resistant" : "";
    const last = t.day === MAX_DAY ? " last-cell" : "";
    const passedHTML = t.passed
      ? `<div class="passed"><strong>Passed on:</strong> ${t.passed}</div>`
      : "";
    return `
      <div class="cell${res}${last}" data-id="${t.id}" data-day="${t.day}">
        <span class="seq">${String(seq).padStart(2,"0")}</span>
        <div class="team">${t.team}</div>
        <div class="date">${t.dt}</div>
        <div class="player">${t.player}</div>
        <div class="tip">
          <div class="h">${t.dt}  ·  ${dayLabel(t.day)}</div>
          <p class="pl">${t.player}</p>
          <p class="what">${t.what}</p>
          ${passedHTML}
        </div>
      </div>
    `;
  }
  function dayLabel(d) {
    if (d === 0) return "day zero";
    const yr = Math.floor(d / 365);
    const mo = Math.floor((d % 365) / 30);
    if (yr === 0 && mo === 0) return `+${d} days`;
    if (yr === 0) return `+${mo} months`;
    return `+${yr} years ${mo} months`;
  }

  // Build 4x4 grid with diamond watermark
  let html = '';
  // Diamond watermark SVG behind the grid
  html += `<svg class="diamond-watermark" viewBox="-80 -80 160 160" aria-hidden="true">
    <polygon points="0,-68 68,0 0,68 -68,0" fill="none" stroke="#d4a64a" stroke-width="1.5"/>
    <rect x="-5" y="58" width="10" height="10" fill="#d4a64a"/>
    <polygon points="0,-56 5,-50 -5,-50" fill="none" stroke="#d4a64a" stroke-width="1.2"/>
    <circle cx="0" cy="0" r="4" fill="#d4a64a"/>
  </svg>`;
  // Cell grid
  html += '<div class="breach-grid">';
  globalOrder.forEach((t, i) => { html += cellHTML(t, i + 1); });
  html += '</div>';
  grid.innerHTML = html;

  // === Scrubber: year tick marks ===
  const scrub = document.getElementById("scrub");
  const fill  = document.getElementById("fill");
  const head  = document.getElementById("head");
  function dayToPct(d) { return Math.min(100, Math.max(0, d / MAX_DAY * 100)); }

  // Year markers -- Apr 15 of each year, 1947 to 1959
  for (let y = 1947; y <= 1959; y++) {
    const day = (y - 1947) * 365.25;
    const pct = dayToPct(day);
    const m = document.createElement("div");
    m.className = "marker";
    m.style.left = `${pct}%`;
    m.innerHTML = `<span class="lab">${y}</span>`;
    scrub.appendChild(m);
  }

  // === Animation state ===
  let speed = 1;
  let playing = false;
  let startReal = 0;      // performance.now() when play began
  let dayAtStart = -1;     // virtual day at the moment of last play (start before Brooklyn)
  let rafId = null;

  function virtualDay() {
    if (!playing) return dayAtStart;
    const elapsed = performance.now() - startReal;
    return Math.min(MAX_DAY, dayAtStart + elapsed / SCALE * speed);
  }

  function setDay(d, options = {}) {
    const day = Math.min(MAX_DAY, Math.max(-1, d));
    fill.style.width  = Math.max(0, dayToPct(day)) + "%";
    head.style.left   = Math.max(0, dayToPct(day)) + "%";

    // Clock
    const yrFloat = 1947 + day / 365.25;
    let year = Math.floor(yrFloat);
    let dayOfYr = (day - (year - 1947) * 365.25);
    // Convert dayOfYr to month label (rough -- calendar dates per team are authoritative on the cells)
    let monthLabel;
    if (day === 0) { monthLabel = "April · pre-play"; }
    else if (day >= MAX_DAY) { monthLabel = "July 21, 1959 -- the last cell"; }
    else {
      const monthIdx = Math.floor((dayOfYr / 365.25) * 12);
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      monthLabel = months[Math.max(0, Math.min(11, monthIdx))];
    }
    document.getElementById("clk-year").textContent = year;
    document.getElementById("clk-mo").textContent   = monthLabel;

    // Light cells whose day <= current day
    const cells = document.querySelectorAll(".cell");
    let count = 0;
    cells.forEach(c => {
      const cd = +c.dataset.day;
      if (cd <= day) {
        if (!c.classList.contains("lit")) {
          c.classList.add("lit");
          if (!options.silent) {
            c.classList.add("justlit");
            setTimeout(() => c.classList.remove("justlit"), 1700);
          }
        }
        count++;
      } else {
        c.classList.remove("lit");
      }
    });
    document.getElementById("cnt-n").textContent = count;
    // Diamond watermark fades in as cells light
    const wm = document.querySelector(".diamond-watermark");
    if (wm) wm.style.opacity = Math.min(0.25, count / 16 * 0.25);
  }

  function loop() {
    if (!playing) return;
    const d = virtualDay();
    setDay(d);
    if (d >= MAX_DAY) {
      pause();
      document.getElementById("clk-mo").textContent = "July 21, 1959 -- the last cell";
      return;
    }
  }

  function play() {
    if (virtualDay() >= MAX_DAY - 0.5) {
      reset();
      setTimeout(() => play(), 30);
      return;
    }
    const baseDay = virtualDay();  // capture BEFORE we flip playing=true
    dayAtStart = baseDay;
    startReal = performance.now();
    playing = true;
    document.getElementById("btn-play").textContent = "\u23F8  Pause";
    if (rafId) clearInterval(rafId);
    rafId = setInterval(loop, 33);
  }
  function pause() {
    playing = false;
    dayAtStart = virtualDay();
    document.getElementById("btn-play").textContent = "▶  Play";
    if (rafId) clearInterval(rafId);
  }
  function reset() {
    pause();
    dayAtStart = -1;
    setDay(-1, { silent: true });
    document.getElementById("cnt-n").textContent = 0;
    document.getElementById("clk-year").textContent = 1947;
    document.getElementById("clk-mo").textContent = "April  \u00b7  pre-play";
  }

  // === Wire up controls ===
  document.getElementById("btn-play").addEventListener("click", () => {
    if (playing) pause(); else play();
  });
  document.getElementById("btn-reset").addEventListener("click", reset);

  document.querySelectorAll(".speed button").forEach(b => {
    b.addEventListener("click", () => {
      const s = parseFloat(b.dataset.speed);
      speed = s;
      document.querySelectorAll(".speed button").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
      if (playing) {
        // Re-base
        dayAtStart = virtualDay();
        startReal = performance.now();
      }
    });
  });

  // Scrubber drag
  let dragging = false;
  function scrubAt(clientX) {
    const r = scrub.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    const d = pct * MAX_DAY;
    pause();
    dayAtStart = d;
    setDay(d, { silent: true });
  }
  scrub.addEventListener("mousedown", (e) => { dragging = true; scrubAt(e.clientX); });
  window.addEventListener("mousemove", (e) => { if (dragging) scrubAt(e.clientX); });
  window.addEventListener("mouseup",   () => { dragging = false; });

  // Initial paint -- all dark (day < 0 so even Brooklyn at day=0 is unlit)
  setDay(-1, { silent: true });
  // After initial paint, restore counter to 0 explicitly
  document.getElementById("cnt-n").textContent = 0;
  document.getElementById("clk-year").textContent = 1947;
  document.getElementById("clk-mo").textContent = "April  \u00b7  pre-play";
})();
