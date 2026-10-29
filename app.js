// TEU: IB Economics HL revision. Course notes (Units 1–4) and the Unit 4 evidence bank.
// Plain script, no build step; DATA and COURSE come from data/*.js. Progress lives in localStorage.

// Diagram renderer: turns a small JSON spec (data coordinates 0–100 on both axes, y up) into an inline SVG.
// Colours come from CSS classes so diagrams follow light and dark themes.
const DG = { W: 340, H: 272, x0: 48, x1: 322, top: 16, bot: 230 };
function dgX(v) { return DG.x0 + (DG.x1 - DG.x0) * v / 100; }
function dgY(v) { return DG.bot - (DG.bot - DG.top) * v / 100; }
function dgEsc(s) { return String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function dgPath(pts, smooth) {
  const P = pts.map(([x, y]) => [dgX(x), dgY(y)]);
  if (!smooth || P.length < 3) return "M" + P.map(p => p.map(n => n.toFixed(1)).join(" ")).join(" L");
  // Catmull-Rom through every point, as cubic Béziers
  let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1.map(n => n.toFixed(1)).join(" ")} ${c2.map(n => n.toFixed(1)).join(" ")} ${p2.map(n => n.toFixed(1)).join(" ")}`;
  }
  return d;
}
function dgText(x, y, s, cls = "", anchor = "start") {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" class="${cls}">${dgEsc(s)}</text>`;
}
function drawDiagram(spec) {
  const s = spec || {};
  const tone = t => "t-" + (["a", "b", "c", "m", "bad"].includes(t) ? t : "ink");
  let g = "", over = "";
  // Shaded areas sit under everything else
  for (const a of s.shade || []) {
    g += `<path d="${dgPath(a.pts, a.smooth)} Z" class="area ${tone(a.tone || "a")}"/>`;
    if (a.label) { const at = a.at || [a.pts.reduce((t, p) => t + p[0], 0) / a.pts.length, a.pts.reduce((t, p) => t + p[1], 0) / a.pts.length]; over += dgText(dgX(at[0]), dgY(at[1]) + 4, a.label, "lbl area-lbl", "middle"); }
  }
  // Axes
  g += `<path d="M${DG.x0} ${DG.top - 6} V${DG.bot} H${DG.x1 + 6}" class="axis"/>`;
  g += `<text x="14" y="${(DG.top + DG.bot) / 2}" text-anchor="middle" transform="rotate(-90 14 ${(DG.top + DG.bot) / 2})" class="axlbl">${dgEsc(s.y || "")}</text>`;
  g += dgText((DG.x0 + DG.x1) / 2, DG.H - 6, s.x || "", "axlbl", "middle");
  if (s.origin !== false) g += dgText(DG.x0 - 6, DG.bot + 13, s.origin || "0", "tick", "end");
  const tickX = (v, l) => dgText(dgX(v), DG.bot + 14, l, "tick", "middle");
  const tickY = (v, l) => dgText(DG.x0 - 5, dgY(v) + 4, l, "tick", "end");
  for (const [v, l] of s.ticksX || []) g += tickX(v, l);
  for (const [v, l] of s.ticksY || []) g += tickY(v, l);
  // Guides from points to the axes
  for (const p of s.points || []) {
    const [x, y] = p.at, [gx, gy] = p.guide || [];
    if (gx != null && gx !== false) { g += `<path d="M${dgX(x).toFixed(1)} ${dgY(y).toFixed(1)} V${DG.bot}" class="guide"/>`; if (gx) g += tickX(x, gx); }
    if (gy != null && gy !== false) { g += `<path d="M${dgX(x).toFixed(1)} ${dgY(y).toFixed(1)} H${DG.x0}" class="guide"/>`; if (gy) g += tickY(y, gy); }
  }
  // Curves and lines
  for (const c of s.curves || []) {
    g += `<path d="${dgPath(c.pts, c.smooth)}" class="curve ${tone(c.tone)}${c.dash ? " dash" : ""}"/>`;
    if (c.label) {
      let x, y, anchor;
      if (c.labelAt) { [x, y] = [dgX(c.labelAt[0]), dgY(c.labelAt[1]) + 4]; anchor = "middle"; }
      else {
        const [lx, ly] = c.pts[c.pts.length - 1];
        if (lx > 88) { x = dgX(lx) - 2; y = dgY(ly) - 7; anchor = "end"; } else { x = dgX(lx) + 5; y = dgY(ly) + 4; anchor = "start"; }
      }
      over += dgText(x, y, c.label, "lbl " + tone(c.tone), anchor);
    }
  }
  for (const a of s.arrows || []) {
    const [x1, y1] = [dgX(a.from[0]), dgY(a.from[1])], [x2, y2] = [dgX(a.to[0]), dgY(a.to[1])];
    const ang = Math.atan2(y2 - y1, x2 - x1), h = 7;
    g += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" class="arrow ${tone(a.tone || "a")}"/>`;
    g += `<path d="M${(x2 - h * Math.cos(ang - .45)).toFixed(1)} ${(y2 - h * Math.sin(ang - .45)).toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${(x2 - h * Math.cos(ang + .45)).toFixed(1)} ${(y2 - h * Math.sin(ang + .45)).toFixed(1)}" class="arrow head ${tone(a.tone || "a")}"/>`;
  }
  for (const p of s.points || []) {
    if (p.dot !== false) g += `<circle cx="${dgX(p.at[0]).toFixed(1)}" cy="${dgY(p.at[1]).toFixed(1)}" r="3" class="dot"/>`;
    if (p.label) over += dgText(dgX(p.at[0]) + (p.dx ?? 6), dgY(p.at[1]) + (p.dy ?? -6), p.label, "lbl", p.anchor || "start");
  }
  for (const n of s.notes || []) over += dgText(dgX(n.at[0]), dgY(n.at[1]) + 4, n.text, "note-t " + tone(n.tone || "m"), n.anchor || "middle");
  return `<svg class="dg" viewBox="0 0 ${DG.W} ${DG.H}" role="img" aria-label="${dgEsc(s.title || "Diagram")}">${g}${over}</svg>`;
}

const TOPICS = [
  { n: "4.1", name: "Benefits of international trade", short: "Trade gains", q: "Using real-world examples, evaluate the view that free trade benefits all stakeholders in an economy." },
  { n: "4.2", name: "Types of trade protection", short: "Protection", q: "Using a real-world example, evaluate the consequences of a tariff for different stakeholders." },
  { n: "4.3", name: "Arguments for and against protection", short: "For / against", q: "Using a real-world example, evaluate the arguments for imposing trade protection." },
  { n: "4.4", name: "Economic integration", short: "Integration", q: "Using a real-world example, evaluate the costs and benefits for a country of joining a trading bloc or monetary union." },
  { n: "4.5", name: "Exchange rates", short: "Exchange rates", q: "Using a real-world example, evaluate the consequences of a significant change in a country's exchange rate." },
  { n: "4.6", name: "Balance of payments", short: "BoP", q: "Using a real-world example, evaluate the view that a persistent current account imbalance is harmful to an economy." },
  { n: "4.7", name: "Sustainable development", short: "Sustainability", q: "Using a real-world example, evaluate the progress being made towards the Sustainable Development Goals." },
  { n: "4.8", name: "Measuring development", short: "Measuring", q: "Using real-world examples, evaluate the usefulness of composite indicators in measuring economic development." },
  { n: "4.9", name: "Barriers to growth and development", short: "Barriers", q: "Using a real-world example, evaluate the extent to which this barrier limits economic growth and development." },
  { n: "4.10", name: "Growth and development strategies", short: "Strategies", q: "Using a real-world example, evaluate the effectiveness of this strategy in promoting economic development." },
];
const TOPIC = Object.fromEntries(TOPICS.map(t => [t.n, t]));
const TIERS = ["S", "A", "B", "C"];
const DAY = 86400000;
const INTERVALS = [10 * 60000, 1 * DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY];
const LS_KEY = "geb-progress-v1";
const UI_KEY = "teu-ui";
const DRAFT_KEY = "teu-drafts";

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rand = n => Math.floor(Math.random() * n);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const lsGet = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const say = t => { const sr = $("#sr"); sr.textContent = ""; setTimeout(() => { sr.textContent = t; }, 30); };
const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Data prep ----------
const scoreOf = r => Math.round(((r.relevance || 0) * .3 + (r.data || 0) * .25 + (r.evaluation || 0) * .3 + (r.recency || 0) * .15) * 20);
const tierOf = s => s >= 95 ? "S" : s >= 88 ? "A" : s >= 80 ? "B" : "C";
DATA.forEach(e => {
  e.topics = String(e.subtopic).match(/4\.\d+/g) || ["4.1"];
  e.topic = e.topics[0];
  e.score = scoreOf(e.rating || {});
  e.tier = tierOf(e.score);
  e.lastYear = Math.max(...(String(e.years).match(/\d{4}/g) || ["0"]).map(Number));
  e.concepts = e.concepts || [];
});
const BY_ID = Object.fromEntries(DATA.map(e => [e.id, e]));

// Short names for the bay plan, where a container is about 16 characters wide
const BAY_NAME = {
  "china-rare-earth-export-controls": "Rare earths", "eu-steel-quota-2026": "EU steel wall", "australia-china-barley-wine": "Barley & wine",
  "eu-mercosur-agreement": "EU–Mercosur", "afcfta": "AfCFTA", "wto-appellate-body-crisis": "WTO no judges", "eu-cbam": "CBAM",
  "brexit-uk-eu-reset": "Brexit checks", "argentina-peso-band": "Peso halved", "egypt-float-ras-el-hekma": "Egypt float",
  "turkey-lira-inflation": "Lira inflation", "china-trillion-surplus": "China surplus", "uk-brexit-pound-jcurve": "Pound J-curve",
  "guyana-vs-sri-lanka-hdi-gap": "Same HDI", "india-big-economy-poor-people": "India's poor", "zambia-common-framework": "Zambia debt",
  "botswana-diamonds-institutions": "Botswana gems", "bangladesh-garments-ldc-graduation": "Garment growth", "vietnam-export-led-umic": "Doi Moi",
  "grameen-microfinance": "Microcredit", "sudan-war-development-reversal": "Sudan's war", "afghanistan-women-exclusion": "Afghan girls",
  "chile-cherries-china": "Chile cherries", "morocco-car-exports": "Moroccan cars", "new-zealand-china-fta-dairy": "Kiwi milk",
  "mission-300-africa-electricity": "Mission 300", "costa-rica-forest-payments": "Paid forests", "china-extreme-poverty-declared-over": "China poverty",
};
DATA.forEach(e => { e.bay = BAY_NAME[e.id] || e.mem.tag; });

