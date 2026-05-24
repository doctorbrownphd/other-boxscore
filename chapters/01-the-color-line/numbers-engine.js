// The Numbers They Kept · lane builder + animated toggle

(function() {
  const cats = window.NUMBERS;
  const root = document.getElementById("lanes");

  function fmt(v) {
    // 0.367 -> .367 (drop leading zero for batting averages)
    // 1.421 -> 1.421 (keep)
    if (v < 1)  return v.toFixed(3).replace(/^0/, "");
    return v.toFixed(3);
  }

  function laneHTML(c, idx) {
    const min = c.min, max = c.max;
    const xOf = v => ((v - min) / (max - min)) * 100;

    // Combined list for "included" view; sort desc by v
    const all = [...c.pre.map(p => ({ ...p, kind: "pre" })),
                 ...c.addPost.map(p => ({ ...p, kind: "post" }))]
                .sort((a, b) => b.v - a.v);

    // Assign vertical row offsets to avoid overlapping name labels
    // Sort by position; row = 0/1/2 cycling within crowded clusters
    const sortedByX = [...all].sort((a, b) => a.v - b.v);
    const rowOf = new Map();
    let lastX = -100, lastRow = 0;
    sortedByX.forEach((p) => {
      const x = xOf(p.v);
      if (x - lastX < 8) {
        lastRow = (lastRow + 1) % 3;
      } else {
        lastRow = 0;
      }
      rowOf.set(p.name + "|" + p.v + "|" + (p.dn || ""), lastRow);
      lastX = x;
    });

    // Build markers -- label only top 3 MLB + top 2 NL per lane, rest are unlabeled dots
    const topPre = c.pre.slice(0, 3);
    const topPost = c.addPost.slice(0, 2);
    const labeled = new Set([
      ...topPre.map(p => p.name + "|" + p.v),
      ...topPost.map(p => p.name + "|" + p.v),
    ]);

    let labelIdx = 0;
    const allMarkers = all.map(p => {
      const x = xOf(p.v);
      const key = p.name + "|" + p.v;
      const showLabel = labeled.has(key);
      const isLeader = p === all[0];
      // Alternate above (row0) and below (row1) to avoid collisions
      const row = showLabel ? (labelIdx++ % 2) : 0;
      const cls = `marker ${p.kind} row${row}${isLeader && p.kind === "post" ? " leader" : ""}${showLabel ? "" : " unlabeled"}`;
      return `
        <div class="${cls}" style="left: ${x}%">
          ${showLabel ? `<span class="v">${fmt(p.v)}</span>` : ""}
          ${showLabel && p.dn ? `<span class="dn">${p.dn}</span>` : ""}
          <div class="dot"></div>
          ${showLabel ? `<span class="nm">${p.name}</span>` : ""}
        </div>
      `;
    }).join("");

    // Axis ticks
    const steps = 5;
    let ticks = "";
    for (let i = 0; i <= steps; i++) {
      const v = min + (max - min) * (i / steps);
      const x = (i / steps) * 100;
      ticks += `<div class="tick" style="left:${x}%"><span class="lab">${fmt(v)}</span></div>`;
    }

    // Pre-leader (left summary)
    const preLeader = c.pre[0];
    const postLeader = all[0];

    return `
      <div class="lane" data-cat="${c.cat}">
        <div class="lab">
          <h3 class="h">${c.cat}</h3>
          <div class="u">${c.unit}</div>
          <div class="leader">
            <span>Pre-2024 leader</span>
            <span class="nm">${preLeader.name} · ${fmt(preLeader.v)}</span>
          </div>
        </div>
        <div class="track">
          ${ticks}
          <div class="axis"></div>
          ${allMarkers}
        </div>
        <div class="now"
             data-pre-v="${fmt(preLeader.v)}"
             data-pre-nm="${preLeader.name}"
             data-post-v="${fmt(postLeader.v)}"
             data-post-nm="${postLeader.name}">
          <div class="lab2">Now leads</div>
          <div class="v">${fmt(preLeader.v)}</div>
          <div class="nm2">${preLeader.name}</div>
        </div>
      </div>
    `;
  }

  root.innerHTML = cats.map(laneHTML).join("");

  // === Toggle ===
  const buttons = document.querySelectorAll(".toggle .switch button");
  function setMode(mode) {
    buttons.forEach(b => b.classList.toggle("on", b.dataset.mode === mode));
    root.classList.toggle("included", mode === "post");
    // Update the "now leads" pill on each lane
    root.querySelectorAll(".now").forEach(n => {
      const v  = n.dataset[mode + "V"];
      const nm = n.dataset[mode + "Nm"];
      n.querySelector(".v").textContent  = v;
      n.querySelector(".nm2").textContent = nm;
    });
  }
  buttons.forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
  setMode("pre");
})();
