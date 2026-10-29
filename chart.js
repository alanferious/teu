/* TEU · Unit 4 as a nautical chart. The Unit 4 home is a chart of the world with one port of call per
   subtopic, each a real harbour tied to that subtopic's flagship example; its marker shows the state of
   its flashcards (anchored once every term is mastered). Each subtopic page is a chart plate with its
   real-world examples pinned on their countries, then the full notes. Flashcards are logbook entries.
   The map is drawn from data/world.js. Loaded before app.js and only reads its globals when called. */
window.TEUChart = (() => {
  const UIK = "teu-chart";
  const ui = { map: false };                            // phones: the chart is behind a toggle
  try { const u = JSON.parse(localStorage.getItem(UIK)) || {}; ui.map = !!u.map; } catch {}
  const saveUi = () => { try { localStorage.setItem(UIK, JSON.stringify(ui)); } catch {} };
  const NM = [0, 40, 120, 160];                          // nautical miles per grade: Forgot, Shaky, Got it, Easy
  const GRADE_WORDS = { again: "Ran aground", hard: "Heavy weather", good: "Fair winds", easy: "Full sail" };
  const W = 1000, H = 392;
  const P = (lon, lat) => [(lon + 180) * W / 360, (83 - lat) * W / 360];
  const INK = "#2E2A24", MAG = "#B0247A", VIO = "#5B4C85", RED = "#C23B22", PAPER = "#F4F1E6", SEA = "#8DA9B8", LAND = "#EDDFB4";
  // One port per subtopic: a real harbour linked to its flagship example, and the reason in one line
  const PORT = {
    "4.1": ["Valparaíso", -71.6, -33.0, "Chile's cherries to China"], "4.2": ["Rotterdam", 4.5, 51.9, "EU tariffs on Chinese EVs and steel"],
    "4.3": ["Fremantle", 115.7, -32.1, "Australia's barley and wine freeze"], "4.4": ["Montevideo", -56.2, -34.9, "the EU–Mercosur deal"],
    "4.5": ["Yokohama", 139.6, 35.4, "the yen at 160"], "4.6": ["Shanghai", 121.5, 31.2, "China's trillion-dollar surplus"],
    "4.7": ["Puntarenas", -84.8, 10.0, "Costa Rica pays to regrow forest"], "4.8": ["Colombo", 79.9, 6.9, "Sri Lanka's HDI against Guyana's income"],
    "4.9": ["Port Sudan", 37.2, 19.6, "war erases development in Sudan"], "4.10": ["Chattogram", 91.8, 22.3, "Bangladesh's garment-led growth"],
  };
  const SHORT = { "4.1": "Benefits of trade", "4.2": "Protection", "4.3": "For and against", "4.4": "Integration", "4.5": "Exchange rates", "4.6": "Balance of payments",
    "4.7": "Sustainable development", "4.8": "Measuring development", "4.9": "Barriers", "4.10": "Strategies" };
  const EU = ["France", "Germany", "Italy", "Spain", "Portugal", "Netherlands", "Belgium", "Luxembourg", "Ireland", "Denmark", "Sweden", "Finland", "Estonia", "Latvia", "Lithuania", "Poland", "Czechia", "Slovakia", "Hungary", "Austria", "Slovenia", "Croatia", "Romania", "Bulgaria", "Greece", "Cyprus"];
  // Where each Unit 4 example is pinned (lon, lat), its short code, and the countries it tints. Global cases have no pin.
  const PIN = {
    "china-rare-earth-export-controls": ["CHN", [[110, 40.6]], ["China"]], "eu-countervailing-duties-chinese-evs": ["EU", [[4.35, 50.85]], EU],
    "eu-steel-quota-2026": ["EU", [[6.8, 51.4]], EU], "australia-china-barley-wine": ["AUS", [[133, -25]], ["Australia"]],
    "indonesia-nickel-export-ban": ["IDN", [[121.5, -2]], ["Indonesia"]], "vietnam-china-plus-one": ["VNM", [[105.8, 21]], ["Vietnam"]],
    "eu-mercosur-agreement": ["MERC", [[-56.2, -34.9]], ["Brazil", "Argentina", "Uruguay", "Paraguay"]], "afcfta": ["AFR", [[38.7, 9]], []],
    "wto-appellate-body-crisis": ["WTO", [[6.14, 46.2]], []], "eu-cbam": ["EU", [[4.5, 51.9]], EU], "brexit-uk-eu-reset": ["GBR", [[-0.13, 51.5]], ["United Kingdom"]],
    "japan-yen-intervention": ["JPY", [[139.7, 35.7]], ["Japan"]], "argentina-peso-band": ["ARS", [[-58.4, -34.6]], ["Argentina"]],
    "egypt-float-ras-el-hekma": ["EGP", [[31.2, 30]], ["Egypt"]], "nigeria-naira-float": ["NGN", [[3.4, 6.5]], ["Nigeria"]],
    "turkey-lira-inflation": ["TRY", [[29, 41]], ["Turkey"]], "hong-kong-peg-both-sides": ["HKD", [[114.17, 22.3]], []],
    "swiss-franc-safe-haven": ["CHF", [[8.54, 47.37]], ["Switzerland"]], "china-trillion-surplus": ["CNY", [[121.5, 31.2]], ["China"]],
    "bulgaria-joins-euro": ["BGN", [[23.3, 42.7]], ["Bulgaria"]], "hormuz-oil-shock-tot": ["OIL", [[56.5, 26.6]], []],
    "ghana-cedi-gold-cocoa": ["GHS", [[-1.6, 6.7]], ["Ghana"]], "uk-brexit-pound-jcurve": ["GBP", [[-0.13, 51.5]], ["United Kingdom"]],
    "sdg-report-2026-off-track": ["SDG", [], []], "guyana-vs-sri-lanka-hdi-gap": ["GUY", [[-58.2, 6.8], [80.7, 7.9]], ["Guyana", "Sri Lanka"]],
    "india-big-economy-poor-people": ["IND", [[77.2, 28.6]], ["India"]], "uk-aid-cut-0-3-percent": ["GBR", [[-0.13, 51.5]], ["United Kingdom"]],
    "zambia-common-framework": ["ZMB", [[28.3, -15.4]], ["Zambia"]], "botswana-diamonds-institutions": ["BWA", [[25.9, -24.65]], ["Botswana"]],
    "bangladesh-garments-ldc-graduation": ["BGD", [[90.4, 23.8]], ["Bangladesh"]], "vietnam-export-led-umic": ["VNM", [[106.7, 10.8]], ["Vietnam"]],
    "mpesa-mobile-money": ["KEN", [[36.8, -1.3]], ["Kenya"]], "grameen-microfinance": ["BGD", [[90.1, 24.4]], ["Bangladesh"]],
    "india-digital-public-infrastructure": ["IND", [[77.6, 13]], ["India"]], "sudan-war-development-reversal": ["SDN", [[32.5, 15.6]], ["Sudan"]],
    "afghanistan-women-exclusion": ["AFG", [[69.2, 34.5]], ["Afghanistan"]], "chile-cherries-china": ["CHL", [[-71.6, -33]], ["Chile"]],
    "morocco-car-exports": ["MAR", [[-5.8, 35.8]], ["Morocco"]], "new-zealand-china-fta-dairy": ["NZL", [[174.8, -36.85]], ["New Zealand"]],
    "mission-300-africa-electricity": ["AFR", [[20, 2]], []], "costa-rica-forest-payments": ["CRI", [[-84.1, 9.9]], ["Costa Rica"]],
    "china-extreme-poverty-declared-over": ["CHN", [[106.7, 26.6]], ["China"]],
  };
  const pinOf = e => PIN[e.id] || ["", [], []];

  // ---------- Model ----------
  const subs = () => COURSE.filter(t => t.unit === "4");
  const termsOf = n => CDEFS.filter(d => d.n === n);
  const exOf = n => DATA.filter(e => e.topics.includes(n)).sort((a, b) => (b.topic === n) - (a.topic === n) || b.score - a.score);
  const dayKey = t => { const d = new Date(t); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); };
  function port(n) {
    const terms = termsOf(n), st = terms.map(d => { const c = prog(d.id); return !c ? "new" : stateOf(d.id) === "mastered" ? "done" : c.due <= now() - DAY ? "late" : c.due <= now() ? "due" : "wait"; });
    const by = k => st.filter(s => s === k).length;
    const p = { n, t: CT[n], terms, st, done: by("done"), late: by("late"), due: by("due") + by("late"), fresh: by("new"), name: PORT[n][0], why: PORT[n][3] };
    const lateDays = p.late ? Math.max(1, Math.floor((now() - Math.min(...terms.filter((d, i) => st[i] === "late").map(d => prog(d.id).due))) / DAY)) : 0;
    p.state = terms.length && p.done === terms.length ? "anchored" : p.late ? "late" : p.due ? "due" : p.fresh === terms.length ? "new" : "wait";
    p.label = { anchored: "Anchored", late: `Overdue ${lateDays} day${lateDays === 1 ? "" : "s"}`, due: `${p.due} due`, new: "Not charted", wait: p.fresh ? `Under way · ${p.fresh} new` : "Under way" }[p.state];
    p.lateDays = lateDays;
    return p;
  }
  // The next port, one rule everywhere: the most overdue, then the one with most due, then the first not yet anchored
  function nextPort(ps = subs().map(t => port(t.n))) {
    const late = ps.filter(p => p.state === "late").sort((a, b) => b.lateDays - a.lateDays)[0];
    return late || ps.filter(p => p.state === "due").sort((a, b) => b.due - a.due)[0] || ps.find(p => p.state !== "anchored") || null;
  }
  function papers() {
    const ids = [...CDEFS.filter(d => d.unit === "4").map(d => d.id), ...DATA.map(e => e.id)];
    const evs = ids.flatMap(evOf).filter(e => e[0]);
    const nm = evs.reduce((a, e) => a + NM[e[3]], 0), days = new Set(evs.map(e => dayKey(e[0])));
    let t = days.has(dayKey(now())) ? now() : now() - DAY, run = 0;
    while (days.has(dayKey(t))) { run++; t -= DAY; }
    const due = CDEFS.filter(d => d.unit === "4" && prog(d.id) && isDue(d.id)).length;
    return { nm, run, due };
  }
  const nmStr = m => m.toLocaleString("en-GB") + " nm";
  const stats = () => { const ps = subs().map(t => port(t.n)), p = papers(); return `Logged <b>${nmStr(p.nm)}</b> · ${ps.filter(x => x.state === "anchored").length} of ${ps.length} anchored · <b>${p.due}</b> due`; };

  // ---------- Drawing the chart ----------
  // The land is drawn once into a hidden SVG and reused by every chart on the page
  function ensureDefs() {
    if (document.getElementById("chartDefs") || typeof WORLD === "undefined") return;
    const all = Object.values(WORLD).map(d => `<path d="${d}"/>`).join("");
    const box = document.createElement("div");
    box.innerHTML = `<svg id="chartDefs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
      <g id="cxShelf2" fill="#D6E7EF" stroke="#D6E7EF" stroke-width="18" stroke-linejoin="round">${all}</g>
      <g id="cxShelf" fill="#BFD9E6" stroke="#BFD9E6" stroke-width="9" stroke-linejoin="round">${all}</g>
      <g id="cxLand" fill="${LAND}" stroke="${INK}" stroke-width=".7" stroke-linejoin="round">${all}</g>
      <clipPath id="cxClip"><rect width="${W}" height="${H}"/></clipPath></defs></svg>`;
    document.body.append(box.firstChild);
  }
  function rand(seed) { return () => (seed = (seed * 9301 + 49297) % 233280) / 233280; }
  function soundings(seed) {
    const r = rand(seed), V = ["12", "27", "38", "45", "54", "61", "73", "88", "96", "104", "2½", "7", "19", "33"];
    let s = ""; for (let i = 0; i < 200; i++) s += `<text x="${(6 + r() * (W - 18)).toFixed(0)}" y="${(12 + r() * (H - 18)).toFixed(0)}">${V[(r() * V.length) | 0]}</text>`;
    return `<g class="cx-snd">${s}</g>`;
  }
  function rose(cx, cy, r) {
    let ticks = "", rays = "";
    for (let a = 0; a < 360; a += 10) { const L = a % 30 ? 3.5 : 7, c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); ticks += `M${(cx + r * c).toFixed(1)},${(cy + r * s).toFixed(1)}L${(cx + (r - L) * c).toFixed(1)},${(cy + (r - L) * s).toFixed(1)}`; }
    for (let i = 0; i < 16; i++) { const a = i * 22.5 * Math.PI / 180; rays += `M${cx},${cy}L${(cx + 1400 * Math.cos(a)).toFixed(0)},${(cy + 1400 * Math.sin(a)).toFixed(0)}`; }
    return `<path d="${rays}" stroke="${MAG}" stroke-width=".35" opacity=".45"/><g stroke="${MAG}" fill="none"><circle cx="${cx}" cy="${cy}" r="${r}"/><circle cx="${cx}" cy="${cy}" r="${r - 9}"/><path d="${ticks}"/></g>
      <path d="M${cx},${cy - r + 10}l5,${r - 10} -5,6 -5,-6z" fill="${MAG}"/><path d="M${cx},${cy + r - 10}l5,${-(r - 10)} -5,-6 -5,6z" fill="none" stroke="${MAG}"/><text x="${cx}" y="${cy - r - 5}" text-anchor="middle" class="cx-n">N</text>`;
  }
  function frame() {
    let d = ""; for (let x = 0; x <= W; x += 10) d += `M${x},0v5M${x},${H}v-5`; for (let y = 0; y <= H; y += 10) d += `M0,${y}h5M${W},${y}h-5`;
    let g = ""; for (let lon = -150; lon <= 180; lon += 30) g += `M${P(lon, 0)[0].toFixed(1)},0V${H}`; for (const lat of [60, 30, 0, -30]) g += `M0,${P(0, lat)[1].toFixed(1)}H${W}`;
    return { grat: `<path d="${g}" stroke="${INK}" stroke-opacity=".16" stroke-width=".7" fill="none"/>`, border: `<rect width="${W}" height="${H}" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="${d}" stroke="${INK}" stroke-width=".8"/><rect x="-12" y="-12" width="${W + 24}" height="${H + 24}" fill="none" stroke="${INK}" stroke-width=".6"/>` };
  }
  // Labels go where they fit: try eight directions at three distances, avoiding every other label, marker and rose
  const textW = (s, px) => s.length * px * .56;
  function place(items, blocked) {
    const boxes = blocked.slice(), hit = (b, c) => b.x < c.x + c.w && c.x < b.x + b.w && b.y < c.y + c.h && c.y < b.y + b.h;
    const DIRS = [[1, -1], [1, 1], [-1, -1], [-1, 1], [1, 0], [-1, 0], [0, -1], [0, 1]];
    for (const it of items) {
      let best = null, bestHits = Infinity;
      search: for (const r of [12, 26, 44]) for (const [dx, dy] of DIRS) {
        const w = it.w, h = it.h, ax = it.x + dx * r, ay = it.y + dy * r * .8;
        const x = dx > 0 ? ax : dx < 0 ? ax - w : ax - w / 2, y = dy > 0 ? ay : dy < 0 ? ay - h : ay - h / 2;
        const b = { x, y, w, h };
        if (x < 4 || y < 4 || x + w > W - 4 || y + h > H - 4) continue;
        const n = boxes.filter(c => hit(b, c)).length;
        if (n < bestHits) { bestHits = n; best = { ...b, r, anchor: dx > 0 ? "start" : dx < 0 ? "end" : "middle", tx: dx > 0 ? x : dx < 0 ? x + w : x + w / 2 }; }
        if (n === 0) break search;
      }
      if (best) { boxes.push(best); it.pos = best; }
    }
    return items;
  }
  function chartSVG({ seed, tint = {}, marks, roses, label }) {
    ensureDefs();
    const f = frame(), hl = Object.entries(tint).filter(([n]) => WORLD[n]).map(([n, c]) => `<path d="${WORLD[n]}" fill="${c}" stroke="${INK}" stroke-width=".7"/>`).join("");
    const blocked = [...marks.map(m => ({ x: m.x - 9, y: m.y - 9, w: 18, h: 18 })), ...roses.map(([x, y, r]) => ({ x: x - r - 6, y: y - r - 14, w: 2 * r + 12, h: 2 * r + 20 }))];
    place(marks, blocked);
    const lbl = marks.map(m => { const p = m.pos; if (!p) return ""; const lead = p.r > 12 ? `<path d="M${m.x.toFixed(1)},${m.y.toFixed(1)}L${(p.anchor === "start" ? p.x : p.anchor === "end" ? p.x + p.w : p.x + p.w / 2).toFixed(1)},${(p.y + p.h / 2).toFixed(1)}" stroke="${m.col || INK}" stroke-width=".7" stroke-dasharray="2 2"/>` : "";
      return lead + label(m, p); }).join("");
    return `<rect x="-30" y="-30" width="${W + 60}" height="${H + 60}" fill="${PAPER}"/><rect width="${W}" height="${H}" fill="${PAPER}"/>
      <g clip-path="url(#cxClip)">${soundings(seed)}${f.grat}<use href="#cxShelf2"/><use href="#cxShelf"/><use href="#cxLand"/>${hl}${roses.map(r => rose(...r)).join("")}</g>
      ${marks.map(m => m.glyph).join("")}${lbl}${f.border}`;
  }
  const SHIP = (x, y) => `<g transform="translate(${(x - 13).toFixed(1)},${(y + 11).toFixed(1)})"><path d="M0,9h26l-4,6h-19z" fill="${INK}"/><path d="M6,9v-9h8v9M15,9v-6h6v6" fill="${INK}"/></g>`;
  function buoy(state, x, y) {
    const X = x.toFixed(1), Y = y.toFixed(1);
    if (state === "anchored") return `<g transform="translate(${X},${Y})" fill="none" stroke="${INK}" stroke-width="1.6"><circle cy="-6" r="2.6"/><path d="M0,-3.4V7M-5,1H5M-6,3c1,4 4,5 6,5s5-1 6-5"/></g>`;
    if (state === "new") return `<circle cx="${X}" cy="${Y}" r="5" fill="${PAPER}" stroke="${INK}" stroke-width="1.4"/>`;
    if (state === "late") return `<g transform="translate(${X},${Y})"><circle r="7" fill="${PAPER}" stroke="${RED}" stroke-width="1.6" stroke-dasharray="2 1.6"/><path d="M-4,0H4M0,-4V4" stroke="${RED}" stroke-width="2"/></g>`;
    if (state === "wait") return `<path d="M${X},${(y - 6).toFixed(1)}l5,6 -5,6 -5,-6z" fill="${PAPER}" stroke="${MAG}" stroke-width="1.6"/>`;
    return `<path d="M${X},${Y} l14,-20 a24,24 0 0 1 10,9z" fill="${MAG}" opacity=".5"/><path d="M${X},${(y - 6).toFixed(1)}l5,6 -5,6 -5,-6z" fill="${MAG}" stroke="${INK}"/>`;
  }
  const KEY_HTML = `<div class="cx-key" aria-hidden="true"><span class="k">Key</span>
    <span><svg viewBox="-9 -11 18 22">${buoy("anchored", 0, 0)}</svg>Anchored: every term mastered</span>
    <span><svg viewBox="-9 -9 26 18">${buoy("due", 0, 0).replace('opacity=".5"', 'opacity="0"')}</svg>Cards due</span>
    <span><svg viewBox="-9 -9 18 18">${buoy("late", 0, 0)}</svg>Overdue</span>
    <span><svg viewBox="-9 -9 18 18">${buoy("wait", 0, 0)}</svg>Under way, nothing due</span>
    <span><svg viewBox="-9 -9 18 18">${buoy("new", 0, 0)}</svg>Not charted yet</span>
    <span><svg viewBox="-15 -4 30 26">${SHIP(0, -8)}</svg>Next port to study</span></div>`;

  // ---------- Unit 4 home: the chart of the world ----------
  function homeHTML() {
    const ps = subs().map(t => port(t.n)), nx = nextPort(ps), pp = papers();
    const marks = ps.map(p => { const [x, y] = P(PORT[p.n][1], PORT[p.n][2]); const l1 = `${p.n} ${SHORT[p.n]}`, l2 = p.name;
      return { x, y, p, w: Math.max(textW(l1, 11.5), textW(l2, 10)), h: 26, glyph: `<g class="cx-port" data-ctopic="${p.n}"><title>${p.n} ${esc(p.t.short)}: ${esc(p.label)}</title><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16" fill="transparent"/>${buoy(p.state, x, y)}${nx && nx.n === p.n ? SHIP(x, y) : ""}</g>`, l1, l2 }; });
    const svg = chartSVG({ seed: 11, marks, roses: [[150, 300, 44], [690, 332, 36]],
      label: (m, p) => `<g class="cx-port" data-ctopic="${m.p.n}"><text x="${p.tx.toFixed(1)}" y="${(p.y + 11).toFixed(1)}" text-anchor="${p.anchor}" class="cx-pn">${esc(m.l1)}</text><text x="${p.tx.toFixed(1)}" y="${(p.y + 23).toFixed(1)}" text-anchor="${p.anchor}" class="cx-pp">${esc(m.l2)}</text></g>` });
    const rows = ps.map(p => `<button class="cx-row" data-ctopic="${p.n}"><span class="n">${p.n}</span><span class="nm"><b>${esc(p.t.name)}${hlMark(p.t.hl)}</b><small>Port of ${esc(p.name)}: ${esc(p.why)}</small></span><span class="num">${p.done} of ${p.terms.length}</span><span class="num">${DATA.filter(e => e.topic === p.n).length}</span><span class="st st-${p.state}">${esc(p.label)}</span></button>`).join("");
    const voy = ps.map(p => `<i class="${p.state}"></i>`).join("");
    const go = pp.due ? `<button class="cx-btn" data-view="cards">Set sail: ${pp.due} due <kbd>D</kbd></button>` : `<button class="cx-btn" data-view="cards">Open flashcards <kbd>D</kbd></button>`;
    return `<div class="cx">
      <div class="cx-title"><div><p class="cx-cap">TEU Hydrographic · Unit 4 · The global economy</p><h2>Chart of the World Economy</h2></div>
        <div class="cx-act"><p>${nx ? `Next port: <b>${nx.n} ${esc(nx.t.short)}</b>, ${esc(nx.label.toLowerCase())}` : "Every port anchored"}</p>${go}</div></div>
      <button class="cx-maptoggle" data-cx="map" aria-expanded="${ui.map}">${ui.map ? "Hide the chart" : "Show the chart"}</button>
      <div class="cx-map${ui.map ? " on" : ""}"><svg class="cx-chart" viewBox="-30 -30 ${W + 60} ${H + 60}" aria-hidden="true" focusable="false">${svg}</svg>${KEY_HTML}</div>
      <div class="cx-lay">
        <section><h3 class="cx-h">Subtopics <span>ports of call, in syllabus order</span></h3>
          <div class="cx-table"><div class="cx-row h" aria-hidden="true"><span>No.</span><span>Subtopic</span><span class="num">Mastered</span><span class="num">Examples</span><span class="st">Status</span></div>${rows}</div></section>
        <aside class="cx-papers" aria-label="Ship's papers"><h3>Ship's papers</h3><p class="sub">TEU Meridian, Unit 4 voyage</p>
          <div class="cx-voy" aria-hidden="true">${voy}</div>
          <div class="row"><span>Ports anchored</span><b>${ps.filter(p => p.state === "anchored").length} of ${ps.length}</b></div>
          <div class="row"><span>Cards due</span><b>${pp.due}</b></div><div class="row"><span>Days at sea in a row</span><b>${pp.run}</b></div><div class="row"><span>Logged</span><b>${nmStr(pp.nm)}</b></div>
          <p class="note">A port is anchored when every term there is mastered. Each grade logs nautical miles: 160 for Easy, 120 for Got it, 40 for Shaky. The examples themselves are drilled in the evidence bank.</p></aside>
      </div></div>`;
  }

  // ---------- A subtopic: its chart plate, then the notes ----------
  function plateHTML(n) {
    const p = port(n), t = p.t, ex = exOf(n), i = COURSE.indexOf(t), prev = COURSE[i - 1], next = COURSE[i + 1];
    const pv = prev?.unit === "4" ? prev : null, nxt = next?.unit === "4" ? next : null;
    const drilled = e => !!prog(e.id), tint = {};
    for (const e of ex) for (const c of pinOf(e)[2]) if (!(c in tint) || drilled(e)) tint[c] = drilled(e) ? "#E2B28F" : "#E6CF92";
    const marks = ex.flatMap(e => pinOf(e)[1].map(([lon, lat]) => { const [x, y] = P(lon, lat), on = drilled(e), col = on ? MAG : VIO;
      return { x, y, e, col, w: textW(e.mem.tag, 12), h: 15, glyph: `<g class="cx-pin" data-cxex="${esc(e.id)}"><title>${esc(e.mem.tag)}</title><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="transparent"/><path d="M${x.toFixed(1)},${(y - 6).toFixed(1)}l5,6 -5,6 -5,-6z" fill="${on ? MAG : PAPER}" stroke="${col}" stroke-width="1.5"/></g>` }; }));
    const svg = chartSVG({ seed: 23 + i, tint, marks, roses: [[470, 300, 40]],
      label: (m, q) => `<text x="${q.tx.toFixed(1)}" y="${(q.y + 11.5).toFixed(1)}" text-anchor="${q.anchor}" class="cx-pl" fill="${m.col}" data-cxex="${esc(m.e.id)}">${esc(m.e.mem.tag)}</text>` });
    const pinned = ex.filter(e => pinOf(e)[1].length).length, nDrilled = ex.filter(drilled).length;
    const list = (xs, cls = "") => `<ul class="${cls}">${xs.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const sec = (title, sub, body) => `<section class="cx-sec"><h3 class="cx-h">${title}${sub ? ` <span>${sub}</span>` : ""}</h3>${body}</section>`;
    const ORDER = { late: 0, due: 1, new: 2, wait: 3, done: 4 }, WORD = { late: "Overdue", due: "Due", new: "New", wait: "Learning", done: "Mastered" };
    const order = p.terms.map((d, j) => j).sort((a, b) => ORDER[p.st[a]] - ORDER[p.st[b]] || a - b);
    const defs = order.map(j => { const d = p.terms[j], s = p.st[j]; return `<div class="cx-def${s === "done" ? " ok" : ""}"><span class="tick" aria-hidden="true">${s === "done" ? "✓" : ""}</span><div><b>${esc(d.t)}${hlMark(d.hl && !t.hl)}</b><p>${esc(d.d)}</p></div><span class="st st-${s}">${WORD[s]}</span></div>`; }).join("");
    const exs = ex.map(e => { const [code] = pinOf(e), home = e.topic === n;
      return `<details class="cx-ex" data-cxex="${esc(e.id)}"><summary><span class="code">${esc(code)}</span><span><b>${esc(e.mem.tag)}</b><span class="t">${esc(e.title)} · ${esc(e.region)}${home ? "" : ` · from ${e.topic}`}</span></span><span class="st st-${drilled(e) ? stateOf(e.id) === "mastered" ? "done" : "wait" : "new"}">${drilled(e) ? stateLabel[stateOf(e.id)] : "To drill"}</span></summary>
        <div class="cx-exb">${storyHTML(e.mem)}${numsHTML(e.mem)}<p class="use"><b>Use it for</b> ${esc(e.mem.use)}</p>${butHTML(e.mem)}
          <div class="cx-acts"><button class="btn" data-goto="${esc(e.id)}" data-gototopic="${esc(n)}">Open in the evidence bank</button><button class="cx-link" data-cx="top">Back to the chart</button></div></div></details>`; }).join("");
    const go = p.due + p.fresh ? `<button class="cx-btn" data-view="cards">Set sail: ${p.due ? p.due + " due" : p.fresh + " new"} <kbd>D</kbd></button>` : `<button class="cx-btn" data-view="cards">Open flashcards <kbd>D</kbd></button>`;
    return `<div class="cx cx-plate">
      <button class="cx-back" data-ctopic="u4"><svg viewBox="0 0 26 26" aria-hidden="true"><path d="M20 13H6M11 8l-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square"/></svg>Chart of the world</button>
      <div class="cx-title"><div><p class="cx-cap">Plate ${n} · Port of ${esc(p.name)}, ${esc(p.why)}</p><h2>${n} ${esc(t.name)}${hlMark(t.hl)}</h2></div>
        <div class="cx-act"><p>${pinned} example${pinned === 1 ? "" : "s"} pinned · ${nDrilled} drilled</p></div></div>
      <button class="cx-maptoggle" data-cx="map" aria-expanded="${ui.map}">${ui.map ? "Hide the chart" : "Show the chart"}</button>
      <div class="cx-map${ui.map ? " on" : ""}" id="cxPlate"><svg class="cx-chart" viewBox="-30 -30 ${W + 60} ${H + 60}" aria-hidden="true" focusable="false">${svg}</svg>
        <div class="cx-key" aria-hidden="true"><span class="k">Key</span><span><svg viewBox="-7 -8 14 16"><path d="M0,-6l5,6 -5,6 -5,-6z" fill="${MAG}" stroke="${MAG}"/></svg>Example drilled</span><span><svg viewBox="-7 -8 14 16"><path d="M0,-6l5,6 -5,6 -5,-6z" fill="${PAPER}" stroke="${VIO}" stroke-width="1.5"/></svg>Example to drill</span><span><i class="sw"></i>Its country</span><span class="note">Click a pin to open its example below.</span></div></div>
      <div class="cx-bar"><span class="fl">${n} ${esc(t.short)}</span><span class="s st-${p.state}">${esc(p.label)}</span><span class="c">${p.done} mastered · ${p.due} due · ${p.fresh} new · ${p.terms.length} terms</span>${go}</div>
      <p class="cx-big">${esc(t.big)}</p>
      <div class="cx-grid">
        <div>
          ${sec("Definitions", `<i>notes to mariners</i> · ${p.terms.length} to learn word for word`, `<div class="cx-box">${defs}</div>`)}
          ${t.points.length ? sec("Key ideas", "<i>sailing directions</i>", list(t.points)) : ""}
          ${t.eval.length ? sec("Evaluate with", "", list(t.eval)) : ""}
        </div>
        <div>
          ${sec("Real-world examples", `<i>pinned on the chart</i> · ${ex.length}`, ex.length ? `<div class="cx-box" id="cxEx">${exs}</div>` : `<p class="note">No examples for this subtopic yet.</p>`)}
          ${t.traps.length ? sec("Exam traps", "<i>hazards</i>", t.traps.map(x => `<div class="cx-hz"><p class="k"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 15 14H1z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 6v4M8 11.5v1" stroke="currentColor" stroke-width="1.6"/></svg>Hazard</p><p>${esc(x)}</p></div>`).join("")) : ""}
          ${t.diagrams.length ? sec("Diagrams", `<i>charted</i> · ${t.diagrams.length} to draw`, `<div class="cx-dg">${t.diagrams.map(g => diagramFig({ ...g, hl: g.hl && !t.hl })).join("")}</div>`) : ""}
          ${t.formulas.length ? sec("Formulas", "<i>tide tables</i>", `<table class="ftable">${t.formulas.map(f => `<tr><td style="width:34%"><b>${esc(f.name)}</b>${hlMark(f.hl && !t.hl)}</td><td><span class="f">${esc(f.f)}</span>${f.note ? `<p class="note" style="margin-top:4px">${esc(f.note)}</p>` : ""}</td></tr>`).join("")}</table>`) : ""}
          ${t.mnemonics.length ? sec("Memory aids", "<i>bearings</i>", `<div class="mnem">${t.mnemonics.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`) : ""}
        </div>
      </div>
      <div class="pager">${pv ? `<button class="btn" data-ctopic="${pv.n}">Back: ${pv.n} ${esc(pv.short)}</button>` : `<button class="btn" data-ctopic="u4">Chart of the world</button>`}${nxt ? `<button class="btn" data-ctopic="${nxt.n}">Next: ${nxt.n} ${esc(nxt.short)}</button>` : ""}</div>
    </div>`;
  }

  // ---------- Notes view ----------
  let host = null;
  function render(el) {
    if (host !== el) { host = el; wire(el); }
    const n = CT[S.ctopic]?.unit === "4" ? S.ctopic : null;
    el.innerHTML = n ? plateHTML(n) : homeHTML();
  }
  function openEx(id) {
    const d = host?.querySelector(`details.cx-ex[data-cxex="${CSS.escape(id)}"]`); if (!d) return;
    d.open = true; d.scrollIntoView({ block: "start", behavior: calm() ? "auto" : "smooth" }); d.querySelector("summary").focus({ preventScroll: true });
  }
  function wire(el) {
    el.addEventListener("click", ev => {
      const pt = ev.target.closest(".cx-port");
      if (pt && el.contains(pt)) { setScope(pt.dataset.ctopic); window.scrollTo({ top: 0 }); return; }
      const b = ev.target.closest("[data-cx], [data-cxex]"); if (!b || !el.contains(b) || b.matches("details")) return;
      if (b.dataset.cx === "map") { ui.map = !ui.map; saveUi(); el.querySelectorAll(".cx-map").forEach(m => m.classList.toggle("on", ui.map)); el.querySelectorAll('[data-cx="map"]').forEach(x => { x.setAttribute("aria-expanded", ui.map); x.textContent = ui.map ? "Hide the chart" : "Show the chart"; }); }
      else if (b.dataset.cx === "top") { const m = el.querySelector(".cx-map"); (m?.offsetParent ? m : el).scrollIntoView({ block: "start", behavior: calm() ? "auto" : "smooth" }); }
      else if (b.dataset.cxex && !b.closest("summary")) openEx(b.dataset.cxex);
    });
  }
  // D opens the flashcards for this subtopic (or all of Unit 4 on the chart of the world)
  function key(ev) {
    if (ev.target.closest?.("input, textarea, select")) return false;
    if (ev.key === "d" || ev.key === "D") { show("cards"); return true; }
    return false;
  }

  // ---------- Flashcards: the logbook ----------
  const BEARING = { new: "New", late: "Overdue", due: "Due now", wait: "Early", done: "Mastered" };
  function strip() {
    const t0 = new Date().setHours(0, 0, 0, 0), evs = CDEFS.filter(d => d.unit === "4" && inScope(d)).flatMap(d => evOf(d.id)).filter(e => e[0] >= t0);
    const c = g => evs.filter(e => e[3] === g).length, nm = evs.reduce((a, e) => a + NM[e[3]], 0), nx = nextPort();
    const undo = DECKS.cards.undo ? `<button class="cx-link light" data-undo="1">Undo last grade <kbd>U</kbd></button>` : "";
    return `<div class="cx-strip"><span class="k">Today's log</span><span>Full sail <b>${c(3)}</b></span><span>Fair winds <b>${c(2)}</b></span><span>Heavy weather <b>${c(1)}</b></span><span>Ran aground <b>${c(0)}</b></span><span>Logged <b>+${nmStr(nm)}</b></span>${nx ? `<span>Next port <b>${nx.n} ${esc(nx.name)}</b></span>` : ""}${undo}</div>`;
  }
  function log(x, body) {
    const c = prog(x.id), s = !c ? "new" : stateOf(x.id) === "mastered" ? "done" : c.due <= now() - DAY ? "late" : c.due <= now() ? "due" : "wait";
    return strip() + `<div class="cx-log"><div class="lh"><div><span>Position</span><b>Plate ${x.n}</b></div><div><span>Bearing</span><b>${BEARING[s]}</b></div><div><span>Class</span><b>${x.hl ? "HL" : "SL and HL"}</b></div><p class="cx-ship">Log of the TEU Meridian · ${esc(CT[x.n].short)}</p></div>
      <div class="body">${body}</div></div>`;
  }

  return { render, key, log, strip, stats, GRADE_WORDS };
})();