// Container codes, ISO 6346 style: three owner letters, U for freight, then bay and slot
{
  const STOP = /^(a|an|the|of|and|vs|to|in|on|for|at|by|with|its|s)$/i;
  const used = new Set();
  for (const t of TOPICS) {
    DATA.filter(e => e.topic === t.n).sort((a, b) => b.score - a.score).forEach((e, i) => {
      const words = e.mem.tag.replace(/['’]s\b/g, "").split(/[^A-Za-z]+/).filter(w => w && !STOP.test(w));
      let own = words.map(w => w[0]).join("").slice(0, 3);
      if (own.length < 3) own = (own + (words[0] || "X").slice(1) + "XXX").slice(0, 3);
      own = own.toUpperCase();
      let code = `${own}U ${t.n.split(".")[0]}${t.n.split(".")[1].padStart(2, "0")}·${String(i + 1).padStart(2, "0")}`;
      while (used.has(code)) code = code.replace(/^(\w\w)\w/, (m, a) => a + "Z");
      used.add(code); e.code = code; e.slot = i;
    });
  }
}

// Course notes: flatten definitions and diagrams into drillable cards
const UNITS = [
  { u: "1", name: "Introduction to economics", short: "Intro" },
  { u: "2", name: "Microeconomics", short: "Micro" },
  { u: "3", name: "Macroeconomics", short: "Macro" },
  { u: "4", name: "The global economy", short: "Global" },
];
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const CT = {}, CDEFS = [], CDIAG = [];
COURSE.forEach(t => {
  t.unit = t.n.split(".")[0];
  const sh = /^(Market failure|Demand management)\s*:/i.test(t.name) ? t.name.split(":")[1] : t.name.split(/[:,(]/)[0];
  t.short = sh.trim().replace(/^./, c => c.toUpperCase());
  ["defs", "points", "diagrams", "formulas", "mnemonics", "eval", "traps"].forEach(k => t[k] = t[k] || []);
  CT[t.n] = t;
  t.defs.forEach(d => CDEFS.push({ id: "d:" + t.n + ":" + slug(d.t), n: t.n, unit: t.unit, t: d.t, d: d.d, hl: t.hl || d.hl }));
  t.diagrams.forEach(g => CDIAG.push({ id: "g:" + t.n + ":" + slug(g.name), n: t.n, unit: t.unit, ...g, hl: t.hl || g.hl }));
});
const CBY = Object.fromEntries([...CDEFS, ...CDIAG].map(x => [x.id, x]));

// Ticker symbols for the exchange board: the abbreviation in brackets if there is one, else initials
{
  const STOP = /^(of|the|and|a|an|to|in|on|for|by|or|as|its)$/i;
  const used = new Set();
  for (const d of CDEFS) {
    const par = d.t.match(/\(([A-Za-z][A-Za-z0-9]{1,6})\)/);
    const words = d.t.replace(/\(.*?\)/g, "").split(/[^A-Za-z0-9]+/).filter(w => w && !STOP.test(w));
    let s = par ? par[1].toUpperCase() : words.length === 1 ? words[0].slice(0, 4).toUpperCase() : words.slice(0, 4).map(w => w[0]).join("").toUpperCase();
    s = s.slice(0, 5) || "X";
    const last = (words[words.length - 1] || "").toUpperCase();
    const alts = [s, ...[2, 3, 4].map(n => (words.slice(0, -1).map(w => w[0]).join("") + last.slice(0, n)).toUpperCase().slice(0, 5)), words.join("").toUpperCase().slice(0, 5)];
    let k = alts.find(a => a && !used.has(a)), i = 2;
    if (!k) { k = s.slice(0, 4) + i; while (used.has(k)) k = s.slice(0, 4) + ++i; }
    used.add(k); d.tk = k;
  }
}

// ---------- State & persistence ----------
const S = { view: "notes", sec: "course", topic: "all", ctopic: "all", tier: "all", q: "", cq: "", sort: "score", sel: null, ...pickUI(lsGet(UI_KEY, {})) };
function pickUI(u) { const o = {}; if (u.ctopic && (u.ctopic === "all" || CT[u.ctopic] || /^u[1-4]$/.test(u.ctopic))) o.ctopic = u.ctopic; if (u.topic && (u.topic === "all" || TOPIC[u.topic])) o.topic = u.topic; if (u.sel && BY_ID[u.sel]) o.sel = u.sel; return o; }
const saveUI = () => lsSet(UI_KEY, { ctopic: S.ctopic, topic: S.topic, sel: S.sel, tapePaused });
let P = { cards: {}, numbers: { right: 0, total: 0 }, match: { right: 0, total: 0 }, quiz: { right: 0, total: 0 }, writes: [], rec: {}, rwe: {}, updated: 0 };

function mergeProgress(a, b) {
  const out = { cards: { ...a.cards }, numbers: a.numbers, match: a.match, quiz: a.quiz || { right: 0, total: 0 }, writes: [...(a.writes || [])], updated: Math.max(a.updated || 0, b.updated || 0) };
  for (const [id, c] of Object.entries(b.cards || {})) {
    const o = out.cards[id], win = !o || (c.t || 0) > (o.t || 0) ? c : o;
    out.cards[id] = o && (o.ev || c.ev) ? { ...win, ev: mergeEv(o.ev, c.ev) } : win;
  }
  out.rec = { ...(a.rec || {}) };
  for (const [k, t] of Object.entries(b.rec || {})) out.rec[k] = Math.min(out.rec[k] || t, t);
  out.rwe = a.rwe || {};
  if ((b.updated || 0) > (a.updated || 0)) { out.numbers = b.numbers || out.numbers; out.match = b.match || out.match; out.quiz = b.quiz || out.quiz; out.rwe = b.rwe || out.rwe; }
  const seen = new Set(out.writes.map(w => w.t + w.id));
  for (const w of b.writes || []) if (!seen.has(w.t + w.id)) out.writes.push(w);
  out.writes.sort((x, y) => x.t - y.t);
  return out;
}
// Dated grade events [time, box, due, grade 0-3, call -1/0/1], unioned so two computers keep both histories
function mergeEv(x, y) { const m = new Map(); for (const e of [...(x || []), ...(y || [])]) m.set(e[0], e); return [...m.values()].sort((p, q) => p[0] - q[0]).slice(-40); }
function persist() { P.updated = Date.now(); lsSet(LS_KEY, P); }

// ---------- Spaced repetition ----------
const now = () => Date.now();
const prog = id => P.cards[id];
const isDue = id => { const c = prog(id); return !c || c.due <= now(); };
const stateOf = id => { const c = prog(id); if (!c) return "new"; if (c.box >= 4) return "mastered"; return "learning"; };
const stateLabel = { new: "New", learning: "Learning", mastered: "Mastered" };

// Board prices: recall strength as a share price. A term lists at 10.00 the first time you grade it,
// climbs with each correct recall towards 100, and drifts down once it is overdue.
const IPO = 10;
const basePrice = c => 12 + c.box * 17.6;
const GCODE = { again: 0, hard: 1, good: 2, easy: 3 };
// Progress saved before dated events existed has only the latest grade
const evOf = id => { const c = prog(id); return !c ? [] : c.ev?.length ? c.ev : [[c.t || 0, c.box, c.due, 2, 0]]; };
function priceAt(id, tt) {
  let e = null;
  for (const x of evOf(id)) { if (x[0] <= tt) e = x; else break; }
  if (!e) return null;
  let p = 12 + e[1] * 17.6;
  if (e[2] < tt) p *= Math.max(.6, 1 - (tt - e[2]) / DAY * .05);
  return p;
}
const priceOf = id => prog(id) ? priceAt(id, now()) ?? basePrice(prog(id)) : null;
// Sector index: unlisted terms count at the listing price
const indexAt = (defs, tt) => defs.length ? defs.reduce((a, d) => a + (priceAt(d.id, tt) ?? IPO), 0) / defs.length : IPO;
const dayChg = id => { const p = priceOf(id); return p == null ? null : p - (priceAt(id, now() - DAY) ?? IPO); };

let lastMoved = null;
function grade(id, g, call = 0) {
  const before = prog(id) ? priceOf(id) : IPO, stBefore = stateOf(id);
  const c = { box: 0, reps: 0, lapses: 0, ...(prog(id) || {}) };
  if (g === "again") { c.box = 0; c.lapses++; }
  else if (g === "hard") c.box = Math.max(1, c.box);
  else if (g === "good") c.box = Math.min(5, c.box + 1);
  else c.box = Math.min(5, c.box + 2);
  c.reps++;
  c.due = now() + INTERVALS[c.box] * (g === "hard" ? .6 : 1);
  c.t = now();
  c.pp = +before.toFixed(2);
  c.ev = [...evOf(id), [c.t, c.box, c.due, GCODE[g], call]].slice(-40);
  delete c.h;
  P.cards[id] = c;
  persist();
  if (stateOf(id) !== stBefore) lastMoved = id;
}
function previewInterval(id, g) {
  const c = prog(id) || { box: 0 };
  const box = g === "again" ? 0 : g === "hard" ? Math.max(1, c.box) : g === "good" ? Math.min(5, c.box + 1) : Math.min(5, c.box + 2);
  const ms = INTERVALS[box] * (g === "hard" ? .6 : 1);
  if (ms < 3600000) return Math.round(ms / 60000) + " min";
  if (ms < DAY) return Math.round(ms / 3600000) + " hours";
  return Math.round(ms / DAY) + (Math.round(ms / DAY) === 1 ? " day" : " days");
}
const minutes = (n, per) => { const m = Math.max(1, Math.round(n * per / 60)); return n ? `about ${m} min` : ""; };

// ---------- World ----------
const scopeUnit = () => S.ctopic === "all" ? null : S.ctopic[0] === "u" ? S.ctopic.slice(1) : S.ctopic.split(".")[0];
const worldOf = () => S.sec === "bank" ? "manifest" : ({ 2: "terminal", 3: "board", 4: "chart" })[scopeUnit()] || "port";
function applyWorld() {
  const w = worldOf();
  document.body.dataset.world = w;
  document.body.dataset.sec = S.sec;
  document.body.dataset.view = S.view;
  $("#tab-rwe").hidden = S.sec !== "course" || (w !== "board" && w !== "terminal");
  $("#rweSub").textContent = w === "terminal" ? "The best real-world examples for Unit 2, sold in the terminal's duty free. Browse them by gate, or drill them: Recall is graded and scheduled like your flashcards; Numbers and Pick the example are practice."
    : "The best real-world examples for Unit 3, each one a stock you trade by recalling it. Recall is graded and moves prices; Numbers and Pick the example are practice.";
  document.querySelector('meta[name="theme-color"]').content = w === "board" ? "#000000" : w === "terminal" ? "#16363F" : w === "chart" ? "#1F2C38" : getComputedStyle(document.documentElement).getPropertyValue("--bar").trim() || "#1C2126";
  renderTicker();
}

// ---------- Small renderers ----------
const ARROW = `<svg class="arr" viewBox="0 0 22 12" aria-hidden="true"><path d="M1 6h17M14 1.5 19 6l-5 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>`;
const TRI = up => `<svg viewBox="0 0 10 10" aria-hidden="true"><path d="${up ? "M5 1 9.5 9h-9z" : "M5 9 .5 1h9z"}"/></svg>`;
const fmt = p => p.toFixed(2);
function chgHTML(v, cls = "") {
  if (v == null) return `<span class="chg ipo ${cls}">IPO</span>`;
  if (Math.abs(v) < .005) return `<span class="chg flat ${cls}">0.00</span>`;
  return `<span class="chg ${v > 0 ? "up" : "dn"} ${cls}">${TRI(v > 0)}${v > 0 ? "+" : "−"}${fmt(Math.abs(v))}</span>`;
}
const hlMark = on => on ? `<span class="hl" title="Higher level only">HL</span>` : "";
const tierBox = e => `<span class="tierbox tier-${e.tier}" title="Exam value ${e.score} out of 100">${e.tier}</span>`;
const stateTag = id => { const st = stateOf(id); return `<span class="state ${st}">${stateLabel[st]}</span>`; };
function highlightNums(s) {
  return esc(s).replace(/(?:US)?[$€£¥₦₵₹]?\d[\d,]*(?:\.\d+)?(?:\s?(?:%|bn|billion|tn|trillion|million|pp))?/g, m => `<span class="num-hl">${m}</span>`);
}
function sourceLinks(e) {
  return (e.sources || []).filter(u => /^https?:\/\//.test(u)).map(u => {
    let host = u; try { host = new URL(u).hostname.replace(/^www\./, ""); } catch {}
    return `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(host)}</a>`;
  }).join("");
}
const storyHTML = m => `<p class="story">${m.story.split("→").map(s => `<span>${esc(s.trim())}</span>`).join(ARROW)}</p>`;
const numsHTML = m => `<div class="nums">${m.numbers.map(([n, w]) => `<div><b>${esc(n)}</b><span>${esc(w)}</span></div>`).join("")}</div>`;
const butHTML = m => `<div class="but"><h3>The but</h3><p>${esc(m.but)}</p></div>`;
function rateHTML(r) {
  return `<div class="rate">${["relevance", "evaluation", "data", "recency"].map(k =>
    `<span>${k[0].toUpperCase() + k.slice(1)}</span><span class="track" aria-label="${r[k]} out of 5">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= r[k] ? "on" : ""}"></i>`).join("")}</span><span>${r[k]}</span>`).join("")}</div>`;
}
function factSheet(e) {
  return `<div class="cols">
    <div>
      <h4>In one sentence</h4><p>${esc(e.hook)}</p>
      <h4>Key facts</h4><ul>${(e.facts || []).map(f => `<li>${highlightNums(f)}</li>`).join("")}</ul>
      <h4>Diagram</h4><p>${esc(e.diagram || "None")}</p>
      <h4>Evaluation points</h4><ul>${(e.evaluation || []).map(f => `<li>${esc(f)}</li>`).join("")}</ul>
    </div>
    <div>
      <h4>Verdict</h4><p>${esc(e.verdict)}</p>
      <h4>Concepts</h4><div class="tags">${e.concepts.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</div>
      <h4>Sources</h4><div class="sources">${sourceLinks(e) || "<span class='note'>None listed</span>"}</div>
    </div>
  </div>`;
}
const moreHTML = e => `<details class="more"><summary>Full manifest: facts, diagram, evaluation, sources</summary>${factSheet(e)}</details>`;

// ---------- Header stats ----------
function renderStats() {
  if (S.sec === "course") {
    const ids = [...CDEFS, ...CDIAG].map(x => x.id);
    const due = ids.filter(id => prog(id) && isDue(id)).length;
    const mastered = ids.filter(id => stateOf(id) === "mastered").length;
    $("#stats").innerHTML = worldOf() === "terminal" ? TEUAir.stats() : worldOf() === "chart" ? TEUChart.stats() : `${CDEFS.length} terms · ${CDIAG.length} diagrams · <b>${mastered}</b> mastered · <b>${due}</b> due`;
    const badge = xs => { const n = xs.filter(x => inScope(x) && prog(x.id) && isDue(x.id)).length; return n ? String(n) : ""; };
    $("#cardsBadge").textContent = badge(CDEFS);
    $("#diagBadge").textContent = badge(CDIAG);
    $("#rweBadge").textContent = (worldOf() === "terminal" ? TEUAir.rweDue() : TEUStocks.rweDue()) || "";
    $("#dueBadge").textContent = "";
  } else {
    const loaded = DATA.filter(e => prog(e.id)).length;
    const due = DATA.filter(e => prog(e.id) && isDue(e.id)).length;
    $("#stats").innerHTML = `${DATA.length} containers · <b>${loaded}</b> loaded · <b>${due}</b> due`;
    $("#dueBadge").textContent = due ? String(due) : "";
    $("#cardsBadge").textContent = $("#diagBadge").textContent = $("#rweBadge").textContent = "";
  }
}

// ---------- Ticker (Unit 3) ----------
let tickerKey = "";
function renderTicker() {
  const el = $("#ticker");
  if (worldOf() !== "board") { el.hidden = true; tickerKey = ""; return; }
  el.hidden = false;
  const xs = CDEFS.filter(d => d.unit === "3");
  const listed = xs.filter(d => prog(d.id)).sort((a, b) => Math.abs(dayChg(b.id)) - Math.abs(dayChg(a.id)));
  const rest = xs.filter(d => !prog(d.id));
  const items = [...listed, ...rest].slice(0, 60);
  const key = items.map(d => d.id + (prog(d.id)?.t || "")).join();
  if (key === tickerKey) return;
  tickerKey = key;
  const q = d => { const p = priceOf(d.id), c = dayChg(d.id); return `<span class="q"><b>${esc(d.tk)}</b>${p == null ? `<span class="ipo">IPO</span>` : `<span class="p">${fmt(p)}</span><span class="${c > .004 ? "up" : c < -.004 ? "dn" : "ipo"}">${c > 0 ? "+" : c < 0 ? "−" : ""}${fmt(Math.abs(c))}</span>`}</span>`; };
  const run = items.map(q).join("");
  el.style.setProperty("--tape-s", Math.max(40, items.length * 2.6) + "s");
  el.innerHTML = `<div class="tape" aria-hidden="true">${run}${run}</div><span class="sr-only">Unit 3 ticker: ${listed.length} of ${xs.length} terms listed.</span><button class="tape-btn" id="tickerPause" aria-pressed="false"></button>`;
  paintTape();
}
let tapePaused = !!lsGet(UI_KEY, {}).tapePaused;
function paintTape() {
  const b = $("#tickerPause"); if (!b) return;
  $("#ticker").classList.toggle("paused", tapePaused);
  b.setAttribute("aria-pressed", tapePaused);
  b.setAttribute("aria-label", tapePaused ? "Play the ticker" : "Pause the ticker");
  b.innerHTML = tapePaused ? `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor"/></svg>` : `<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor"/></svg>`;
}
function toggleTape() { tapePaused = !tapePaused; saveUI(); paintTape(); }


// ---------- Rail (course) ----------
const inScope = x => S.ctopic === "all" || (S.ctopic[0] === "u" ? x.unit === S.ctopic.slice(1) : x.n === S.ctopic);
const scopeName = () => S.ctopic === "all" ? "the whole course" : S.ctopic[0] === "u" ? "Unit " + S.ctopic.slice(1) : S.ctopic + " " + CT[S.ctopic].short;
const courseIds = pred => [...CDEFS, ...CDIAG].filter(pred).map(x => x.id);
const masteryOf = ids => ids.length ? ids.filter(id => stateOf(id) === "mastered").length / ids.length : 0;

function renderRail() {
  if (S.sec !== "course") { $("#rail").innerHTML = ""; return; }
  const board = worldOf() === "board", air = worldOf() === "terminal";
  const allIds = courseIds(() => true);
  let html = `<div class="rail-all"><button class="topic" data-ctopic="all" aria-pressed="${S.ctopic === "all"}" style="--uc:var(--ink)"><span class="n">1–4</span><span class="nm">Whole course</span><span class="ct">${allIds.length}</span><span class="meter"><i style="--m:${masteryOf(allIds)}"></i></span></button></div>`;
  for (const u of UNITS) {
    const ts = COURSE.filter(t => t.unit === u.u);
    if (!ts.length) continue;
    html += `<div class="unit-blk" data-u="${u.u}" style="--uc:var(--u${u.u})"><button class="unit-btn" data-ctopic="u${u.u}" aria-pressed="${S.ctopic === "u" + u.u}"><span class="tab">${u.u}</span><span>${esc(u.name)}</span><small>${courseIds(x => x.unit === u.u).length}</small></button>` +
      ts.map(t => {
        const ids = courseIds(x => x.n === t.n);
        let right = `<span class="ct">${ids.length}</span>`;
        if (air && u.u === "2") right = `<span class="ct gate">${TEUAir.gateOf(t.n)}</span>`;
        if (board && u.u === "3") { const xs = CDEFS.filter(d => d.n === t.n), ix = indexAt(xs, now()), chg = ix - indexAt(xs, now() - DAY); right = `<span class="idx${chg < -.004 ? " dn" : chg > .004 ? " up" : ""}">${fmt(ix)}</span>`; }
        return `<button class="topic" data-ctopic="${t.n}" aria-pressed="${S.ctopic === t.n}"><span class="n">${t.n}</span><span class="nm">${esc(t.short)}${hlMark(t.hl)}</span>${right}<span class="meter"><i style="--m:${masteryOf(ids)}"></i></span></button>`;
      }).join("") + `</div>`;
  }
  $("#rail").innerHTML = html;
  const on = $('#rail [aria-pressed="true"]');
  if (on && matchMedia("(max-width: 900px)").matches) $("#rail").scrollLeft = on.offsetLeft - 16;
}

// ---------- Bay plan (bank) ----------
const inTopic = e => S.topic === "all" || e.topics.includes(S.topic);
const pool = () => DATA.filter(inTopic);
let ship = null;
const shipGroups = () => TOPICS.map(t => ({ n: t.n, name: t.short, items: DATA.filter(e => e.topic === t.n).sort((a, b) => a.slot - b.slot)
  .map(e => ({ id: e.id, name: e.bay, tier: e.tier, code: e.code, title: e.title, tag: e.mem.tag, topics: e.topics })) }));
function renderBay() {
  const el = $("#bay");
  if (S.sec !== "bank") { el.hidden = true; return; }
  el.hidden = false;
  if (!el.dataset.built) {
    el.innerHTML = `<div class="bay-head" id="bayHead"></div><div class="ship" id="shipHost"></div><div id="bayCompact"></div>
      <div class="legend" id="shipLegend"><span><i></i>Weathered: not drilled yet</span><span><i class="l"></i>Loaded: learning</span><span><i class="m"></i>Sealed: mastered</span><span><i class="l d"></i>Due for review</span><span><i class="m sw" style="background:var(--rust)"></i>S</span><span><i class="m sw" style="background:var(--cobalt);border-color:var(--cobalt)"></i>A</span><span><i class="m sw" style="background:var(--moss);border-color:var(--moss)"></i>B</span><span><i class="m sw" style="background:var(--stone);border-color:var(--stone)"></i>C tier</span></div>`;
    el.dataset.built = "1";
  }
  const compact = S.view !== "library";
  el.toggleAttribute("data-compact", compact);
  el.toggleAttribute("data-filter", S.topic !== "all");
  const loaded = DATA.filter(e => prog(e.id)).length, due = DATA.filter(e => prog(e.id) && isDue(e.id)).length;
  $("#bayHead").innerHTML = `<h2>Bay plan · Unit 4 · stowed by subtopic, painted by tier</h2><p>${DATA.length} containers · ${loaded} loaded · ${due} due${S.topic !== "all" ? ` · showing bay ${S.topic}` : ""}</p>${S.topic !== "all" ? `<button class="btn" data-topic="all">All bays</button>` : ""}`;
  $("#shipHost").hidden = !window.TEUShip; $("#shipLegend").hidden = compact || !window.TEUShip;
  if (window.TEUShip) {
    $("#bayCompact").innerHTML = "";
    if (!ship) ship = TEUShip.mount($("#shipHost"), {
      groups: shipGroups(),
      onOpen: id => {
        if (S.view === "drill") { drillPin = id; drillFlipped = false; renderDrill(); }
        else if (S.view === "write") { $("#writePick").value = id; renderWriteQ(); renderBay(); }
        else if (S.view === "library") { if (id === S.sel) return; S.sel = id; renderBay(); renderLibrary(); saveUI(); }
        else { S.sel = id; show("library"); }
      },
      onBay: n => setBay(n === S.topic ? "all" : n),
    });
    const states = {};
    for (const e of DATA) { const c = prog(e.id); states[e.id] = { drilled: !!c, mastered: stateOf(e.id) === "mastered", due: !!c && isDue(e.id) }; }
    // the crane holds whatever you're working on: the opened example, the drill card, the number's example, the essay's example
    const focus = { library: S.sel, drill: drillCur, numbers: numQ?.id, match: null, write: $("#writePick").value || null }[S.view] ?? null;
    ship.update({ states, sel: focus, topic: S.topic, compact });
    lastMoved = null;
    return;
  }
  // the thin bar plan in the drill modes, so the work stays in view
  const cols = TOPICS.map(t => DATA.filter(e => e.topic === t.n).sort((a, b) => a.slot - b.slot));
  const stack = Math.max(...cols.map(c => c.length));
  const box = e => {
    const st = stateOf(e.id), cls = `box tier-${e.tier} ${st}${prog(e.id) && isDue(e.id) ? " due" : ""}${lastMoved === e.id && !calm() ? " drop" : ""}`;
    return `<button class="${cls}" data-box="${esc(e.id)}" tabindex="-1" title="${esc(e.code + " · " + e.title + " · tier " + e.tier + " · " + stateLabel[st])}">${esc(e.bay)}</button>`;
  };
  $("#bayCompact").innerHTML = `<div class="plan-scroll"><div class="plan" style="--stack:${stack}">${cols.map((c, i) => `<div class="col" ${S.topic === TOPICS[i].n ? "data-on" : ""}>${c.map(box).join("")}</div>`).join("")}</div>
    <div class="bay-lbls">${TOPICS.map(t => `<button class="bay-lbl" data-topic="${t.n}" aria-pressed="${S.topic === t.n}">${t.n}<small>${esc(t.short)}</small></button>`).join("")}</div></div>`;
  lastMoved = null;
}

// ---------- Library ----------
function renderTierChips() {
  $("#tierChips").innerHTML = ["all", ...TIERS].map(t => `<button class="chip" data-tier="${t}" aria-pressed="${S.tier === t}">${t === "all" ? "All tiers" : "Tier " + t}</button>`).join("");
}
function libraryList() {
  const q = S.q.trim().toLowerCase();
  const xs = pool().filter(e => S.tier === "all" || e.tier === S.tier).filter(e => !q || [e.title, e.code, e.mem.tag, e.mem.story, e.mem.use, e.region, e.years, e.hook, ...e.concepts, ...(e.facts || [])].join(" ").toLowerCase().includes(q));
  const sorters = {
    score: (a, b) => b.score - a.score,
    recent: (a, b) => b.lastYear - a.lastYear || b.score - a.score,
    topic: (a, b) => parseFloat(a.topic.slice(2)) - parseFloat(b.topic.slice(2)) || a.slot - b.slot,
    due: (a, b) => ((prog(a.id)?.box ?? -1) - (prog(b.id)?.box ?? -1)) || b.score - a.score,
  };
  return xs.sort(sorters[S.sort]);
}
function manifestHTML(e) {
  return `<article class="man tier-${e.tier}" aria-labelledby="manT">
    <div>
      <div class="man-code">${esc(e.code)}</div>
      <h1 id="manT">${esc(e.title)}</h1>
      <div class="meta"><span>${esc(e.region)}</span><span>${esc(e.years)}</span><span>${esc(e.topics.join(" · "))}</span><span>${tierBox(e)} ${e.score}/100</span>${stateTag(e.id)}</div>
      ${storyHTML(e.mem)}
      <p class="use"><b>Use it for:</b> ${esc(e.mem.use)}</p>
      <div class="acts"><button class="btn primary" data-drillone="${esc(e.id)}">Drill this container</button><button class="btn" data-writeone="${esc(e.id)}">Practise writing with it</button></div>
    </div>
    <div>${numsHTML(e.mem)}${butHTML(e.mem)}${rateHTML(e.rating)}</div>
    <div class="man-full">${moreHTML(e)}</div>
  </article>`;
}
function renderLibrary() {
  const xs = libraryList();
  ensureSel();
  const keepOpen = $("#manifest details.more")?.open && $("#manifest article")?.dataset.id === S.sel;
  $("#manifest").innerHTML = S.sel ? manifestHTML(BY_ID[S.sel]) : `<div class="empty">No containers in this bay.</div>`;
  if (S.sel) { $("#manifest article").dataset.id = S.sel; if (keepOpen) $("#manifest details.more").open = true; }
  $("#cards").innerHTML = xs.length ? `<table class="tbl mlist"><thead><tr><th>Code</th><th>Example</th><th class="hide-s">Region</th><th class="hide-s">Years</th><th>Tier</th><th>Status</th></tr></thead><tbody>${xs.map(e =>
    `<tr class="tier-${e.tier}" data-sel="${esc(e.id)}" aria-selected="${S.sel === e.id}"><td class="code">${esc(e.code)}</td><td><button class="t" data-sel="${esc(e.id)}">${esc(e.title)}</button><div class="sub2">${esc(e.mem.use)}</div></td><td class="hide-s sub2">${esc(e.region)}</td><td class="hide-s">${esc(e.years)}</td><td>${tierBox(e)}</td><td>${stateTag(e.id)}</td></tr>`).join("")}</tbody></table>`
    : `<div class="empty">No examples match. Clear the search or pick another tier.</div>`;
}

// ---------- Drill ----------
let drillCur = null, drillFlipped = false, drillDone = 0, drillPin = null;
function drillQueue() {
  const xs = pool();
  const all = $("#drillAll").checked;
  const due = xs.filter(e => prog(e.id) && isDue(e.id)).sort((a, b) => prog(a.id).due - prog(b.id).due);
  const fresh = xs.filter(e => !prog(e.id)).sort((a, b) => b.score - a.score);
  const later = all ? xs.filter(e => prog(e.id) && !isDue(e.id)).sort((a, b) => prog(a.id).due - prog(b.id).due) : [];
  return [...due, ...fresh, ...later];
}
function gradeRow(attr, id) {
  // Units 2 and 4 name each outcome in their own world too (missed the flight; ran aground)
  const w = worldOf() === "terminal" ? TEUAir.GRADE_WORDS : worldOf() === "chart" ? TEUChart.GRADE_WORDS : null, lbl = g => (w ? w[g] + " · " : "") + previewInterval(id, g);
  return `<div class="grades">
    <button class="btn g-again" ${attr}="again">Forgot<small>${lbl("again")}</small></button>
    <button class="btn" ${attr}="hard">Shaky<small>${lbl("hard")}</small></button>
    <button class="btn" ${attr}="good">Got it<small>${lbl("good")}</small></button>
    <button class="btn g-easy" ${attr}="easy">Easy<small>${lbl("easy")}</small></button>
  </div><p class="keys">Keys <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd><kbd>4</kbd></p>`;
}
const flipButton = attr => `<div><button class="btn primary" ${attr}>Show answer <kbd>Space</kbd></button></div>`;
function renderDrill() {
  const q = drillQueue();
  const xs = pool();
  const n = xs.filter(e => isDue(e.id)).length;
  $("#drillInfo").textContent = `${n} due or new in ${S.topic === "all" ? "the whole bank" : "bay " + S.topic + " " + TOPIC[S.topic].short}${n ? ", " + minutes(n, 40) : ""}${drillDone ? ` · ${drillDone} reviewed this session` : ""}`;
  if (drillPin && BY_ID[drillPin]) { drillCur = drillPin; }
  else if (!drillCur || !q.find(e => e.id === drillCur)) { drillCur = q[0]?.id || null; drillFlipped = false; }
  if (!drillCur) {
    const next = xs.map(e => prog(e.id)?.due).filter(Boolean).sort((a, b) => a - b)[0];
    $("#drill").innerHTML = `<div class="empty">All caught up in this bay.${next ? ` The next container is due ${new Date(next).toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })}.` : ""} Tick “Include examples that aren't due” to keep going, or pick another bay.</div>`;
    shipSync(); return;
  }
  const e = BY_ID[drillCur];
  $("#drill").innerHTML = `<div class="flash tier-${e.tier}${drillFlipped ? " wide" : ""}">
    <div class="head"><span class="man-code">${esc(e.code)}</span>${tierBox(e)}<span>${esc(e.topics.join(" · "))} · ${esc(e.region)} · ${esc(e.years)}</span>${stateTag(e.id)}</div>
    <h2 class="title">${esc(e.mem.tag)}</h2>
    <p class="note">${esc(e.title)}</p>
    ${drillFlipped ? `<div class="ans"><div>${storyHTML(e.mem)}<p class="use"><b>Use it for:</b> ${esc(e.mem.use)}</p></div><div>${numsHTML(e.mem)}${butHTML(e.mem)}</div></div>${gradeRow("data-grade", e.id)}${moreHTML(e)}`
      : `<p class="prompt">Before you flip, say out loud: <b>the story</b>, <b>the three numbers</b> and <b>the “but”</b>. Use it for: ${esc(e.mem.use)}.</p>${flipButton('id="flipBtn"')}`}
  </div>`;
  shipSync();
}
const shipSync = () => { if (ship && S.sec === "bank") renderBay(); };
function doGrade(g) {
  grade(drillCur, g); drillDone++; drillPin = null;
  say(`Graded ${g}.`);
  const q = drillQueue().filter(e => e.id !== drillCur);
  drillCur = q[0]?.id || null; drillFlipped = false;
  renderStats(); renderBay(); renderDrill();
}

