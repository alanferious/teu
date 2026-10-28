/* TEU · Unit 3 as a stocks app. The watchlist holds the Unit 3 index and its seven subtopics, and
   every term is a stock priced by how well you recall it (priceAt in app.js). The game layer sits on
   the same data: calls in Flashcards, trading-day runs, an exam target and records.
   Loaded before app.js and only reads its globals when called. */
window.TEUStocks = (() => {
  const MS_DAY = 864e5, HOUR = 36e5, TARGET = 70;
  const EXAM = new Date(2026, 10, 10).getTime();            // Paper 2, 10 November 2026
  const TICK = { "3.1": "MEAS", "3.2": "ADAS", "3.3": "OBJ", "3.4": "INEQ", "3.5": "MONP", "3.6": "FISC", "3.7": "SUPP" };
  const SHORT = { "3.1": "Economic activity", "3.2": "AD and AS", "3.3": "Macro objectives", "3.4": "Inequality", "3.5": "Monetary policy", "3.6": "Fiscal policy", "3.7": "Supply-side" };
  const RANGES = [["1D", MS_DAY], ["1W", 7 * MS_DAY], ["2W", 14 * MS_DAY], ["1M", 30 * MS_DAY], ["ALL", Infinity]];
  const RANGE_LBL = { "1D": "Today", "1W": "Past week", "2W": "Past 2 weeks", "1M": "Past month", ALL: "Since you started" };
  const PILLS = ["% change", "points", "due", "listed"];
  const UIK = "teu-stocks";
  const SORTS = {
    manual: ["Manual", (a, b) => a.localeCompare(b, undefined, { numeric: true })],
    weak: ["Weakest first", (a, b) => ixAt(a, now()) - ixAt(b, now())],
    due: ["Most due", (a, b) => dueN(b) - dueN(a)],
    pct: ["% change", (a, b) => dayChange(b)[1] - dayChange(a)[1]],
    name: ["Name", (a, b) => CT[a].name.localeCompare(CT[b].name)],
  };
  const ui = { range: "1D", pill: 0, sort: "manual", rmode: "recall" };
  try { const u = JSON.parse(localStorage.getItem(UIK)) || {}; if (RANGES.some(r => r[0] === u.range)) ui.range = u.range; if (u.pill >= 0 && u.pill < 4) ui.pill = u.pill | 0; if (SORTS[u.sort]) ui.sort = u.sort; if (typeof u.rmode === "string") ui.rmode = u.rmode; } catch {}
  const saveUi = () => { try { localStorage.setItem(UIK, JSON.stringify(ui)); } catch {} };
  let openEx = null, host = null, pane = "list", drawnFor = null, q = "", openTerm = null, focusRow = null, cache = new Map(), sel = null;

  // ---------- Model ----------
  const sectors = () => COURSE.filter(t => t.unit === "3").map(t => t.n);
  // Unit 3 real-world examples (data/macro.js): each one trades like a stock too, as "x:<id>"
  let rweList = null;
  function rwe() {
    if (rweList) return rweList;
    const used = new Set([...CDEFS.map(d => d.tk), ...Object.values(TICK), "TEU3", "RWE3"]);
    rweList = (typeof MACRO === "undefined" ? [] : MACRO).map(e => {
      const topics = String(e.subtopic).match(/3\.\d/g) || ["3.1"], sc = scoreOf(e.rating);
      let tk = String(e.tk || e.mem.tag).replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 5), i = 2;
      while (used.has(tk)) tk = tk.slice(0, 4) + i++;
      used.add(tk);
      return { ...e, key: e.id, id: "x:" + e.id, tk, topics, n: topics[0], score: sc, tier: tierOf(sc) };
    }).sort((a, b) => a.n.localeCompare(b.n, undefined, { numeric: true }) || b.score - a.score);
    return rweList;
  }
  const RBY = id => rwe().find(e => e.id === id);
  const rweIn = n => n === "u3" || n === "rwe" ? rwe() : rwe().filter(e => e.topics.includes(n));
  const defsOf = n => n === "rwe" ? rwe() : n === "u3" ? CDEFS.filter(d => d.unit === "3") : CDEFS.filter(d => d.n === n);
  const tkOf = n => n === "u3" ? "TEU3" : n === "rwe" ? "RWE3" : TICK[n] || n;
  const nameOf = n => n === "u3" ? "Unit 3 index" : n === "rwe" ? "Unit 3 examples" : CT[n].name;
  const ixAt = (n, tt) => indexAt(defsOf(n), tt);
  const listedN = n => defsOf(n).filter(d => prog(d.id)).length;
  const dueN = n => defsOf(n).filter(d => prog(d.id) && isDue(d.id)).length;
  const firstT = n => Math.min(...defsOf(n).flatMap(d => evOf(d.id).map(e => e[0])), Infinity);
  const pct = (a, b) => (a / b - 1) * 100;
  const sgn = v => v > .004 ? "+" : v < -.004 ? "−" : "";
  const cls = v => v > .004 ? "up" : v < -.004 ? "down" : "flat";
  const signed = v => sgn(v) + fmt(Math.abs(v));
  const dayChange = n => { const a = ixAt(n, now()), b = ixAt(n, now() - MS_DAY); return [a - b, pct(a, b)]; };
  const termDay = id => { const p = priceOf(id); return p == null ? null : p - (priceAt(id, now() - MS_DAY) ?? IPO); };
  const daysToExam = () => Math.max(0, Math.round((EXAM - new Date().setHours(0, 0, 0, 0)) / MS_DAY));

  // Index history: sampled between grades, starting just before the first one (when every term sat at 10.00)
  function series(n, r) {
    const T = now(), key = n + r + P.updated + Math.floor(T / 60000);
    if (cache.has(key)) return cache.get(key);
    const span = RANGES.find(x => x[0] === r)[1], f = firstT(n);
    let out = [];
    if (isFinite(f)) {
      const start = Math.max(f - 10 * 60000, T - span);
      const step = Math.max(r === "1D" ? HOUR / 4 : r === "1W" ? HOUR : 3 * HOUR, (T - start) / 260);
      for (let tt = start; tt < T; tt += step) out.push([tt, ixAt(n, tt)]);
      out.push([T, ixAt(n, T)]);
      if (out.length < 2) out.unshift([start - step, ixAt(n, start - step)]);
    }
    if (cache.size > 80) cache = new Map();
    cache.set(key, out);
    return out;
  }
  const athOf = n => Math.max(...series(n, "ALL").map(p => p[1]), ixAt(n, now()));

  // Trading days: any day you graded a Unit 3 term
  const dayKey = t => { const d = new Date(t); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); };
  function runs() {
    const days = new Set([...defsOf("u3"), ...rwe()].flatMap(d => evOf(d.id).map(e => dayKey(e[0]))));
    const d = new Date(); let cur = 0; const today = days.has(dayKey(d));
    if (!today) d.setDate(d.getDate() - 1);
    while (days.has(dayKey(d))) { cur++; d.setDate(d.getDate() - 1); }
    const sorted = [...days].sort((a, b) => a - b).map(k => new Date(Math.floor(k / 1e4), Math.floor(k / 100) % 100 - 1, k % 100).getTime());
    let best = 0, run = 0;
    sorted.forEach((t, i) => { run = i && Math.round((t - sorted[i - 1]) / MS_DAY) === 1 ? run + 1 : 1; best = Math.max(best, run); });
    return { cur, best, today, days: days.size };
  }
  const callRight = e => (e[4] === 1) === (e[3] >= 2);
  function calls() {
    const evs = [...defsOf("u3"), ...rwe()].flatMap(d => evOf(d.id)).filter(e => e[4]).sort((a, b) => a[0] - b[0]);
    let right = 0, best = 0, run = 0;
    for (const e of evs) { if (callRight(e)) { right++; run++; best = Math.max(best, run); } else run = 0; }
    return { right, total: evs.length, best, run };
  }
  function game() {
    const defs = defsOf("u3"), T = now();
    let listed = 0, blue = 0, comeback = 0;
    for (const d of defs) {
      if (!prog(d.id)) continue;
      listed++;
      if (priceAt(d.id, T) >= 99.99) blue++;
      let top = 0, lapsed = false;
      for (const e of evOf(d.id)) { if (e[3] === 0 && top >= 2) lapsed = true; else if (lapsed && e[1] >= 3) { comeback++; break; } top = Math.max(top, e[1]); }
    }
    const best = sectors().map(n => [listedN(n), defsOf(n).length]).sort((a, b) => b[0] / b[1] - a[0] / a[1])[0];
    const stocked = sectors().filter(n => rweIn(n).some(e => (priceOf(e.id) || 0) >= 64.79)).length;
    return { listed, total: defs.length, blue, comeback, sector: best, run: runs(), calls: calls(), ix: indexAt(defs, T), stocked };
  }
  const RECORDS = [
    { id: "open", name: "Opening bell", how: "Grade your first Unit 3 term.", p: g => [g.listed, 1] },
    { id: "list10", name: "Ten listings", how: "List 10 Unit 3 terms.", p: g => [g.listed, 10] },
    { id: "run3", name: "Three-day run", how: "Grade Unit 3 cards three days in a row.", p: g => [g.run.best, 3] },
    { id: "sector", name: "Full sector", how: "List every term in one subtopic.", p: g => g.sector },
    { id: "blue", name: "Blue chip", how: "Take one term all the way to 100.00.", p: g => [g.blue, 1] },
    { id: "calib", name: "Calibrated", how: "Make 20 calls in Flashcards and get at least 80% of them right.", p: g => [g.calls.total >= 20 ? 20 * Math.min(1, g.calls.right / g.calls.total / .8) : Math.min(g.calls.total, 19), 20],
      txt: g => g.calls.total ? `${Math.round(g.calls.right / g.calls.total * 100)}% of ${g.calls.total} call${g.calls.total === 1 ? "" : "s"}` : "No calls yet" },
    { id: "comeback", name: "Comeback", how: "Bring a term you forgot back above 60.00.", p: g => [g.comeback, 1] },
    { id: "run7", name: "Week-long run", how: "Grade Unit 3 cards seven days in a row.", p: g => [g.run.best, 7] },
    { id: "stocked", name: "Fully stocked", how: "Get an example to 64.80 in every Unit 3 subtopic.", p: g => [g.stocked, 7] },
    { id: "target", name: "On target", how: "Lift the Unit 3 index to 70.00.", p: g => [g.ix, TARGET], price: true },
    { id: "blue10", name: "Ten blue chips", how: "Hold 10 terms at 100.00 at the same time.", p: g => [g.blue, 10] },
    { id: "full", name: "Full exchange", how: "List all 82 Unit 3 terms.", p: g => [g.listed, g.total] },
  ];
  // Records are kept once earned. Returns the ones earned just now. A silent check (on load) marks records
  // already met by older or imported progress without a date, since we can't know when they were earned.
  function check(silent) {
    P.rec = P.rec || {};
    const g = game(), fresh = [];
    for (const r of RECORDS) { const [have, need] = r.p(g); if (have >= need && !P.rec[r.id]) { P.rec[r.id] = silent ? 1 : now(); fresh.push(r); } }
    if (fresh.length) persist();
    if (!silent) fresh.slice(0, 2).forEach((r, i) => setTimeout(() => toast("Record", r.name, r.how), i * 500));
    return fresh;
  }

  // ---------- Small pieces ----------
  const pill = (v, c, label, attrs = "") => `<span class="sx-pill ${c}" ${attrs}${label ? ` aria-label="${esc(label)}"` : ""}>${v}</span>`;
  function rowPill(n) {
    if (!listedN(n)) return pill("IPO", "ipo", "", 'data-sx="pill" aria-hidden="true"');
    const [d, p] = dayChange(n), m = PILLS[ui.pill];
    const txt = m === "% change" ? `${sgn(p)}${Math.abs(p).toFixed(2)}%` : m === "points" ? signed(d) : m === "due" ? `${dueN(n)} due` : `${listedN(n)}/${defsOf(n).length}`;
    const c = m === "due" ? (dueN(n) ? "down" : "flat") : m === "listed" ? "flat" : cls(d);
    return pill(txt, c, "", 'data-sx="pill" aria-hidden="true"');
  }
  function sparkline(n) {
    const s = series(n, "1D");
    if (s.length < 2) return `<svg class="sx-spark" viewBox="0 0 64 32" aria-hidden="true"><path d="M0 16H64" class="base"/></svg>`;
    const vs = s.map(p => p[1]), open = ixAt(n, now() - MS_DAY), lo = Math.min(...vs, open), hi = Math.max(...vs, open), t0 = now() - MS_DAY;
    const X = t => (t - t0) / MS_DAY * 64, Y = v => 29 - (v - lo) / (hi - lo || 1) * 26, up = vs[vs.length - 1] >= open;
    return `<svg class="sx-spark" viewBox="0 0 64 32" aria-hidden="true"><path d="M0 ${Y(open).toFixed(1)}H64" class="base"/><path d="${s.map((p, i) => (i ? "L" : "M") + Math.max(0, X(p[0])).toFixed(1) + " " + Y(p[1]).toFixed(1)).join("")}" class="${up ? "up" : "down"}"/></svg>`;
  }
  const ago = tt => { const m = (now() - tt) / 60000; return m < 1 ? "just now" : m < 60 ? Math.round(m) + " min ago" : m < 1440 ? Math.round(m / 60) + " h ago" : Math.round(m / 1440) + " d ago"; };
  const when = tt => tt <= now() ? "now" : (tt - now()) < MS_DAY && new Date(tt).getDate() === new Date().getDate() ? "today " + new Date(tt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : new Date(tt).toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
  const dayLbl = tt => new Date(tt).toLocaleDateString([], { day: "numeric", month: "short" });
  const HLtag = on => on ? `<span class="sx-hl" title="Higher level only">HL</span>` : "";
  const ICON = {
    sort: `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M6 10h8M8 14h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    find: `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M11 11l3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    back: `<svg class="sx-chev" viewBox="0 0 10 16" aria-hidden="true"><path d="M8 2 2 8l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    to: `<svg class="sx-to" viewBox="0 0 16 10" aria-hidden="true"><path d="M1 5h13M10 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    check: `<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    info: `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10 9v5M10 6.2v.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  };

  // ---------- Watchlist ----------
  function rowHTML(n) {
    const cur = curN() === n, [d, p] = dayChange(n);
    const said = listedN(n) ? `today ${sgn(d) === "−" ? "down" : sgn(d) ? "up" : "flat"} ${Math.abs(p).toFixed(2)}%, ${dueN(n)} due` : "not listed yet";
    const lbl = n === "u3" ? "Unit 3 index" : n === "rwe" ? `${rwe().length} real-world examples` : n + " · " + SHORT[n];
    return `<button class="sx-row${n === "u3" || n === "rwe" ? " ix" : ""}" data-ctopic="${n === "rwe" ? "u3" : n}" data-n="${n}" data-sx="row" aria-current="${cur}" aria-label="${tkOf(n)}, ${esc(n === "u3" || n === "rwe" ? nameOf(n) : n + " " + CT[n].name)}, ${fmt(ixAt(n, now()))}, ${said}">
      <div><div class="tk">${tkOf(n)}</div><div class="nm">${lbl}</div></div>${sparkline(n)}
      <div class="rt"><div class="px">${fmt(ixAt(n, now()))}</div>${rowPill(n)}</div></button>`;
  }
  function listHTML() {
    const s = q.trim().toLowerCase();
    if (s.length > 1) {
      const re = new RegExp("(" + s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), mk = x => esc(x).replace(re, "<mark>$1</mark>");
      const hits = defsOf("u3").filter(d => (d.t + " " + d.d + " " + d.tk).toLowerCase().includes(s));
      const ex = rwe().filter(e => [e.tk, e.title, e.region, e.mem.tag, e.hook, ...e.concepts].join(" ").toLowerCase().includes(s));
      const exHTML = ex.length ? `<h3>${ex.length} example${ex.length === 1 ? "" : "s"}</h3>${ex.slice(0, 12).map(e => `<button class="sx-res" data-ctopic="u3" data-sx="exres" data-id="${esc(e.id)}"><b>${esc(e.tk)} · ${mk(e.mem.tag)}</b><span>${e.n} ${SHORT[e.n]} · ${mk(e.title)}</span></button>`).join("")}` : "";
      return `<div class="sx-results">${exHTML}<h3>${hits.length} term${hits.length === 1 ? "" : "s"}</h3>${hits.slice(0, 40).map(d => `<button class="sx-res" data-ctopic="${d.n}" data-sx="res" data-id="${esc(d.id)}"><b>${esc(d.tk)} · ${mk(d.t)}</b><span>${d.n} ${SHORT[d.n]} · ${mk(d.d.length > 90 ? d.d.slice(0, 90) + "…" : d.d)}</span></button>`).join("") || `<p class="sx-none">Nothing in Unit 3 matches “${esc(q)}”.</p>`}</div>`;
    }
    return rowHTML("u3") + (rwe().length ? rowHTML("rwe") : "") + sectors().sort(SORTS[ui.sort][1]).map(rowHTML).join("");
  }
  const sortMenu = () => `<p>Sort subtopics by</p>` + Object.entries(SORTS).map(([k, [lbl]]) => `<button role="menuitemradio" aria-checked="${k === ui.sort}" data-sx="sort" data-v="${k}">${lbl}${k === ui.sort ? ICON.check : ""}</button>`).join("");

  // ---------- Detail ----------
  const curN = () => S.ctopic === "u3" ? (sel === "rwe" ? "rwe" : "u3") : CT[S.ctopic]?.unit === "3" ? S.ctopic : "u3";
  function statusLine(n) {
    const defs = defsOf(n), due = dueN(n), L = listedN(n);
    const next = Math.min(...defs.map(d => prog(d.id)).filter(c => c && c.due > now()).map(c => c.due), Infinity);
    const exam = `Paper 2 in ${daysToExam()} day${daysToExam() === 1 ? "" : "s"}`;
    const txt = due ? `Market open · ${due} due now` : isFinite(next) ? `Market closed · next due ${when(next)}` : L ? "Market closed" : "Not listed yet";
    return `<div class="sx-mkt${due ? "" : " closed"}"><i></i>${txt} · ${exam}</div>`;
  }
  function stats(n) {
    const defs = defsOf(n), L = listedN(n), due = dueN(n);
    const evs = defs.flatMap(d => prog(d.id) ? evOf(d.id) : []);
    const mastered = defs.filter(d => stateOf(d.id) === "mastered").length;
    const cell = (k, v) => `<div><span>${k}</span><b>${v}</b></div>`;
    const base = [cell("Listed", `${L}/${defs.length}`), cell("Due now", due), cell("Mastered", mastered), cell("Reviews", evs.length)];
    if (n === "rwe") {
      const nm = P.rwe?.num || { right: 0, total: 0 }, pk = P.rwe?.pick || { right: 0, total: 0 };
      const thin = sectors().filter(k => !rweIn(k).some(e => (priceOf(e.id) || 0) >= 64.79));
      return base.concat([cell("Numbers right", nm.total ? `${nm.right} of ${nm.total}` : "–"), cell("Picks right", pk.total ? `${pk.right} of ${pk.total}` : "–"),
        cell("Subtopics stocked", `${7 - thin.length} of 7`), cell("Thinnest", thin[0] ? tkOf(thin[0]) : "none")]).join("");
    }
    if (n === "u3") {
      const r = runs(), c = calls(), ix = ixAt("u3", now());
      return base.concat([cell("Trading run", r.cur ? `${r.cur} day${r.cur === 1 ? "" : "s"}` : "none"), cell("Best run", r.best ? `${r.best} day${r.best === 1 ? "" : "s"}` : "–"),
        cell("Calibration", c.total ? `${Math.round(c.right / c.total * 100)}% of ${c.total}` : "–"), cell("To target", ix >= TARGET ? "reached" : "+" + fmt(TARGET - ix))]).join("");
    }
    const next = Math.min(...defs.map(d => prog(d.id)).filter(c => c && c.due > now()).map(c => c.due), Infinity);
    const weakest = defs.filter(d => prog(d.id)).sort((a, b) => priceOf(a.id) - priceOf(b.id))[0];
    return base.concat([cell("Last graded", evs.length ? ago(Math.max(...evs.map(e => e[0]))) : "never"), cell("Next due", due ? "now" : isFinite(next) ? when(next) : "–"),
      cell("All-time high", L ? fmt(athOf(n)) : "–"), cell("Weakest", weakest ? esc(weakest.tk) : "–")]).join("");
  }
  function termRow(d) {
    const p = priceOf(d.id), c = termDay(d.id), open = openTerm === d.id, due = p != null && isDue(d.id);
    return `<button class="sx-term${open ? " lit" : ""}" data-sx="term" data-id="${esc(d.id)}" aria-expanded="${open}">
      <div><span class="sym">${esc(d.tk)}</span><span class="tn">${esc(d.t)}</span>${HLtag(d.hl && !CT[d.n].hl)}${due ? `<span class="sx-due">overdue</span>` : ""}<div class="def">${esc(d.d)}</div></div>
      <div class="px">${p == null ? "–" : fmt(p)}</div><div class="rt">${p == null ? pill("IPO", "ipo", "Not listed yet") : pill(signed(c), cls(c), "Today " + signed(c))}</div></button>`;
  }
  // Printed in full: traps and evaluation are reading content, not teasers
  function newsHTML(n, kind, raw) {
    let txt = raw, hl = false;
    if (/^HL:\s*/.test(txt)) { hl = true; txt = txt.replace(/^HL:\s*/, ""); }
    const src = { idea: "Key Idea", trap: "Exam Trap", eval: "Evaluation" }[kind];
    let body = esc(txt.charAt(0).toUpperCase() + txt.slice(1));
    if (kind === "trap") { const m = txt.match(/^(.{8,160}?):\s(.+)$/); if (m) body = `<del class="wrong"><span class="sr-only">Wrong: </span>${esc(m[1])}</del><span class="sr-only">Right: </span>${esc(m[2].charAt(0).toUpperCase() + m[2].slice(1))}`; }
    return `<article class="sx-story"><div class="src ${kind}">${src}${HLtag(hl)}</div><p class="txt">${body}</p></article>`;
  }
  function moverRow(d, v) {
    return `<button class="sx-term mover" data-ctopic="${d.n}" data-sx="res" data-id="${esc(d.id)}"><div><span class="sym">${esc(d.tk)}</span><span class="tn">${esc(d.t)}</span><div class="def one">${d.n} ${SHORT[d.n]}</div></div><div class="px">${fmt(priceOf(d.id))}</div><div class="rt">${pill(signed(v), cls(v))}</div></button>`;
  }
  function indexExtras() {
    const g = game(), ix = g.ix, days = daysToExam(), defs = defsOf("u3");
    const need = Math.max(0, TARGET - ix), perDay = days ? need / days : need, recalls = Math.ceil(perDay / (17.6 / defs.length));
    const share = Math.max(0, Math.min(1, (ix - IPO) / (TARGET - IPO)));
    const target = `<section class="sx-target" aria-label="Exam target"><div class="hd"><span>Exam target</span><b>${fmt(TARGET)} by Paper 2</b></div>
      <div class="bar" role="meter" aria-valuemin="${IPO}" aria-valuemax="${TARGET}" aria-valuenow="${ix.toFixed(2)}" aria-label="Unit 3 index ${fmt(ix)} of a ${fmt(TARGET)} target"><i style="--p:${share.toFixed(3)}"></i></div>
      <div class="ends"><span>10.00 listing price</span><span>${fmt(ix)} now</span><span>${fmt(TARGET)}</span></div>
      <p>${ix >= TARGET ? "You're at the target. Keep drilling what's due so overdue terms don't drag it back down."
        : `To get there by ${new Date(EXAM).toLocaleDateString([], { day: "numeric", month: "long" })}, the index needs about +${fmt(perDay)} a day: roughly ${recalls} good recall${recalls === 1 ? "" : "s"} a day, plus whatever falls due.`}</p></section>`;
    const r = g.run;
    const runNote = r.cur >= 2 && !r.today ? `<p class="sx-runnote">Your run is at ${r.cur} days. One Unit 3 card today keeps it going.</p>` : "";
    const gain = defs.filter(d => prog(d.id)).map(d => [d, termDay(d.id)]).filter(x => x[1] > .004).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const movers = `<h2>Top gainers <small>today</small></h2>${gain.length ? gain.map(x => moverRow(...x)).join("") : `<p class="sx-none">Nothing up in the last 24 hours. Every term you recall shows up here.</p>`}`;
    const falling = defs.filter(d => prog(d.id) && prog(d.id).due < now() - HOUR).sort((a, b) => prog(a.id).due - prog(b.id).due);
    const fall = falling.length ? `<h2>Falling <small>${falling.length} overdue</small></h2><p class="sx-lede">An overdue term loses 5% a day until it's down to 60% of its price. Recall it to stop the slide.</p>
      ${falling.slice(0, 6).map(d => termRow(d)).join("")}${falling.length > 6 ? `<p class="sx-none">and ${falling.length - 6} more</p>` : ""}<div class="sx-actrow"><button class="sx-drill" data-view="cards">Drill what's due <kbd>D</kbd></button></div>` : "";
    const recRow = rec => {
      const [have, need] = rec.p(g), at = P.rec?.[rec.id], share = Math.min(1, have / need);
      const prog2 = at ? `<span class="got">${at > 1 ? "Earned " + dayLbl(at) : "Earned"}</span>` : `<span>${rec.txt ? rec.txt(g) : rec.price ? `${fmt(have)} of ${fmt(need)}` : `${Math.min(have, need)} of ${need}`}</span><span class="bar"><i style="--p:${share.toFixed(3)}"></i></span>`;
      return `<div class="sx-rec${at ? " got" : ""}"><div><b>${rec.name}</b><span>${rec.how}</span></div><div class="rt">${prog2}</div></div>`;
    };
    const open = RECORDS.filter(rec => !P.rec?.[rec.id]), next = open.slice(0, 3), rest = RECORDS.filter(rec => !next.includes(rec));
    const recs = `<h2>Records <small>${RECORDS.length - open.length} of ${RECORDS.length} earned</small></h2><div class="sx-recs">${next.map(recRow).join("") || `<p class="sx-none">Every record earned.</p>`}</div>
      ${rest.length ? `<details class="sx-more"><summary>Show all ${RECORDS.length} records</summary><div class="sx-recs">${rest.map(recRow).join("")}</div></details>` : ""}`;
    return target + runNote + fall + movers + recs;
  }
  function exRow(e) {
    const p = priceOf(e.id), c = termDay(e.id), due = p != null && isDue(e.id);
    return `<div class="sx-exw"><button class="sx-term sx-ex" data-sx="ex" data-id="${esc(e.id)}" aria-expanded="false" aria-controls="ex-${esc(e.key)}">
      <div><span class="sym">${esc(e.tk)}</span><span class="tn">${esc(e.mem.tag)}</span>${due ? `<span class="sx-due">overdue</span>` : ""}<div class="def one">${esc(e.title)} · ${esc(e.region)} · ${esc(e.years)}</div></div>
      <div class="px">${p == null ? "–" : fmt(p)}</div><div class="rt">${p == null ? pill("IPO", "ipo", "Not listed yet") : pill(signed(c), cls(c), "Today " + signed(c))}</div></button>
      <div class="sx-exbody" id="ex-${esc(e.key)}" hidden>${memCard(e)}</div></div>`;
  }
  const memCard = e => `<div class="sx-mem"><p class="sx-hook">${esc(e.hook)}</p>${storyHTML(e.mem)}${numsHTML(e.mem)}<p class="sx-use"><b>Use it for</b> ${esc(e.mem.use)}</p>${butHTML(e.mem)}
    <p class="sx-score">Exam value <b>${e.score}</b> of 100 · our rating, not an examiner's</p>
    <details class="sx-more"><summary>Facts, diagram, evaluation and sources</summary>${factSheet(e)}</details></div>`;
  function toggleEx(b, open) {
    const body = document.getElementById(b.getAttribute("aria-controls")); if (!body) return;
    const on = open ?? b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", on); body.hidden = !on;
  }
  function rweDetailHTML() {
    const n = "rwe", xs = rwe(), L = listedN(n), due = dueN(n);
    const head = `<button class="sx-back" data-sx="back">${ICON.back}Stocks</button>
      <div class="sx-headrow"><div class="sx-head"><span class="tk">RWE3</span><span class="nm">Unit 3 examples · ${xs.length} real-world cases</span></div>
      <div class="sx-actions"><button class="sx-drill" data-view="rwe">Drill${due ? ` · ${due} due` : ""} <kbd>D</kbd></button>
      <div class="sx-infow"><button class="sx-icon" data-sx="info" aria-expanded="false" aria-controls="sxInfo" aria-label="What the price means">${ICON.info}</button>
      <div class="sx-pop" id="sxInfo" hidden><b>The price is how ready your examples are.</b> Each example lists at 10.00 the first time you drill it and climbs as you recall its story, its three numbers and its "but". It drifts down while it's overdue. Numbers and Pick the example are practice: they don't move prices.<br><br>Examples are rated on relevance, evaluation, data and recency (30/30/25/15). The ratings are ours, not examiner scores.</div></div></div></div>
      <div class="sx-quote" id="sxQuote" aria-live="polite"></div>${statusLine(n)}`;
    const chart = L ? `<div class="sx-ranges" role="group" aria-label="Chart range">${RANGES.map(([r], i) => `<button data-sx="range" data-v="${r}" aria-pressed="${r === ui.range}" title="Key ${i + 1}">${r}</button>`).join("")}</div>
      <div class="sx-chart" id="sxChart" tabindex="0" role="img" aria-label=""></div>
      <div class="sx-chartnote"><span>Smoothed between your grades. A price only moves when you drill an example or let it go overdue.</span><span>Drag to compare two points · <kbd>←</kbd> <kbd>→</kbd> to step</span></div>`
      : `<div class="sx-emptychart"><div><b>RWE3 isn't listed yet</b>Drill any Unit 3 example to list it at 10.00.<br>Say the story, the three numbers and the "but", then grade yourself.</div><button class="sx-drill" data-view="rwe">Start drilling <kbd>D</kbd></button></div>`;
    const groups = sectors().map(k => [k, rweIn(k).filter(e => e.n === k)]).filter(([, ys]) => ys.length);
    const body = `<div class="sx-stats">${stats(n)}</div>
      <h2>Holdings <small>by subtopic, strongest first</small></h2>
      ${groups.map(([k, ys]) => `<h3 class="sx-sub">${k} ${SHORT[k]} <span>${tkOf(k)}</span></h3>${ys.map(exRow).join("")}`).join("")}
      <p class="sx-keys"><kbd>J</kbd> <kbd>K</kbd> (or <kbd>↑</kbd> <kbd>↓</kbd> in the list) move through the watchlist · <kbd>1</kbd>–<kbd>5</kbd> chart range · <kbd>D</kbd> drill · <kbd>/</kbd> search · <kbd>Esc</kbd> clear</p>`;
    return head + chart + body;
  }
  function detailHTML(n) {
    if (n === "rwe") return rweDetailHTML();
    const isIx = n === "u3", t = CT[n], defs = defsOf(n), L = listedN(n), due = dueN(n);
    const head = `<button class="sx-back" data-sx="back">${ICON.back}Stocks</button>
      <div class="sx-headrow"><div class="sx-head"><span class="tk">${tkOf(n)}</span><span class="nm">${isIx ? "Unit 3 index · all 82 terms" : n + " " + esc(t.name)}</span>${HLtag(!isIx && t.hl)}</div>
      <div class="sx-actions"><button class="sx-drill" data-view="cards">Drill${due ? ` · ${due} due` : ""} <kbd>D</kbd></button>
      <div class="sx-infow"><button class="sx-icon" data-sx="info" aria-expanded="false" aria-controls="sxInfo" aria-label="What the price means">${ICON.info}</button>
      <div class="sx-pop" id="sxInfo" hidden><b>The price is how well you know ${isIx ? "Unit 3" : n}.</b> It's the average of ${defs.length} terms. A term lists at 10.00 the first time you grade it in Flashcards, climbs with each correct recall to 100.00, and drifts down while it's overdue. Terms you haven't graded count at 10.00.<br><br><b>Calls.</b> Before you flip a Unit 3 card, buy if you're sure you know it or sell if you're not. Your call stays hidden until you've graded, so grade against the wording, not your guess. Calibration is how often your calls matched what you actually knew.</div></div></div></div>
      <div class="sx-quote" id="sxQuote" aria-live="polite"></div>${statusLine(n)}`;
    const chart = L ? `<div class="sx-ranges" role="group" aria-label="Chart range">${RANGES.map(([r], i) => `<button data-sx="range" data-v="${r}" aria-pressed="${r === ui.range}" title="Key ${i + 1}">${r}</button>`).join("")}</div>
      <div class="sx-chart" id="sxChart" tabindex="0" role="img" aria-label=""></div>
      <div class="sx-chartnote"><span>Smoothed between your grades. A price only moves when you grade a term or let it go overdue.</span><span>Drag to compare two points · <kbd>←</kbd> <kbd>→</kbd> to step</span></div>`
      : `<div class="sx-emptychart"><div><b>${tkOf(n)} isn't listed yet</b>Grade any ${isIx ? "Unit 3" : n} card in Flashcards to list it at 10.00.<br>Every term you recall moves the price up.</div><button class="sx-drill" data-view="cards">Start drilling <kbd>D</kbd></button></div>`;
    let body = `<div class="sx-stats">${stats(n)}</div>`;
    if (isIx) body += indexExtras();
    else {
      const terms = defs.slice().sort((a, b) => (priceOf(a.id) ?? -1) - (priceOf(b.id) ?? -1));
      body += `<h2>Terms <small>weakest first</small></h2><div>${terms.map(termRow).join("")}</div>`;
      const home = rweIn(n).filter(e => e.n === n), also = rweIn(n).filter(e => e.n !== n);
      if (home.length || also.length) body += `<h2>Real-world examples <small>${home.length} for ${tkOf(n)}</small><button class="sx-link" data-view="rwe">Drill these</button></h2><div>${home.map(exRow).join("")}</div>
        ${also.length ? `<h3 class="sx-sub">Also useful here <span>${also.length} from other subtopics</span></h3><div>${also.map(exRow).join("")}</div>` : ""}`;
      if (t.big || t.mnemonics.length) body += `<h2>About ${tkOf(n)}</h2><p class="sx-about">${esc(t.big)}</p>${t.mnemonics.length ? `<div class="sx-fx">${t.mnemonics.map(([a, b]) => `<div><span>${esc(a)}</span><b>${esc(b)}</b></div>`).join("")}</div>` : ""}`;
      if (t.diagrams.length) body += `<h2>Charts <small>${t.diagrams.length} to draw from memory</small><button class="sx-link" data-view="diagrams">Diagram drill</button></h2><div class="sx-dgrid">${t.diagrams.map(g => `<div class="sx-dcard"><b>${esc(g.name.replace(/^HL:\s*/, ""))}</b>${HLtag((g.hl || /^HL:/.test(g.name)) && !t.hl)}<p>${esc(g.shows || "")}</p>${g.spec ? drawDiagram(g.spec) : ""}</div>`).join("")}</div>`;
      if (t.formulas.length) body += `<h2>Formulas</h2><div class="sx-fx">${t.formulas.map(f => `<div><span>${esc(f.name)}${HLtag(f.hl && !t.hl)}</span><b>${esc(f.f)}${f.note ? `<small>${esc(f.note)}</small>` : ""}</b></div>`).join("")}</div>`;
      const stories = [...t.points.map(p => ["idea", p]), ...t.traps.map(p => ["trap", p]), ...t.eval.map(p => ["eval", p])];
      body += `<h2>Top Stories</h2><div class="sx-news">${stories.map(([k, x]) => newsHTML(n, k, x)).join("")}</div>`;
    }
    body += `<p class="sx-keys"><kbd>J</kbd> <kbd>K</kbd> (or <kbd>↑</kbd> <kbd>↓</kbd> in the list) move through the watchlist · <kbd>1</kbd>–<kbd>5</kbd> chart range · <kbd>D</kbd> drill · <kbd>/</kbd> search · <kbd>Esc</kbd> clear</p>`;
    return head + chart + body;
  }

  // ---------- Chart ----------
  const niceTicks = (lo, hi) => { const raw = (hi - lo) / 4 || 1, mag = 10 ** Math.floor(Math.log10(raw)), step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw); const a = Math.floor(lo / step) * step, out = []; for (let v = a; v <= hi + step * .5; v += step) out.push(+v.toFixed(2)); return out; };
  function smoothPath(Q) {   // monotone cubic through the samples: lively, but never overshoots a real value
    const n = Q.length, f = v => v.toFixed(1);
    if (n < 3) return "M" + Q.map(p => f(p[0]) + " " + f(p[1])).join(" L");
    const dx = [], m = [], t = [];
    for (let i = 0; i < n - 1; i++) { dx[i] = Q[i + 1][0] - Q[i][0]; m[i] = dx[i] ? (Q[i + 1][1] - Q[i][1]) / dx[i] : 0; }
    t[0] = m[0]; t[n - 1] = m[n - 2];
    for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
    for (let i = 0; i < n - 1; i++) {
      if (!m[i]) { t[i] = t[i + 1] = 0; continue; }
      const a = t[i] / m[i], b = t[i + 1] / m[i], h = a * a + b * b;
      if (h > 9) { const k = 3 / Math.sqrt(h); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; }
    }
    let d = `M${f(Q[0][0])} ${f(Q[0][1])}`;
    for (let i = 0; i < n - 1; i++) d += ` C${f(Q[i][0] + dx[i] / 3)} ${f(Q[i][1] + t[i] * dx[i] / 3)} ${f(Q[i + 1][0] - dx[i] / 3)} ${f(Q[i + 1][1] - t[i + 1] * dx[i] / 3)} ${f(Q[i + 1][0])} ${f(Q[i + 1][1])}`;
    return d;
  }
  const dt = tt => new Date(tt).toLocaleString([], ui.range === "1D" ? { hour: "numeric", minute: "2-digit" } : ui.range === "1W" ? { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" } : { day: "numeric", month: "short" });
  function quote(n, pt, from) {
    const el = document.getElementById("sxQuote"); if (!el) return;
    const s = series(n, ui.range), ath = listedN(n) ? athOf(n) : 0;
    if (!s.length) { el.innerHTML = `<span class="px">${fmt(IPO)}</span><span class="when">Lists when you grade a card</span>`; return; }
    const open = ui.range === "1D" ? ixAt(n, now() - MS_DAY) : s[0][1], last = s[s.length - 1];
    const a = from || [null, open], b = pt || last, d = b[1] - a[1], p = pct(b[1], a[1]);
    const lbl = from ? `${dt(from[0])} – ${dt(pt[0])}` : pt ? dt(pt[0]) : RANGE_LBL[ui.range];
    const high = !pt && last[1] >= ath - .005 && last[1] > IPO + .005 ? `<span class="sx-ath">All-time high</span>` : "";
    el.innerHTML = `<span class="px">${fmt(b[1])}</span><span class="ch ${cls(d)}">${signed(d)} (${sgn(d)}${Math.abs(p).toFixed(2)}%)</span><span class="when">${lbl}</span>${high}`;
  }
  function chart(n, animate) {
    const el = document.getElementById("sxChart"); if (!el || !el.clientWidth) return;
    const s = series(n, ui.range), W = el.clientWidth, H = el.clientHeight, PAD = 46, BOT = 26;
    if (s.length < 2) return;
    const T = now(), d1 = ui.range === "1D", open = d1 ? ixAt(n, T - MS_DAY) : s[0][1], last = s[s.length - 1][1], up = last >= open - .004;
    const tgt = n === "u3";
    const ys = s.map(p => p[1]).concat(d1 ? [open] : [], tgt ? [TARGET] : []);
    const ticks = niceTicks(Math.min(...ys), Math.max(...ys)), lo = ticks[0], hi = ticks[ticks.length - 1];
    const t0 = d1 ? T - MS_DAY : s[0][0], t1 = T;
    const X = tt => (tt - t0) / (t1 - t0 || 1) * (W - PAD), Y = v => 10 + (1 - (v - lo) / (hi - lo || 1)) * (H - BOT - 14);
    const Q = s.map(p => [X(p[0]), Y(p[1])]), path = smoothPath(Q), col = up ? "var(--sx-up)" : "var(--sx-down)";
    const xt = Array.from({ length: 5 }, (_, i) => t0 + (t1 - t0) * i / 4);
    const vs = s.map(p => p[1]);
    el.setAttribute("aria-label", `${tkOf(n)} ${ui.range}: from ${fmt(open)} to ${fmt(last)}, low ${fmt(Math.min(...vs))}, high ${fmt(Math.max(...vs))}`);
    el.innerHTML = `<svg aria-hidden="true"><defs><linearGradient id="sxFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".28"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>
      ${xt.map(tt => `<line class="vgrid" x1="${X(tt)}" x2="${X(tt)}" y1="6" y2="${H - BOT}"/><text class="axis" x="${X(tt)}" y="${H - 6}" text-anchor="${tt === t0 ? "start" : tt === t1 ? "end" : "middle"}">${new Date(tt).toLocaleString([], d1 ? { hour: "numeric" } : { day: "numeric", month: "short" })}</text>`).join("")}
      ${ticks.map(v => `<line class="grid" x1="0" x2="${W - PAD}" y1="${Y(v)}" y2="${Y(v)}"/><text class="axis" x="${W - PAD + 8}" y="${Y(v) + 4}">${v}</text>`).join("")}
      ${d1 ? `<line class="prev" x1="0" x2="${W - PAD}" y1="${Y(open)}" y2="${Y(open)}"/><text class="prevlbl" x="${W - PAD + 8}" y="${Y(open) - 6}">Prev close</text>` : ""}
      ${tgt ? `<line class="tgt" x1="0" x2="${W - PAD}" y1="${Y(TARGET)}" y2="${Y(TARGET)}"/><text class="tgtlbl" x="6" y="${Y(TARGET) - 6}">Exam target ${fmt(TARGET)}</text>` : ""}
      <g class="layer"><path d="${path} L${Q[Q.length - 1][0]} ${H - BOT} L${Q[0][0]} ${H - BOT} Z" fill="url(#sxFill)"/><path class="line" d="${path}" stroke="${col}"/></g>
      <rect class="span" y="6" height="${H - BOT - 6}" width="0" style="display:none"/>
      <g class="sc" style="display:none"><line class="scrub" y1="6" y2="${H - BOT}"/><circle class="dot a" r="5" fill="#fff" style="display:none"/><circle class="dot b" r="5" fill="${col}"/></g></svg>`;
    if (!calm()) {
      const ln = el.querySelector(".line");
      if (animate) { const len = ln.getTotalLength(); ln.animate([{ strokeDasharray: `${len} ${len}`, strokeDashoffset: len }, { strokeDasharray: `${len} ${len}`, strokeDashoffset: 0 }], { duration: 650, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }); }
      else el.querySelector(".layer").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
    }
    // Scrub, drag to compare, and keyboard stepping
    const sc = el.querySelector(".sc"), sl = el.querySelector(".scrub"), db = el.querySelector(".dot.b"), da = el.querySelector(".dot.a"), sr = el.querySelector(".span");
    let idx = s.length - 1, anchor = null;
    const nearest = cx => { let b = 0; for (let i = 0; i < Q.length; i++) if (Math.abs(Q[i][0] - cx) < Math.abs(Q[b][0] - cx)) b = i; return b; };
    const at = i => {
      idx = i; sc.style.display = ""; sl.setAttribute("x1", Q[i][0]); sl.setAttribute("x2", Q[i][0]); db.setAttribute("cx", Q[i][0]); db.setAttribute("cy", Q[i][1]);
      if (anchor != null && anchor !== i) {
        da.style.display = ""; da.setAttribute("cx", Q[anchor][0]); da.setAttribute("cy", Q[anchor][1]);
        sr.style.display = ""; sr.setAttribute("x", Math.min(Q[anchor][0], Q[i][0])); sr.setAttribute("width", Math.abs(Q[i][0] - Q[anchor][0]));
        const [f, g] = anchor < i ? [s[anchor], s[i]] : [s[i], s[anchor]]; quote(n, g, f);
      } else { da.style.display = "none"; sr.style.display = "none"; quote(n, s[i]); }
    };
    const hide = () => { sc.style.display = "none"; sr.style.display = "none"; anchor = null; quote(n); };
    const cx = ev => ev.clientX - el.getBoundingClientRect().left;
    el.onpointermove = ev => at(nearest(cx(ev)));
    el.onpointerdown = ev => { el.setPointerCapture(ev.pointerId); anchor = nearest(cx(ev)); at(anchor); };
    el.onpointerup = () => { anchor = null; };
    el.onpointerleave = hide;
    el.onkeydown = ev => {
      if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") { ev.preventDefault(); ev.stopPropagation(); at(Math.max(0, Math.min(s.length - 1, idx + (ev.key === "ArrowRight" ? 1 : -1) * (ev.shiftKey ? 10 : 1)))); }
      else if (ev.key === "Home") at(0); else if (ev.key === "End") at(s.length - 1); else if (ev.key === "Escape") hide();
    };
    el.onblur = hide;
  }

  // ---------- Render ----------
  function render(el) {
    if (host !== el) { host = el; wire(el); }
    const n = curN();
    const old = el.querySelector(".sx-side"), scroll = old ? old.scrollTop : 0;
    const narrow = matchMedia("(max-width: 820px)").matches;
    el.innerHTML = `<div class="stx" data-pane="${narrow ? pane : "detail"}">
      <aside class="sx-side" aria-label="Unit 3 watchlist">
        <button class="sx-up" data-ctopic="all">${ICON.back}All units</button>
        <div class="sx-top"><h1>Stocks</h1><div class="sx-sortw"><button class="sx-icon" data-sx="sortbtn" aria-haspopup="menu" aria-expanded="false" aria-controls="sxMenu" aria-label="Sort subtopics">${ICON.sort}</button><div class="sx-menu" id="sxMenu" role="menu" hidden>${sortMenu()}</div></div></div>
        <div class="sx-date"><span>${new Date().toLocaleDateString([], { day: "numeric", month: "long" })}</span><button class="sx-show" data-sx="pill" aria-label="Pills show ${PILLS[ui.pill]}. Show ${PILLS[(ui.pill + 1) % 4]} instead">Showing ${PILLS[ui.pill]}</button></div>
        <label class="sx-search">${ICON.find}<input id="sxQ" type="search" placeholder="Search terms and examples" aria-label="Search Unit 3 terms, definitions and real-world examples" value="${esc(q)}"><kbd>/</kbd></label>
        <div id="sxList">${listHTML()}</div>
      </aside>
      <section class="sx-main" aria-label="${esc(tkOf(n) + " " + nameOf(n))}">${detailHTML(n)}</section></div>`;
    el.querySelector(".sx-side").scrollTop = scroll;
    quote(n);
    chart(n, drawnFor !== n);
    drawnFor = n;
    if (openTerm) {
      const b = el.querySelector(`.sx-main .sx-term[data-id="${CSS.escape(openTerm)}"]`);
      if (b) requestAnimationFrame(() => b.scrollIntoView({ block: "center", behavior: calm() ? "auto" : "smooth" }));
      openTerm = null;
    }
    if (focusRow) { el.querySelector(`.sx-row[data-n="${focusRow}"]`)?.focus({ preventScroll: false }); focusRow = null; }
    if (openEx) {
      const b = el.querySelector(`.sx-main .sx-ex[data-id="${CSS.escape(openEx)}"]`);
      if (b) { toggleEx(b, true); b.classList.add("lit"); requestAnimationFrame(() => b.scrollIntoView({ block: "center", behavior: calm() ? "auto" : "smooth" })); }
      openEx = null;
    }
  }
  const rerender = () => { if (host && host.isConnected && host.querySelector(".stx")) render(host); };
  function closePops(except) {
    host?.querySelectorAll(".sx-menu, .sx-pop").forEach(p => { if (p !== except) p.hidden = true; });
    host?.querySelectorAll('[data-sx="sortbtn"], [data-sx="info"]').forEach(b => { if (!except || b.getAttribute("aria-controls") !== except.id) b.setAttribute("aria-expanded", "false"); });
  }
  function wire(el) {
    el.addEventListener("click", ev => {
      const b = ev.target.closest("[data-sx]");
      if (!ev.target.closest(".sx-menu, .sx-pop, [data-sx=sortbtn], [data-sx=info]")) closePops();
      if (!b || !el.contains(b)) return;
      const a = b.dataset.sx;
      if (a === "pill") {
        ev.stopPropagation(); ev.preventDefault(); ui.pill = (ui.pill + 1) % 4; saveUi(); el.querySelector("#sxList").innerHTML = listHTML();
        const sb = el.querySelector(".sx-show"); sb.textContent = "Showing " + PILLS[ui.pill]; sb.setAttribute("aria-label", `Pills show ${PILLS[ui.pill]}. Show ${PILLS[(ui.pill + 1) % 4]} instead`);
        say("Pills show " + PILLS[ui.pill]); return;
      }
      if (a === "row") { pane = "detail"; sel = b.dataset.n === "rwe" ? "rwe" : null; return; }      // app.js handles data-ctopic
      if (a === "res") { pane = "detail"; sel = null; openTerm = b.dataset.id; q = ""; return; }
      if (a === "exres") { pane = "detail"; sel = "rwe"; openEx = b.dataset.id; q = ""; return; }
      if (a === "ex") { ev.stopPropagation(); toggleEx(b); return; }
      ev.stopPropagation();
      if (a === "sortbtn" || a === "info") {
        const p = document.getElementById(b.getAttribute("aria-controls")), open = p.hidden;
        closePops(open ? p : null); p.hidden = !open; b.setAttribute("aria-expanded", open);
        if (open && a === "sortbtn") p.querySelector('[aria-checked="true"]')?.focus();
      } else if (a === "sort") { ui.sort = b.dataset.v; saveUi(); closePops(); rerender(); el.querySelector('[data-sx="sortbtn"]')?.focus(); }
      else if (a === "range") setRange(b.dataset.v);
      else if (a === "term") b.setAttribute("aria-expanded", b.getAttribute("aria-expanded") !== "true");
      else if (a === "back") { pane = "list"; el.querySelector(".stx").dataset.pane = "list"; window.scrollTo({ top: 0 }); }
    });
    el.addEventListener("input", ev => { if (ev.target.id === "sxQ") { q = ev.target.value; el.querySelector("#sxList").innerHTML = listHTML(); } });
    el.addEventListener("keydown", ev => {
      if (ev.target.id === "sxQ" && ev.key === "Escape") { q = ""; ev.target.value = ""; el.querySelector("#sxList").innerHTML = listHTML(); ev.target.blur(); }
      if ((ev.key === "ArrowDown" || ev.key === "ArrowUp") && ev.target.closest(".sx-menu")) {
        ev.preventDefault(); ev.stopPropagation();
        const items = [...el.querySelectorAll(".sx-menu button")], i = items.indexOf(ev.target);
        items[(i + (ev.key === "ArrowDown" ? 1 : items.length - 1)) % items.length].focus();
      }
      if (ev.key === "Escape" && ev.target.closest(".sx-menu, .sx-pop, .sx-sortw, .sx-infow")) { const btn = ev.target.closest(".sx-sortw, .sx-infow")?.querySelector(".sx-icon"); closePops(); btn?.focus(); }
    });
  }
  function setRange(r) {
    ui.range = r; saveUi();
    host.querySelectorAll('[data-sx="range"]').forEach(b => b.setAttribute("aria-pressed", b.dataset.v === r));
    quote(curN()); chart(curN(), false);
  }
  // Keys while the Stocks screen is open. Returns true when it used the key.
  function key(ev) {
    if (!host || !host.querySelector(".stx") || ev.target.closest?.(".sx-chart")) return false;
    const k = ev.key;
    if (k === "/") { ev.preventDefault(); host.querySelector("#sxQ")?.focus(); return true; }
    if (k === "Escape") { closePops(); return true; }
    if (k === "ArrowDown" || k === "ArrowUp" || k === "j" || k === "k") {
      if (ev.target.closest?.(".sx-menu")) return false;
      const loose = ev.target === document || ev.target === document.body || ev.target === document.documentElement || ev.target.closest?.(".sx-side");
      if ((k === "ArrowDown" || k === "ArrowUp") && !loose) return false;
      ev.preventDefault();
      const order = [...host.querySelectorAll(".sx-row")].map(r => r.dataset.n);
      if (!order.length) return true;
      const i = order.indexOf(curN()), nx = order[Math.max(0, Math.min(order.length - 1, i + (k === "ArrowDown" || k === "j" ? 1 : -1)))];
      if (nx !== curN()) { focusRow = nx; sel = nx === "rwe" ? "rwe" : null; pane = "detail"; setScope(nx === "rwe" ? "u3" : nx); }
      return true;
    }
    if ("12345".includes(k) && k.length === 1) { const r = RANGES[+k - 1][0]; if (host.querySelector('[data-sx="range"]')) setRange(r); return true; }
    if (k === "d" || k === "D") { show(curN() === "rwe" ? "rwe" : "cards"); return true; }
    return false;
  }
  let rz; addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { if (host?.querySelector(".stx")) chart(curN(), false); }, 120); });

  // ---------- Flashcards: calls, trade confirmation, session, closing bell ----------
  const scopeN = () => curN();
  // The symbol is hidden while you're naming the term from its definition: it would give the answer away
  function cardQuote(x, hideSymbol) {
    const p = priceOf(x.id), c = termDay(x.id);
    return `<div class="sx-cq"><span class="tk">${hideSymbol ? `<span class="sx-hidden" aria-label="Symbol hidden until you flip">· · ·</span>` : esc(x.tk)}</span>${p == null ? `<span class="ipo">Not listed yet · lists at 10.00</span>` : `<span class="px">${fmt(p)}</span>${pill(signed(c), cls(c), "Today " + signed(c))}`}</div>`;
  }
  const callRow = () => `<div class="sx-calls"><button class="btn call buy" data-call="1">Buy · I know it <kbd>B</kbd></button><button class="btn call sell" data-call="-1">Sell · Not sure <kbd>S</kbd></button><button class="btn" data-cflip="1">Just flip <kbd>Space</kbd></button></div>
    <p class="note">Make a call before you look. It stays hidden until you've graded, so grade against the wording, not your guess.</p>`;
  // After the flip the call is not repeated: seeing "you said you know it" next to the grade buttons tilts the grade
  const callTag = call => call ? `<p class="sx-yourcall">Call made. You'll see it after you grade.</p>` : "";
  const session = () => ({ t0: now() - 1, n: 0, right: 0, calls: 0, first: {}, missed: [], recs: [], last: null });
  function afterGrade(D, id) {
    const s = D.sess, c = prog(id), e = evOf(id).at(-1);
    s.n++;
    if (!(id in s.first)) s.first[id] = c.pp ?? IPO;
    if (e[4]) { s.calls++; if (callRight(e)) s.right++; }
    s.missed = s.missed.filter(x => x !== id);
    if (e[3] <= 1) s.missed.push(id);
    s.last = { id, before: c.pp ?? IPO, after: priceOf(id), call: e[4], g: e[3], due: c.due };
    const fresh = check(false);
    s.recs.push(...fresh.map(r => r.name));
  }
  const cardsCtx = () => ({ look: id => CBY[id], label: d => d.t, tk: tkOf(scopeN()), defs: defsOf(scopeN()), noun: "term", undo: "data-undo", redo: "data-redrill", done: "Nothing missed. Tick “Include cards that aren't due” to keep going, or open the chart." });
  function tradeBar(D, ctx = cardsCtx()) {
    const s = D.sess; if (!s || !s.last) return "";
    const L = s.last, d = ctx.look(L.id), ch = L.after - L.before, mv = indexAt(ctx.defs, now()) - indexAt(ctx.defs, s.t0);
    const back = `back ${when(L.due) === "now" ? "now" : "in " + previewWhen(L.due)}`;
    let verdict = "";
    if (L.call) {
      const right = callRight({ 3: L.g, 4: L.call }), word = L.call > 0 ? "bought" : "sold";
      verdict = right ? `<span class="v">You ${word}. Call right</span>`
        : `<span class="v">You ${word}. Call wrong: ${L.call > 0 ? `you knew less than you thought, so it comes ${back}` : "you knew more than you thought"}</span>`;
    }
    // A forgotten term still rises from 10.00 to 12.00 when it lists; don't colour that like a win
    const chc = L.g === 0 ? "flat" : cls(ch);
    return `<div class="sx-tbar" aria-live="polite"><div class="last"><span class="lbl">Last trade</span><b>${esc(d.tk)}</b><span class="px${calm() ? "" : " tick"}">${fmt(L.before)}${ICON.to}<span class="sr-only">to</span>${fmt(L.after)}</span>${pill(signed(ch), chc)}${verdict}<button class="sx-undo" ${ctx.undo}="1">Undo <kbd>U</kbd></button></div>
      <div class="sess"><span>This session</span><b class="${cls(mv)}">${ctx.tk} ${signed(mv)}</b><span>${s.n} traded</span>${s.calls ? `<span>calls ${s.right} of ${s.calls} right</span>` : ""}${runs().cur ? `<span>${runs().cur}-day run</span>` : ""}</div></div>`;
  }
  // Closing bell: the session's result, then the one useful next step (the terms you missed), not a chart
  function recap(D, ctx = cardsCtx()) {
    const s = D.sess; if (!s || !s.n) return "";
    const a = indexAt(ctx.defs, s.t0), b = indexAt(ctx.defs, now()), mv = b - a;
    const best = Object.entries(s.first).filter(([id]) => !s.missed.includes(id)).map(([id, p0]) => [ctx.look(id), priceOf(id) - p0]).sort((x, y) => y[1] - x[1])[0], r = runs();
    const missed = s.missed.map(ctx.look).filter(Boolean);
    return `<section class="sx-close" aria-label="Session summary"><p class="lbl">Closing bell</p>
      <div class="big"><span class="tk">${ctx.tk}</span><span class="px">${fmt(b)}</span><span class="ch ${cls(mv)}">${signed(mv)} (${sgn(mv)}${Math.abs(pct(b, a)).toFixed(2)}%)</span></div>
      <p>You traded ${s.n} ${ctx.noun}${s.n === 1 ? "" : "s"} this session${s.calls ? ` and called ${s.right} of ${s.calls} right` : ""}.${r.cur ? ` Trading run: ${r.cur} day${r.cur === 1 ? "" : "s"}.` : ""}${best && best[1] > .004 ? ` Top gainer: ${esc(best[0].tk)} ${signed(best[1])}.` : ""}${s.recs.length ? ` New record${s.recs.length === 1 ? "" : "s"}: ${s.recs.map(esc).join(", ")}.` : ""}</p>
      ${missed.length ? `<h3>To drill again</h3><ul class="sx-missed">${missed.map(d => `<li><b>${esc(d.tk)}</b> ${esc(ctx.label(d))}</li>`).join("")}</ul>
        <div class="sx-actrow"><button class="sx-drill" ${ctx.redo}="1">Drill these ${missed.length} again <kbd>Enter</kbd></button><button class="sx-link" data-view="notes">Open the ${ctx.tk} chart</button></div>`
      : `<p class="sx-none">${ctx.done}</p><div class="sx-actrow"><button class="sx-drill" data-view="notes">Open the ${ctx.tk} chart</button></div>`}</section>`;
  }
  const previewWhen = due => { const m = (due - now()) / 60000; return m < 60 ? Math.max(1, Math.round(m)) + " min" : m < 1440 ? Math.round(m / 60) + " hours" : Math.round(m / 1440) + " days"; };

  // ---------- Examples drill: Recall (graded, with calls), Numbers and Pick the example (practice) ----------
  const RM = { recall: "Recall", numbers: "Numbers", pick: "Pick the example" };
  const R = { mode: RM[ui.rmode] ? ui.rmode : "recall", cur: null, flipped: false, call: 0, sess: null, undo: null, redo: null, num: null, pick: null };
  let rhost = null;
  const rScope = () => { const n = curN(); return n === "u3" || n === "rwe" ? "u3" : n; };
  const rPool = () => rweIn(rScope());
  const rCtx = () => { const n = rScope(); return { look: RBY, label: e => e.mem.tag, tk: n === "u3" ? "RWE3" : tkOf(n) + " examples", defs: rPool(), noun: "example", undo: "data-rundo", redo: "data-rredo", done: "Nothing missed. Every example here is up to date." }; };
  function rQueue() {
    const xs = rPool();
    if (R.redo?.length) return R.redo.map(RBY).filter(e => e && xs.includes(e));
    return [...xs.filter(e => prog(e.id) && isDue(e.id)).sort((a, b) => prog(a.id).due - prog(b.id).due), ...xs.filter(e => !prog(e.id))];
  }
  function rNewNum() {
    const xs = rPool(); if (!xs.length) return R.num = null;
    const e = xs.slice().sort((a, b) => (priceOf(a.id) ?? 0) - (priceOf(b.id) ?? 0))[rand(Math.min(6, xs.length))], [num, w] = e.mem.numbers[rand(e.mem.numbers.length)];
    R.num = { id: e.id, n: num, w, answered: false };
  }
  function rNewPick() {
    const xs = rPool().filter(e => e.concepts.length); R.pick = null;
    for (let i = 0; i < 40 && xs.length; i++) {
      const t = xs[rand(xs.length)], c = t.concepts[rand(t.concepts.length)], nc = norm(c);
      const dis = shuffle(rwe().filter(e => e !== t && !e.concepts.some(k => { const nk = norm(k); return nk.includes(nc) || nc.includes(nk); })));
      if (dis.length >= 3) { R.pick = { id: t.id, concept: c, opts: shuffle([t, ...dis.slice(0, 3)]).map(e => e.id), choice: null }; return; }
    }
  }
  const scoreLine = k => { const x = P.rwe?.[k] || { right: 0, total: 0 }; return `<p class="score-line">${x.right} of ${x.total} right overall · practice only, prices don't move</p>`; };
  function renderRwe(el) {
    if (rhost !== el) { rhost = el; wireRwe(el); }
    if (worldOf() !== "board") { el.innerHTML = `<div class="empty">Real-world examples are drilled with Unit 3 for now. <button class="btn" data-ctopic="u3">Open Unit 3</button></div>`; return; }
    if (!rwe().length) { el.innerHTML = `<div class="empty">No Unit 3 examples loaded.</div>`; return; }
    const xs = rPool(), n = rScope(), q = rQueue();
    const seg = `<div class="sx-seg" role="tablist" aria-label="Drill type">${Object.entries(RM).map(([k, v]) => `<button role="tab" data-rx="mode" data-v="${k}" aria-selected="${R.mode === k}">${v}</button>`).join("")}</div>`;
    const where = n === "u3" ? "Unit 3" : n + " " + SHORT[n];
    let body = "";
    if (R.mode === "recall") {
      if (!R.cur || !q.some(e => e.id === R.cur)) { R.cur = q[0]?.id || null; R.flipped = false; R.call = 0; }
      const info = `<div class="progress-line"><span>${q.length} due or new in ${where}${R.sess?.n ? ` · ${R.sess.n} drilled this session` : ""}</span><span>${xs.length} examples</span></div>`;
      const ctx = rCtx();
      if (!R.cur) body = info + (recap(R, ctx) || `<div class="empty">All caught up in ${where}. Every example here is listed and not yet due. Try Numbers or Pick the example, or pick another subtopic.</div>`);
      else {
        const e = RBY(R.cur), p = priceOf(e.id), c = termDay(e.id);
        const quoteL = `<div class="sx-cq"><span class="tk">${esc(e.tk)}</span>${p == null ? `<span class="ipo">Not listed yet · lists at 10.00</span>` : `<span class="px">${fmt(p)}</span>${pill(signed(c), cls(c), "Today " + signed(c))}`}<span class="ipo">Exam value ${e.score}</span></div>`;
        const front = `<h2 class="title">${esc(e.mem.tag)}</h2><p class="note">${esc(e.title)} · ${esc(e.region)} · ${esc(e.years)}</p>`;
        const back = R.flipped ? `<div class="sx-mem">${storyHTML(e.mem)}${numsHTML(e.mem)}<p class="sx-use"><b>Use it for</b> ${esc(e.mem.use)}</p>${butHTML(e.mem)}</div>${callTag(R.call)}${gradeRow("data-rgrade", e.id)}<details class="sx-more"><summary>Facts, diagram, evaluation and sources</summary>${factSheet(e)}</details>`
          : `<p class="prompt">Say the story, the three numbers and the “but” out loud, as you'd use them in a Paper 2 answer.</p>${callRow()}`;
        body = info + tradeBar(R, ctx) + `<div class="flash"><div class="head"><span>${e.n} ${esc(CT[e.n].name)}</span>${stateTag(e.id)}</div>${quoteL}${front}${back}</div>`;
      }
    } else if (R.mode === "numbers") {
      if (!R.num || !xs.some(e => e.id === R.num.id)) rNewNum();
      const e = RBY(R.num.id), A = R.num;
      const blank = A.answered ? `<span class="num-hl">${esc(A.n)}</span>` : `<input id="rNumIn" class="field" inputmode="decimal" autocomplete="off" aria-label="The number">`;
      body = `<div class="flash"><div class="head"><span>${e.n} ${esc(CT[e.n].name)}</span></div><div class="sx-cq"><span class="tk">${esc(e.tk)}</span><span class="ipo">${esc(e.mem.tag)}</span></div><h2 class="title">${esc(e.title)}</h2>
        <div class="cloze">${blank} <span>${esc(A.w)}</span></div>
        ${A.answered ? `<div class="feedback ${A.ok ? "ok" : "no"}"><b>${A.ok ? "Right." : `Not quite. You wrote ${esc(A.given || "nothing")}.`}</b><p class="detail">The answer is ${esc(A.n)}. The story: ${esc(e.mem.story.replace(/→/g, ">"))}</p></div><div><button class="btn primary" data-rx="next">Next number <kbd>Enter</kbd></button></div>`
        : `<div class="toolbar"><button class="btn primary" data-rx="check">Check <kbd>Enter</kbd></button><button class="btn" data-rx="reveal">Reveal</button></div><p class="note">Units don't matter, and answers within 1% count.</p>`}
        ${scoreLine("num")}</div>`;
    } else {
      if (!R.pick || !R.pick.opts.every(id => RBY(id))) rNewPick();
      if (!R.pick) body = `<div class="empty">Not enough examples here to make a question. Pick Unit 3 as a whole.</div>`;
      else {
        const Q = R.pick, t = RBY(Q.id);
        body = `<div class="quiz"><p class="note">Which example would you use for…</p><p class="question">${esc(Q.concept)}</p>
          <div class="options">${Q.opts.map((id, i) => { const o = RBY(id), cl = Q.choice ? (id === Q.id ? "right" : id === Q.choice ? "wrong" : "") : "";
            return `<button class="opt ${cl}" data-rx="opt" data-v="${esc(id)}" ${Q.choice ? "disabled" : ""}><span class="k">${i + 1}</span><b>${esc(o.tk)} · ${esc(o.mem.tag)}</b><span class="meta">${esc(o.region)} · ${o.n} ${SHORT[o.n]}</span></button>`; }).join("")}</div>
          ${Q.choice ? `<div class="feedback ${Q.choice === Q.id ? "ok" : "no"}"><b>${Q.choice === Q.id ? "Right." : "Not this time."}</b><p class="detail"><b>${esc(t.mem.tag)}</b>: ${esc(t.hook)}</p></div><div><button class="btn primary" data-rx="nextpick">Next question <kbd>Enter</kbd></button></div>` : `<p class="keys">Keys <kbd>1</kbd> to <kbd>4</kbd></p>`}
          ${scoreLine("pick")}</div>`;
      }
    }
    el.innerHTML = seg + body;
    if (R.mode === "numbers" && !R.num?.answered) setTimeout(() => document.getElementById("rNumIn")?.focus({ preventScroll: true }), 0);
  }
  const rerenderRwe = () => { if (rhost) renderRwe(rhost); renderStats(); renderTicker(); };
  function rGrade(g) {
    const id = R.cur; if (!id || !R.flipped) return;
    if (!R.sess) R.sess = session();
    R.undo = { id, card: P.cards[id] ? JSON.parse(JSON.stringify(P.cards[id])) : null, sess: JSON.parse(JSON.stringify(R.sess)), call: R.call, redo: R.redo?.slice() };
    if (R.redo) { R.redo = R.redo.filter(x => x !== id); if (!R.redo.length) R.redo = null; }
    grade(id, g, R.call || 0); R.call = 0;
    afterGrade(R, id);
    say(`Graded ${g}.`);
    R.cur = rQueue().filter(e => e.id !== id)[0]?.id || null; R.flipped = false;
    rerenderRwe();
  }
  function rUndo() {
    const u = R.undo; if (!u) return;
    if (u.card) P.cards[u.id] = u.card; else delete P.cards[u.id];
    persist();
    R.sess = u.sess; R.redo = u.redo || null; R.cur = u.id; R.flipped = true; R.call = u.call; R.undo = null;
    say("Last grade undone."); rerenderRwe();
  }
  function rPractice(k, ok) { P.rwe = P.rwe || {}; const x = P.rwe[k] || { right: 0, total: 0 }; x.total++; if (ok) x.right++; P.rwe[k] = x; persist(); }
  function rCheck(reveal) {
    const A = R.num; if (!A || A.answered) return;
    const v = reveal ? "" : (document.getElementById("rNumIn")?.value || "").trim(), a = Math.abs(toNum(v)), b = Math.abs(toNum(A.n));
    A.ok = !reveal && !isNaN(a) && (a === b || Math.abs(a - b) <= b * .01); A.answered = true; A.given = v;
    rPractice("num", A.ok); say(A.ok ? "Right." : "Not quite. The answer is " + A.n);
    renderRwe(rhost); setTimeout(() => rhost.querySelector('[data-rx="next"]')?.focus({ preventScroll: true }), 0);
  }
  function rChoose(id) {
    const Q = R.pick; if (!Q || Q.choice) return;
    Q.choice = id; rPractice("pick", id === Q.id); say(id === Q.id ? "Right." : "Not this time.");
    renderRwe(rhost); setTimeout(() => rhost.querySelector('[data-rx="nextpick"]')?.focus({ preventScroll: true }), 0);
  }
  function wireRwe(el) {
    el.addEventListener("click", ev => {
      const b = ev.target.closest("button"); if (!b || !el.contains(b)) return;
      const d = b.dataset;
      if (d.rx === "mode") { R.mode = d.v; ui.rmode = d.v; saveUi(); renderRwe(el); }
      else if (d.call) { R.call = +d.call; R.flipped = true; renderRwe(el); }
      else if (d.cflip) { R.flipped = true; renderRwe(el); }
      else if (d.rgrade) rGrade(d.rgrade);
      else if (d.rundo) rUndo();
      else if (d.rredo) { R.redo = R.sess.missed.slice(); R.sess.missed = []; R.cur = null; renderRwe(el); }
      else if (d.rx === "check") rCheck(false);
      else if (d.rx === "reveal") rCheck(true);
      else if (d.rx === "next") { rNewNum(); renderRwe(el); }
      else if (d.rx === "opt") rChoose(d.v);
      else if (d.rx === "nextpick") { rNewPick(); renderRwe(el); }
      else return;                                   // data-view, data-ctopic: app.js
      ev.stopPropagation();
    });
  }
  // Keys in the examples drill. Typing in the number box only sends Enter.
  function rweKey(ev, free) {
    const k = ev.key, typing = ev.target.id === "rNumIn";
    if (R.mode === "numbers") { if (k === "Enter") { ev.preventDefault(); R.num?.answered ? (rNewNum(), renderRwe(rhost)) : rCheck(false); } return; }
    if (typing) return;
    const n = "1234".includes(k) && k.length === 1 ? +k - 1 : -1;
    if (R.mode === "pick") {
      if (!R.pick) return;
      if (!R.pick.choice && n >= 0) rChoose(R.pick.opts[n]);
      else if (R.pick.choice && k === "Enter") { ev.preventDefault(); rNewPick(); renderRwe(rhost); }
      return;
    }
    if ((k === "u" || k === "U") && R.undo) return rUndo();
    if (!R.cur) { if (k === "Enter" && free && rhost.querySelector("[data-rredo]")) { ev.preventDefault(); rhost.querySelector("[data-rredo]").click(); } return; }
    if (!R.flipped && "bsBS".includes(k) && k.length === 1) { R.call = k.toLowerCase() === "b" ? 1 : -1; R.flipped = true; renderRwe(rhost); }
    else if (!R.flipped && (k === " " || k === "Enter") && free) { ev.preventDefault(); R.flipped = true; renderRwe(rhost); }
    else if (R.flipped && n >= 0) rGrade(["again", "hard", "good", "easy"][n]);
  }
  const rweDue = () => worldOf() === "board" ? rPool().filter(e => prog(e.id) && isDue(e.id)).length : 0;
  const resetRwe = () => { R.cur = null; R.sess = R.redo = R.undo = null; R.num = R.pick = null; };

  // ---------- Toasts ----------
  function toast(kind, title, body) {
    let box = document.getElementById("sxToasts");
    if (!box) { box = document.createElement("div"); box.id = "sxToasts"; box.className = "sx-toasts"; box.setAttribute("role", "status"); box.setAttribute("aria-live", "polite"); document.body.append(box); }
    const t = document.createElement("div");
    t.className = "sx-toast";
    t.innerHTML = `<span class="k">${esc(kind)}</span><b>${esc(title)}</b><span>${esc(body)}</span>`;
    box.append(t);
    requestAnimationFrame(() => t.classList.add("in"));
    setTimeout(() => { t.classList.remove("in"); setTimeout(() => t.remove(), 250); }, 4200);
  }

  return { render, key, renderRwe, rweKey, rweDue, resetRwe, check, cardQuote, callRow, callTag, session, afterGrade, tradeBar, recap, TICK, termDay };
})();
