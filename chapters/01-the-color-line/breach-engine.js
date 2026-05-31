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
  function cellHTML(t, seq, abbr) {
    const res = t.resistant ? " resistant" : "";
    const last = t.day === MAX_DAY ? " last-cell" : "";
    const passedHTML = t.passed
      ? `<div class="passed"><strong>Passed on:</strong> ${t.passed}</div>`
      : "";
    return `
      <div class="cell${res}${last}" data-id="${t.id}" data-day="${t.day}">
        <span class="seq">${String(seq).padStart(2,"0")}</span>
        <div class="glyph">
          <svg viewBox="-50 -50 100 100" aria-hidden="true">
            <polygon class="field" points="0,-40 40,0 0,40 -40,0" />
            <rect class="base" x="-4" y="36" width="8" height="8" />
            <rect class="base" x="36" y="-4" width="8" height="8" />
            <rect class="base" x="-4" y="-44" width="8" height="8" />
            <rect class="base" x="-44" y="-4" width="8" height="8" />
            <circle class="base" cx="0" cy="0" r="3" />
          </svg>
        </div>
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

  // Team abbreviations for monogram badges
  const ABBR = {
    bro:"BKN", cle:"CLE", slb:"STL", nyg:"NYG", bsn:"BSN",
    chw:"CWS", phi:"PHA", chc:"CHC", pit:"PIT", stl:"STL",
    cin:"CIN", was:"WSH", nyy:"NYY", phl:"PHI", det:"DET", bos:"BOS"
  };

  // Build 4x4 grid with baseball diamond watermark
  let html = '';
  // Baseball watermark (simple ball with stitching, CC0)
  html += `<svg class="diamond-watermark" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <circle cx="100" cy="100" r="90" fill="none" stroke="#d4a64a" stroke-width="1.5"/>
    <path d="M 55,25 Q 30,60 35,100 Q 38,140 65,175" fill="none" stroke="#d4a64a" stroke-width="1"/>
    <path d="M 145,25 Q 170,60 165,100 Q 162,140 135,175" fill="none" stroke="#d4a64a" stroke-width="1"/>
    <!-- Stitching marks left -->
    <line x1="48" y1="35" x2="58" y2="40" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="38" y1="55" x2="48" y2="58" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="33" y1="75" x2="43" y2="76" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="33" y1="95" x2="43" y2="95" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="35" y1="115" x2="45" y2="113" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="40" y1="135" x2="50" y2="131" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="50" y1="153" x2="60" y2="148" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="58" y1="168" x2="68" y2="162" stroke="#d4a64a" stroke-width="0.6"/>
    <!-- Stitching marks right -->
    <line x1="152" y1="35" x2="142" y2="40" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="162" y1="55" x2="152" y2="58" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="167" y1="75" x2="157" y2="76" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="167" y1="95" x2="157" y2="95" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="165" y1="115" x2="155" y2="113" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="160" y1="135" x2="150" y2="131" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="150" y1="153" x2="140" y2="148" stroke="#d4a64a" stroke-width="0.6"/>
    <line x1="142" y1="168" x2="132" y2="162" stroke="#d4a64a" stroke-width="0.6"/>
  </svg>`;
  // Cell grid
  html += '<div class="breach-grid">';
  globalOrder.forEach((t, i) => {
    const abbr = ABBR[t.id] || t.id.toUpperCase();
    html += cellHTML(t, i + 1, abbr);
  });
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