// ---------- Number recall ----------
let numQ = null;
function newNumQ() {
  const cands = [];
  for (const e of pool()) e.mem.numbers.forEach(([n, w]) => cands.push({ id: e.id, n, w }));
  if (!cands.length) { numQ = null; return; }
  let c = cands[rand(cands.length)];
  if (numQ && cands.length > 1) while (c.n === numQ.n && c.id === numQ.id) c = cands[rand(cands.length)];
  numQ = { ...c, answered: false, ok: false, given: "" };
}
const toNum = s => { const m = String(s).replace(/,/g, "").replace(/−/g, "-").match(/-?\d+(?:\.\d+)?/); return m ? parseFloat(m[0]) : NaN; };
function renderNumbers() {
  if (!numQ || !BY_ID[numQ.id] || !inTopic(BY_ID[numQ.id])) newNumQ();
  if (!numQ) { $("#numbers").innerHTML = `<div class="empty">No examples in this bay yet.</div>`; shipSync(); return; }
  const e = BY_ID[numQ.id];
  const blank = numQ.answered ? `<span class="num-hl">${esc(numQ.n)}</span>` : `<input id="numIn" inputmode="decimal" autocomplete="off" aria-label="The number">`;
  $("#numbers").innerHTML = `<div class="flash tier-${e.tier}">
    <div class="head"><span class="man-code">${esc(e.code)}</span>${tierBox(e)}<b style="color:var(--ink)">${esc(e.mem.tag)}</b><span>${esc(e.title)}</span></div>
    <div class="cloze">${blank} <span>${esc(numQ.w)}</span></div>
    ${numQ.answered ? `<div class="feedback ${numQ.ok ? "ok" : "no"}"><b>${numQ.ok ? "Correct." : `Not quite. You wrote ${esc(numQ.given || "nothing")}.`}</b><p class="detail">The answer is ${esc(numQ.n)}. The story: ${esc(e.mem.story.replace(/→/g, ">"))}</p></div>
      <div><button class="btn primary" id="numNext">Next number <kbd>Enter</kbd></button></div>`
    : `<div class="toolbar"><button class="btn primary" id="numCheck">Check <kbd>Enter</kbd></button><button class="btn" id="numSkip">Reveal</button></div>`}
    <p class="score-line">${P.numbers.right} of ${P.numbers.total} correct overall</p>
  </div>`;
  if (!numQ.answered) setTimeout(() => $("#numIn")?.focus({ preventScroll: true }), 0);
  shipSync();
}
function checkNum(reveal) {
  const v = reveal ? "" : ($("#numIn")?.value || "").trim();
  const a = Math.abs(toNum(v)), b = Math.abs(toNum(numQ.n));
  numQ.ok = !reveal && !isNaN(a) && (a === b || Math.abs(a - b) <= b * .01);
  numQ.answered = true; numQ.given = v;
  P.numbers.total++; if (numQ.ok) P.numbers.right++;
  persist();
  say(numQ.ok ? "Correct." : "Not quite. The answer is " + numQ.n);
  renderNumbers();
  setTimeout(() => $("#numNext")?.focus({ preventScroll: true }), 0);
}

// ---------- Pick the example ----------
let mQ = null;
const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
function newMatchQ() {
  const xs = pool().filter(e => e.concepts.length);
  if (!xs.length) { mQ = null; return; }
  for (let tries = 0; tries < 30; tries++) {
    const t = xs[rand(xs.length)];
    const c = t.concepts[rand(t.concepts.length)];
    const nc = norm(c);
    const dis = shuffle(DATA.filter(e => e.id !== t.id && !e.topics.some(x => t.topics.includes(x)) && !e.concepts.some(k => { const nk = norm(k); return nk.includes(nc) || nc.includes(nk); })));
    if (dis.length >= 3) { mQ = { id: t.id, concept: c, opts: shuffle([t, ...dis.slice(0, 3)]).map(e => e.id), pick: null }; return; }
  }
  mQ = null;
}
function renderMatch() {
  if (!mQ || !inTopic(BY_ID[mQ.id])) newMatchQ();
  if (!mQ) { $("#match").innerHTML = `<div class="empty">Not enough examples to build a question here. Try all bays.</div>`; return; }
  const t = BY_ID[mQ.id];
  $("#match").innerHTML = `<div class="quiz">
    <p class="question">You need an example of <b>${esc(mQ.concept)}</b> (${esc(t.topics.join(" · "))}). Which case fits best?</p>
    <div class="options">${mQ.opts.map((id, i) => { const e = BY_ID[id]; const cls = mQ.pick ? (id === mQ.id ? "right" : id === mQ.pick ? "wrong" : "") : "";
      return `<button class="opt ${cls}" data-opt="${esc(id)}" ${mQ.pick ? "disabled" : ""}><span class="k">${i + 1}</span><b>${esc(e.mem.tag)}</b><span class="meta">${esc(e.title)}</span></button>`; }).join("")}</div>
    ${mQ.pick ? `<div class="feedback ${mQ.pick === mQ.id ? "ok" : "no"}"><b>${mQ.pick === mQ.id ? "Right." : "Not this time."}</b><p class="detail">${esc(t.mem.tag)}: ${esc(t.mem.story.replace(/→/g, ">"))}</p></div>
      <div><button class="btn primary" id="matchNext">Next question <kbd>Enter</kbd></button></div>` : `<p class="keys">Keys <kbd>1</kbd> to <kbd>4</kbd></p>`}
    <p class="score-line">${P.match.right} of ${P.match.total} correct overall</p>
  </div>`;
}
function pickMatch(id) {
  if (!mQ || mQ.pick) return;
  mQ.pick = id; P.match.total++; if (id === mQ.id) P.match.right++;
  persist(); say(id === mQ.id ? "Right." : "Not this time."); renderMatch();
  setTimeout(() => $("#matchNext")?.focus({ preventScroll: true }), 0);
}

// ---------- Write & check (offline) ----------
const BANDS = [
  ["0", "Nothing relevant to the question."],
  ["1–3", "Little understanding. Few or wrong terms. The example is missing or only named."],
  ["4–6", "Some understanding and some correct terms. The example is described rather than linked to the theory. Little or no evaluation."],
  ["7–9", "Mostly relevant theory with mostly correct terms. The example supports the points. Evaluation is there but one-sided or unsupported."],
  ["10–12", "Relevant theory explained with correct terms. The example is applied well. Evaluation weighs both sides, but the judgement isn't fully supported."],
  ["13–15", "Precise theory and terms throughout. The example is applied with accurate data. Balanced evaluation leads to a supported judgement."],
];
let drafts = lsGet(DRAFT_KEY, {}), draftT = null, lastCheck = null;
function renderWritePick() {
  const sel = $("#writePick");
  const keep = sel.value;
  sel.innerHTML = TOPICS.map(t => { const xs = DATA.filter(e => e.topic === t.n).sort((a, b) => a.slot - b.slot); return xs.length ? `<optgroup label="${t.n} ${esc(t.name)}">${xs.map(e => `<option value="${esc(e.id)}">${esc(e.title)} (tier ${e.tier})</option>`).join("")}</optgroup>` : ""; }).join("");
  const want = S.writeId || keep;
  const first = pool().sort((a, b) => b.score - a.score)[0];
  sel.value = want && BY_ID[want] ? want : first?.id || DATA[0].id;
  S.writeId = null;
  renderWriteQ();
}
function renderWriteQ() {
  const e = BY_ID[$("#writePick").value];
  if (!e) return;
  $("#writeQ").textContent = TOPIC[e.topic]?.q || "";
  $("#peekBody").innerHTML = `<div class="tier-${e.tier}">${storyHTML(e.mem)}${numsHTML(e.mem)}${butHTML(e.mem)}${factSheet(e)}</div>`;
  $("#essay").value = drafts[e.id] || "";
  updateWords();
  lastCheck = null;
  renderCheck();
  shipSync();
}
const wordsIn = s => s.trim().split(/\s+/).filter(Boolean).length;
function updateWords() { $("#wordCount").textContent = wordsIn($("#essay").value) + " words"; }

function checkParagraph(e, text) {
  const low = " " + text.toLowerCase().replace(/[’']/g, "'") + " ";
  const has = re => re.test(low);
  const out = [];
  // 1. A defined key term from the course notes for this subtopic
  const terms = CDEFS.filter(d => e.topics.includes(d.n)).map(d => d.t.replace(/\s*\(.*?\)/g, "").trim());
  const used = [...new Set(terms.filter(t => low.includes(t.toLowerCase())))];
  const defPhr = has(/\b(is|are) (defined as|when|a |an |the )|\brefers? to\b|\bmeans\b|\bis known as\b/);
  out.push(defPhr
    ? { s: "ok", h: "Key term defined", p: used.length ? `You define a term and use <q>${esc(used[0])}</q>. Check the wording against the flashcard.` : `You define a term. The notes for ${esc(e.topics.join(", "))} also define ${terms.slice(0, 3).map(t => `<q>${esc(t)}</q>`).join(", ")}.` }
    : used.length ? { s: "part", h: "Key term used but not defined", p: `You use <q>${esc(used[0])}</q>. Open with a precise definition: examiners give marks for the wording.` }
    : { s: "miss", h: "No defined key term", p: `Start with a definition. Terms from ${esc(e.topics.join(", "))}: ${terms.slice(0, 4).map(t => `<q>${esc(t)}</q>`).join(", ") || "see the course notes"}.` });
  // 2. Names the case
  const names = [...new Set((e.region + " " + e.title).match(/\b[A-Z][a-zé]{2,}\b/g) || [])].filter(w => !/^(The|And|Global|Africa's|Europe's)$/.test(w));
  const named = names.filter(w => low.includes(w.toLowerCase()));
  out.push(named.length ? { s: "ok", h: "Example named", p: `You name ${named.slice(0, 3).map(w => `<q>${esc(w)}</q>`).join(", ")}.` }
    : { s: "miss", h: "Example not named", p: `Say who and when: ${esc(e.region)}, ${esc(e.years)}.` });
  // 3. The three key numbers
  const textNums = (text.replace(/,/g, "").replace(/−/g, "-").match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  const hit = e.mem.numbers.filter(([n]) => { const b = Math.abs(toNum(n)); return textNums.some(a => Math.abs(Math.abs(a) - b) <= Math.max(b * .01, .001)); });
  const miss = e.mem.numbers.filter(x => !hit.includes(x));
  out.push({ s: hit.length >= 2 ? "ok" : hit.length ? "part" : "miss", h: `${hit.length} of 3 key numbers`,
    p: hit.length === 3 ? "All three numbers are there. Make sure each one supports a point." : `Missing: ${miss.map(([n, w]) => `${esc(n)} (${esc(w)})`).join("; ")}.` });
  // 4. Diagram
  out.push(has(/diagram|curve|shift|equilibrium|axis|figure \d/) ? { s: "ok", h: "Diagram referred to", p: "You point to a diagram. In the exam, draw it fully labelled." }
    : { s: "miss", h: "No diagram", p: `Refer to the diagram you'd draw: ${esc(e.diagram || "the relevant one from the notes")}.` });
  // 5. Stakeholders
  const SH = ["consumer", "producer", "firm", "worker", "government", "household", "exporter", "importer", "taxpayer", "farmer", "manufacturer", "employ", "citizen", "poor", "investor"];
  const sh = SH.filter(w => low.includes(w));
  out.push({ s: sh.length >= 2 ? "ok" : sh.length ? "part" : "miss", h: "Stakeholders", p: sh.length >= 2 ? `You consider ${sh.length} groups. Say who gains and who loses.` : "Weigh up at least two groups: who gains, who loses?" });
  // 6. Time frame
  out.push(has(/short[- ](run|term)|long[- ](run|term)|over time|in the future|eventually/) ? { s: "ok", h: "Short run vs long run", p: "You separate time frames." }
    : { s: "miss", h: "No time frame", p: "Add a short run vs long run contrast: effects often reverse over time." });
  // 7. Counter-argument
  out.push(has(/\bhowever\b|on the other hand|\balthough\b|\bwhereas\b|\bnevertheless\b|\bdespite\b|\bbut\b/) ? { s: "ok", h: "Counter-argument", p: "You weigh the other side." }
    : { s: "miss", h: "No counter-argument", p: `Use the but: ${esc(e.mem.but)}` });
  // 8. Judgement at the end
  const tail = low.split(/[.!?]\s/).slice(-2).join(" ");
  out.push(/overall|on balance|therefore|in conclusion|to a (large|great|limited|small|significant) extent|ultimately|\bthus\b|depends (on|upon)/.test(tail) ? { s: "ok", h: "Final judgement", p: "You end with a judgement. Check it follows from your evaluation." }
    : { s: "miss", h: "No final judgement", p: "Finish with a supported judgement: “On balance… because…”." });
  const W = { ok: 1, part: .5, miss: 0 };
  const words = wordsIn(text);
  let r = out.reduce((a, c) => a + W[c.s], 0) / out.length;
  if (words < 120) r = Math.min(r, .45);
  const hint = r < .15 ? "1–3" : r < .35 ? "4–6" : r < .6 ? "7–9" : r < .85 ? "10–12" : "13–15";
  return { out, hint, words };
}
function renderCheck() {
  const box = $("#checkOut");
  if (!lastCheck) { box.innerHTML = ""; return; }
  const { out, hint, words, id } = lastCheck;
  const hist = P.writes.filter(w => w.id === id).slice(-5);
  box.innerHTML = `<h2 class="sec-h" style="margin:8px 0 6px">What the checker found in ${words} words</h2>
    <div class="checks">${out.map(c => `<div class="check ${c.s}"><span class="st">${{ ok: "Found", part: "Partly", miss: "Missing" }[c.s]}</span><div><h3>${c.h}</h3><p>${c.p}</p></div></div>`).join("")}</div>
    <p class="note" style="margin-top:10px">The checker looks for the parts examiners reward; it can't judge whether your economics is right. Read your paragraph against the descriptors and pick the band it earns. Descriptors are paraphrased from the Paper 1 (b) markbands, so check your class copy.</p>
    <div class="bands" role="group" aria-label="Pick your markband">${BANDS.map(([b, d]) => `<button class="band" data-band="${b}" ${b === hint ? "data-hint" : ""} aria-pressed="${lastCheck.band === b}"><b>${b}</b><span>${d}</span></button>`).join("")}</div>
    ${hist.length ? `<p class="history">Your bands for this example: ${hist.map(w => `${esc(w.band)} (${new Date(w.t).toLocaleDateString([], { day: "numeric", month: "short" })})`).join(", ")}</p>` : ""}`;
}
function runCheck() {
  const e = BY_ID[$("#writePick").value];
  const text = $("#essay").value;
  if (wordsIn(text) < 25) { $("#draftNote").textContent = "Write at least 25 words so there's something to check."; return; }
  $("#draftNote").textContent = "";
  lastCheck = { ...checkParagraph(e, text), id: e.id, band: null };
  renderCheck();
  $("#checkOut").scrollIntoView({ behavior: calm() ? "auto" : "smooth", block: "start" });
}

// ---------- Course notes ----------
function evidenceFor(t) {
  const xs = DATA.filter(e => e.topics.includes(t.n)).sort((a, b) => b.score - a.score);
  if (!xs.length) return "";
  return `<section class="evid note-sec"><h2>Evidence for ${t.n} in the bank</h2><div class="row">${xs.map(e => `<button class="box tier-${e.tier} mastered" data-goto="${esc(e.id)}" data-gototopic="${t.n}" title="${esc(e.code + " · " + e.title)}">${esc(e.mem.tag)}</button>`).join("")}</div></section>`;
}
function diagramFig(g) {
  return `<figure class="dfig">${g.spec ? drawDiagram(g.spec) : ""}
    <figcaption><b>${esc(g.name)}${hlMark(g.hl)}</b><span>${esc(g.shows || "")}</span></figcaption>
    ${g.steps?.length ? `<details ${g.spec ? "" : "open"}><summary>How to draw it</summary><ol>${g.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></details>` : ""}
  </figure>`;
}
function topicArticle(t) {
  const list = (xs, cls = "") => `<ul class="${cls}">${xs.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const sec = (title, body) => `<section class="note-sec"><h2>${title}</h2>${body}</section>`;
  const i = COURSE.indexOf(t), prev = COURSE[i - 1], next = COURSE[i + 1];
  const defs = `<dl class="defs">${t.defs.map(d => `<div><dt>${esc(d.t)}${hlMark(d.hl && !t.hl)}</dt><dd>${esc(d.d)}</dd></div>`).join("")}</dl>`;
  return `<article>
    <p class="big-idea">${esc(t.big)}</p>
    ${t.defs.length ? sec("Definitions to learn", defs) : ""}
    ${t.points.length ? sec("Key ideas", list(t.points)) : ""}
    ${t.diagrams.length ? sec("Diagrams", `<div class="dgrid">${t.diagrams.map(g => diagramFig({ ...g, hl: g.hl && !t.hl })).join("")}</div>`) : ""}
    ${t.formulas.length ? sec("Formulas and calculations", `<table class="ftable">${t.formulas.map(f => `<tr><td style="width:34%"><b>${esc(f.name)}</b>${hlMark(f.hl && !t.hl)}</td><td><span class="f">${esc(f.f)}</span>${f.note ? `<p class="note" style="margin-top:4px">${esc(f.note)}</p>` : ""}</td></tr>`).join("")}</table>`) : ""}
    ${t.mnemonics.length ? sec("Memory aids", `<div class="mnem">${t.mnemonics.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`) : ""}
    ${t.eval.length ? sec("Evaluate with", list(t.eval)) : ""}
    ${t.traps.length ? sec("Exam traps", list(t.traps, "traps")) : ""}
    ${t.unit === "4" ? evidenceFor(t) : ""}
    <div class="pager">${prev ? `<button class="btn" data-ctopic="${prev.n}">Back: ${prev.n} ${esc(prev.short)}</button>` : "<span></span>"}${next ? `<button class="btn" data-ctopic="${next.n}">Next: ${next.n} ${esc(next.short)}</button>` : ""}</div>
  </article>`;
}
function topicIndex() {
  let html = "";
  for (const u of UNITS) {
    const ts = COURSE.filter(t => t.unit === u.u && inScope(t));
    if (!ts.length) continue;
    html += `<h2 class="unit-h" style="--uc:var(--u${u.u})"><span class="tab">${u.u}</span>${esc(u.name)}</h2>`;
    html += `<table class="tbl tidx"><thead><tr><th>No.</th><th>Subtopic</th><th class="n">Terms</th><th class="n">Diagrams</th><th>Mastered</th></tr></thead><tbody>` + ts.map(t => {
      const ids = courseIds(x => x.n === t.n);
      const right = `<td style="--uc:var(--u${u.u})"><span class="mbar"><i style="--m:${masteryOf(ids)}"></i></span></td>`;
      return `<tr data-row="${t.n}"><td>${t.n}${hlMark(t.hl)}</td><td><button class="nm" data-ctopic="${t.n}" style="background:none;border:0;padding:0;text-align:left">${esc(t.name)}</button><div class="bi">${esc(t.big)}</div></td><td class="n">${t.defs.length}</td><td class="n">${t.diagrams.length}</td>${right}</tr>`;
    }).join("") + `</tbody></table>`;
  }
  return html || `<div class="empty">No notes here yet.</div>`;
}
function searchHits(q) {
  const qe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(qe, "i");
  const mk = s => esc(s).replace(new RegExp("(" + esc(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
  const hits = [];
  for (const t of COURSE) {
    for (const d of t.defs) if (re.test(d.t + " " + d.d)) hits.push({ t, kind: "Definition", html: `<b>${mk(d.t)}</b>: ${mk(d.d)}` });
    for (const k of ["points", "eval", "traps"]) for (const x of t[k]) if (re.test(x)) hits.push({ t, kind: { points: "Key idea", eval: "Evaluation", traps: "Exam trap" }[k], html: mk(x) });
    for (const g of t.diagrams) if (re.test(g.name + " " + (g.shows || ""))) hits.push({ t, kind: "Diagram", html: `<b>${mk(g.name)}</b>: ${mk(g.shows || "")}` });
    for (const f of t.formulas) if (re.test(f.name + " " + f.f)) hits.push({ t, kind: "Formula", html: `<b>${mk(f.name)}</b>: ${mk(f.f)}` });
  }
  if (!hits.length) return `<div class="empty">Nothing in the course notes matches “${esc(q)}”. Try a shorter word.</div>`;
  return `<p class="note" style="margin-bottom:6px">${hits.length} match${hits.length === 1 ? "" : "es"} across the course</p>` + hits.slice(0, 120).map(h =>
    `<div class="hit"><span class="where">${h.t.n} ${esc(h.t.name)} · ${h.kind}</span><div>${h.html}</div><button class="btn" data-ctopic="${h.t.n}">Open ${h.t.n}</button></div>`).join("");
}
function renderNotes() {
  if (worldOf() === "board") { TEUStocks.render($("#notes")); return; }
  const t = CT[S.ctopic];
  const u = S.ctopic[0] === "u" ? UNITS.find(x => x.u === S.ctopic.slice(1)) : null;
  $("#notesTitle").innerHTML = t ? `${t.n} ${esc(t.name)}${hlMark(t.hl)}` : u ? `Unit ${u.u}: ${esc(u.name)}` : "Course notes";
  $("#notesSub").textContent = t ? "" : "Pick a subtopic. Each has the definitions to learn word for word, key ideas, every diagram with drawing steps, formulas, evaluation points and exam traps. HL marks Higher Level only content.";
  $("#notesSub").hidden = !!t;
  const q = S.cq.trim();
  if (worldOf() === "terminal" && q.length < 2) { TEUAir.render($("#notes")); return; }
  if (worldOf() === "chart" && q.length < 2) { TEUChart.render($("#notes")); return; }
  $("#notes").innerHTML = q.length > 1 ? searchHits(q) : t ? topicArticle(t) : topicIndex();
}

// ---------- Flashcards and diagram decks ----------
const DECKS = {
  cards: { el: "#cards-deck", info: "#cardsInfo", all: "#cardsAll", items: () => CDEFS, cur: null, flipped: false, done: 0, noun: "cards", per: 15 },
  diagrams: { el: "#diag-deck", info: "#diagInfo", all: "#diagAll", items: () => CDIAG, cur: null, flipped: false, done: 0, noun: "diagrams", per: 60 },
};
function deckQueue(D) {
  const xs = D.items().filter(inScope);
  if (D.redo?.length) return D.redo.map(id => CBY[id]).filter(x => x && inScope(x));
  const due = xs.filter(x => prog(x.id) && isDue(x.id)).sort((a, b) => prog(a.id).due - prog(b.id).due);
  const fresh = xs.filter(x => !prog(x.id));
  const later = $(D.all).checked ? xs.filter(x => prog(x.id) && !isDue(x.id)).sort((a, b) => prog(a.id).due - prog(b.id).due) : [];
  return [...due, ...fresh, ...later];
}
function renderDeck(name) {
  const D = DECKS[name], q = deckQueue(D);
  const xs = D.items().filter(inScope);
  const n = xs.filter(x => isDue(x.id)).length;
  $(D.info).textContent = `${n} due or new in ${scopeName()}${n ? ", " + minutes(n, D.per) : ""}${D.done ? ` · ${D.done} reviewed this session` : ""}`;
  if (!D.cur || !q.find(x => x.id === D.cur)) { D.cur = q[0]?.id || null; D.flipped = false; D.call = 0; }
  const stx = worldOf() === "board" && name === "cards", air = worldOf() === "terminal" && name === "cards", sea = worldOf() === "chart" && name === "cards";
  const trade = stx ? TEUStocks.tradeBar(D) : air ? TEUAir.itinerary() : sea ? TEUChart.strip() : "";
  if (!D.cur) {
    const recap = stx ? TEUStocks.recap(D) : "";
    if (recap) { $(D.el).innerHTML = recap; return; }
    $(D.el).innerHTML = trade + (xs.length ? `<div class="empty">All caught up here. Tick “Include ${D.noun} that aren't due” to keep going, or pick another subtopic.</div>` : `<div class="empty">No ${D.noun} in this subtopic.</div>`);
    return;
  }
  const x = CBY[D.cur], t = CT[x.n];
  const board = worldOf() === "board" && name === "cards" && x.unit === "3";
  const quote = board ? TEUStocks.cardQuote(x, $("#cardsRev").checked && !D.flipped) : "";
  const head = `<div class="head"><span>${x.n} ${esc(t.name)}</span>${hlMark(x.hl)}${stateTag(x.id)}</div>`;
  let body;
  if (name === "cards") {
    const rev = $("#cardsRev").checked;
    const front = rev ? `<p class="def">${esc(x.d)}</p>` : `<h2 class="title">${esc(x.t)}</h2>`;
    body = front + (D.flipped ? (rev ? `<h2 class="title">${esc(x.t)}</h2>` : `<p class="def">${esc(x.d)}</p>`) + (board ? TEUStocks.callTag(D.call) : "") + gradeRow("data-cgrade", x.id)
      : `<p class="prompt">${rev ? "Name the term this defines." : "Say the definition out loud, as close to exam wording as you can."}</p>${board ? TEUStocks.callRow() : flipButton('data-cflip="1"')}`);
  } else {
    body = `<h2 class="title">${esc(x.name)}</h2>${x.shows ? `<p class="note">${esc(x.shows)}</p>` : ""}` + (D.flipped
      ? `${x.spec ? drawDiagram(x.spec) : ""}${x.steps?.length ? `<ol style="margin:0;padding-left:20px;display:grid;gap:3px;max-width:70ch">${x.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}${gradeRow("data-cgrade", x.id)}`
      : `<p class="prompt">Sketch it on paper: label both axes, draw and label every curve, mark the equilibrium and any shift or shaded area.</p>${flipButton('data-cflip="1"')}`);
  }
  $(D.el).innerHTML = air && x.unit === "2" ? TEUAir.pass(x, body, $("#cardsRev").checked && !D.flipped) : sea && x.unit === "4" ? TEUChart.log(x, body) : `${trade}<div class="flash">${head}${quote}${body}</div>`;
}
function deckUndo(name) {
  const D = DECKS[name], u = D.undo; if (!u) return;
  if (u.card) P.cards[u.id] = u.card; else delete P.cards[u.id];
  persist();
  D.sess = u.sess; D.redo = u.redo || null; D.cur = u.id; D.flipped = true; D.call = u.call; D.done = Math.max(0, D.done - 1); D.undo = null;
  say("Last grade undone.");
  renderRail(); renderStats(); renderTicker(); renderDeck(name);
}
function deckGrade(name, g) {
  const D = DECKS[name], id = D.cur, stx = worldOf() === "board" && name === "cards" && CBY[id].unit === "3";
  if (stx && !D.sess) D.sess = TEUStocks.session();
  D.undo = { id, card: P.cards[id] ? JSON.parse(JSON.stringify(P.cards[id])) : null, sess: D.sess ? JSON.parse(JSON.stringify(D.sess)) : null, call: D.call, redo: D.redo?.slice() };
  if (D.redo) { D.redo = D.redo.filter(x => x !== id); if (!D.redo.length) D.redo = null; }
  grade(id, g, stx ? D.call || 0 : 0); D.done++; D.call = 0;
  if (stx) TEUStocks.afterGrade(D, id);
  say(`Graded ${g}.`);
  D.cur = deckQueue(D).filter(x => x.id !== id)[0]?.id || null; D.flipped = false;
  renderRail(); renderStats(); renderTicker(); renderDeck(name);
}

// ---------- Term quiz ----------
let cQ = null;
function maskTerm(d, term) {
  const words = term.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 3);
  let out = esc(d);
  for (const w of words) out = out.replace(new RegExp("\\b(" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\w*)", "ig"), "_____");
  return out;
}
function newQuizQ() {
  const xs = CDEFS.filter(inScope);
  if (xs.length < 2) { cQ = null; return; }
  const target = shuffle(xs).sort((a, b) => (prog(a.id)?.box ?? -1) - (prog(b.id)?.box ?? -1))[rand(Math.min(8, xs.length))];
  const same = d => norm(d.t) === norm(target.t);
  let pool2 = CDEFS.filter(d => d.n === target.n && !same(d));
  if (pool2.length < 3) pool2 = pool2.concat(CDEFS.filter(d => d.unit === target.unit && d.n !== target.n && !same(d)));
  const dis = []; for (const d of shuffle(pool2)) if (dis.length < 3 && !dis.some(e => norm(e.t) === norm(d.t))) dis.push(d);
  cQ = { id: target.id, opts: shuffle([target, ...dis]).map(d => d.id), pick: null };
}
function renderQuiz() {
  if (!cQ || !inScope(CBY[cQ.id])) newQuizQ();
  if (!cQ) { $("#quiz").innerHTML = `<div class="empty">Not enough terms here. Pick a bigger scope.</div>`; return; }
  const x = CBY[cQ.id], t = CT[x.n];
  $("#quiz").innerHTML = `<div class="quiz">
    <p class="note">${x.n} ${esc(t.name)}</p>
    <p class="question">${maskTerm(x.d, x.t)}</p>
    <div class="options">${cQ.opts.map((id, i) => { const o = CBY[id]; const cls = cQ.pick ? (id === cQ.id ? "right" : id === cQ.pick ? "wrong" : "") : "";
      return `<button class="opt ${cls}" data-qopt="${esc(id)}" ${cQ.pick ? "disabled" : ""}><span class="k">${i + 1}</span><b>${esc(o.t)}</b>${cQ.pick && id === cQ.pick && id !== cQ.id ? `<span class="meta">${esc(o.d)}</span>` : ""}</button>`; }).join("")}</div>
    ${cQ.pick ? `<div class="feedback ${cQ.pick === cQ.id ? "ok" : "no"}"><b>${cQ.pick === cQ.id ? "Right." : "Not this time."}</b><p class="detail"><b>${esc(x.t)}</b>: ${esc(x.d)}</p></div>
      <div><button class="btn primary" id="quizNext">Next question <kbd>Enter</kbd></button></div>` : `<p class="keys">Keys <kbd>1</kbd> to <kbd>4</kbd></p>`}
    <p class="score-line">${P.quiz.right} of ${P.quiz.total} correct overall</p>
  </div>`;
}
function pickQuiz(id) {
  if (!cQ || cQ.pick) return;
  cQ.pick = id; P.quiz.total++; if (id === cQ.id) P.quiz.right++;
  persist(); say(id === cQ.id ? "Right." : "Not this time."); renderQuiz();
  setTimeout(() => $("#quizNext")?.focus({ preventScroll: true }), 0);
}

// ---------- Views ----------
const SECTIONS = { course: ["notes", "cards", "diagrams", "quiz", "rwe"], bank: ["library", "drill", "numbers", "match", "write"] };
const VIEWS = [...SECTIONS.course, ...SECTIONS.bank];
function show(v) {
  if (!VIEWS.includes(v)) v = "notes";
  S.view = v;
  S.sec = SECTIONS.course.includes(v) ? "course" : "bank";
  document.querySelectorAll(".sec").forEach(b => b.setAttribute("aria-pressed", b.dataset.sec === S.sec));
  VIEWS.forEach(x => { $("#view-" + x).hidden = x !== v; const tb = $("#tab-" + x); tb.setAttribute("aria-selected", x === v); tb.hidden = !SECTIONS[S.sec].includes(x); });
  try { history.replaceState(null, "", "#/" + v); } catch {}
  renderAll();
}
function renderView() {
  ({ notes: renderNotes, cards: () => renderDeck("cards"), diagrams: () => renderDeck("diagrams"), quiz: renderQuiz, rwe: () => worldOf() === "terminal" ? TEUAir.renderRwe($("#rwe")) : TEUStocks.renderRwe($("#rwe")),
     library: renderLibrary, drill: renderDrill, numbers: renderNumbers, match: renderMatch, write: renderWritePick })[S.view]();
}
function ensureSel() { if (!S.sel || !BY_ID[S.sel] || !inTopic(BY_ID[S.sel])) S.sel = pool().sort((a, b) => b.score - a.score)[0]?.id || null; }
function renderAll() { ensureSel(); applyWorld(); renderRail(); renderBay(); renderStats(); renderView(); saveUI(); }
function setScope(key) {
  S.ctopic = key; DECKS.cards.cur = DECKS.diagrams.cur = null; cQ = null; TEUStocks.resetRwe(); TEUAir.resetRwe(); DECKS.cards.sess = DECKS.cards.redo = DECKS.cards.undo = DECKS.diagrams.undo = null;
  if (S.cq) { S.cq = ""; $("#csearch").value = ""; }
  renderAll();
}
function setBay(n) {
  S.topic = n; drillCur = null; drillPin = null; numQ = null; mQ = null;
  renderAll();
}

// ---------- Progress transfer ----------
const b64 = s => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const unb64 = s => new TextDecoder().decode(Uint8Array.from(atob(s), c => c.charCodeAt(0)));
const exportText = () => "TEU1:" + b64(JSON.stringify(P));
function importText(txt) {
  txt = String(txt || "").trim();
  let data;
  try { data = txt.startsWith("TEU1:") ? JSON.parse(unb64(txt.slice(5))) : JSON.parse(txt); } catch { data = null; }
  if (!data || typeof data.cards !== "object") return false;
  P = mergeProgress(P, data); persist(); renderAll();
  return true;
}
const progressNote = t => { $("#progressNote").textContent = t; };

// ---------- Events ----------
document.addEventListener("click", ev => {
  const t = ev.target.closest("button, tr[data-sel]");
  if (!t) return;
  const d = t.dataset;
  if (d.view) { ev.preventDefault(); show(d.view); }
  else if (d.sec) show(SECTIONS[d.sec][0]);
  else if (d.ctopic) {
    setScope(d.ctopic);
    if (S.view === "notes" && !t.closest("#rail")) window.scrollTo({ top: 0 });
  }
  else if (d.cflip) { DECKS[S.view].flipped = true; renderDeck(S.view); say("Answer shown."); }
  else if (d.call) { const D = DECKS.cards; D.call = +d.call; D.flipped = true; renderDeck("cards"); say("Answer shown."); }
  else if (d.undo) deckUndo(S.view);
  else if (d.redrill) { const D = DECKS.cards; D.redo = D.sess.missed.slice(); D.sess.missed = []; D.cur = null; renderDeck("cards"); }
  else if (t.id === "tickerPause") toggleTape();
  else if (d.cgrade) deckGrade(S.view, d.cgrade);
  else if (d.qopt) pickQuiz(d.qopt);
  else if (t.id === "quizNext") { newQuizQ(); renderQuiz(); }
  else if (d.topic) setBay(d.topic === S.topic && d.topic !== "all" ? "all" : d.topic);
  else if (d.box) { S.sel = d.box; if (S.view !== "library") show("library"); else { renderBay(); renderLibrary(); saveUI(); } }
  else if (d.sel) { S.sel = d.sel; renderBay(); renderLibrary(); saveUI(); $("#bay").scrollIntoView({ behavior: calm() ? "auto" : "smooth" }); }
  else if (d.goto) { S.sel = d.goto; S.topic = d.gototopic || "all"; show("library"); window.scrollTo({ top: 0 }); }
  else if (d.tier) { S.tier = d.tier; renderTierChips(); renderLibrary(); }
  else if (d.drillone) { drillPin = d.drillone; drillFlipped = false; show("drill"); }
  else if (d.writeone) { S.writeId = d.writeone; show("write"); }
  else if (t.id === "flipBtn") { drillFlipped = true; renderDrill(); }
  else if (d.grade) doGrade(d.grade);
  else if (t.id === "numCheck") checkNum(false);
  else if (t.id === "numSkip") checkNum(true);
  else if (t.id === "numNext") { newNumQ(); renderNumbers(); }
  else if (d.opt) pickMatch(d.opt);
  else if (t.id === "matchNext") { newMatchQ(); renderMatch(); }
  else if (t.id === "checkBtn") runCheck();
  else if (d.band && lastCheck) {
    lastCheck.band = d.band;
    P.writes.push({ id: lastCheck.id, band: d.band, words: lastCheck.words, t: now() }); persist();
    renderCheck(); say("Saved band " + d.band);
  }
  else if (t.id === "copyProgress") {
    navigator.clipboard?.writeText(exportText()).then(() => progressNote("Copied. Paste it into TEU on the other computer."), () => { $("#pasteBox").value = exportText(); $("#pasteBox").select(); progressNote("Couldn't reach the clipboard, so the progress is in the box: copy it from there."); });
  }
  else if (t.id === "saveProgress") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(P)], { type: "application/json" }));
    a.download = `teu-progress-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  else if (t.id === "pasteProgress") progressNote(importText($("#pasteBox").value) ? "Added. Anything newer on either computer wins." : "That doesn't look like TEU progress. Copy it again on the other computer.");
});
document.addEventListener("keydown", ev => {
  const tg = ev.target instanceof Element ? ev.target : document.body;
  if (tg.closest("textarea, select, input[type=search], input[type=file], #progressTools") || ev.metaKey || ev.ctrlKey || ev.altKey) return;
  // Space and Enter flip the card unless a control inside the work area has focus
  const free = !tg.closest("main button, main input, main summary, main a");
  const n = "1234".includes(ev.key) && ev.key.length === 1 ? +ev.key - 1 : -1;
  if (S.view === "notes" && worldOf() === "board" && TEUStocks.key(ev)) return;
  if (S.view === "notes" && worldOf() === "terminal" && TEUAir.key(ev)) return;
  if (S.view === "notes" && worldOf() === "chart" && TEUChart.key(ev)) return;
  if (S.view === "rwe") { (worldOf() === "terminal" ? TEUAir : TEUStocks).rweKey(ev, free); return; }
  const D = DECKS[S.view];
  if (D && (ev.key === "u" || ev.key === "U") && D.undo) { deckUndo(S.view); return; }
  if (D && !D.cur && ev.key === "Enter" && free && $("[data-redrill]")) { ev.preventDefault(); $("[data-redrill]").click(); return; }
  if (D && D.cur) {
    const calls = S.view === "cards" && worldOf() === "board" && CBY[D.cur].unit === "3";
    if (!D.flipped && calls && (ev.key === "b" || ev.key === "s" || ev.key === "B" || ev.key === "S")) { D.call = ev.key.toLowerCase() === "b" ? 1 : -1; D.flipped = true; renderDeck("cards"); say("Answer shown."); }
    else if (!D.flipped && (ev.key === " " || ev.key === "Enter") && free) { ev.preventDefault(); D.flipped = true; renderDeck(S.view); say("Answer shown."); }
    else if (D.flipped && n >= 0) deckGrade(S.view, ["again", "hard", "good", "easy"][n]);
    return;
  }
  if (S.view === "quiz" && cQ) {
    if (!cQ.pick && n >= 0) pickQuiz(cQ.opts[n]);
    else if (cQ.pick && ev.key === "Enter") { ev.preventDefault(); newQuizQ(); renderQuiz(); }
  } else if (S.view === "drill" && drillCur) {
    if (!drillFlipped && (ev.key === " " || ev.key === "Enter") && free) { ev.preventDefault(); drillFlipped = true; renderDrill(); }
    else if (drillFlipped && n >= 0) doGrade(["again", "hard", "good", "easy"][n]);
  } else if (S.view === "numbers" && numQ) {
    if (ev.key === "Enter") { ev.preventDefault(); if (numQ.answered) { newNumQ(); renderNumbers(); } else checkNum(false); }
  } else if (S.view === "match" && mQ) {
    if (!mQ.pick && n >= 0) pickMatch(mQ.opts[n]);
    else if (mQ.pick && ev.key === "Enter") { ev.preventDefault(); newMatchQ(); renderMatch(); }
  }
});
$("#search").addEventListener("input", ev => { S.q = ev.target.value; renderLibrary(); });
$("#csearch").addEventListener("input", ev => { S.cq = ev.target.value; renderNotes(); });
$("#cardsRev").addEventListener("change", () => { DECKS.cards.flipped = false; renderDeck("cards"); });
$("#cardsAll").addEventListener("change", () => { DECKS.cards.cur = null; renderDeck("cards"); });
$("#diagAll").addEventListener("change", () => { DECKS.diagrams.cur = null; renderDeck("diagrams"); });
$("#sort").addEventListener("change", ev => { S.sort = ev.target.value; renderLibrary(); });
$("#drillAll").addEventListener("change", () => { drillCur = null; renderDrill(); });
$("#writePick").addEventListener("change", renderWriteQ);
$("#essay").addEventListener("input", ev => {
  updateWords();
  clearTimeout(draftT);
  draftT = setTimeout(() => { drafts[$("#writePick").value] = ev.target.value; lsSet(DRAFT_KEY, drafts); $("#draftNote").textContent = "Draft saved in this browser."; }, 600);
});
$("#loadProgress").addEventListener("change", ev => {
  const f = ev.target.files?.[0]; if (!f) return;
  f.text().then(txt => progressNote(importText(txt) ? "Loaded and added to your progress." : "That file isn't TEU progress."));
  ev.target.value = "";
});
window.addEventListener("hashchange", () => { const v = location.hash.replace(/^#\/?/, ""); if (VIEWS.includes(v) && v !== S.view) show(v); });
window.addEventListener("storage", ev => { if (ev.key === LS_KEY) { const v = lsGet(LS_KEY, null); if (v?.cards) { P = mergeProgress(P, v); renderAll(); } } });

// ---------- Boot ----------
{ const local = lsGet(LS_KEY, null); if (local && local.cards) P = mergeProgress(P, local); }
P.writes = P.writes || [];
P.rec = P.rec || {};
TEUStocks.check(true);
renderTierChips();
show((location.hash || "").replace(/^#\/?/, "") || "notes");
if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register("sw.js").catch(() => {});
