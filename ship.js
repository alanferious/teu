// TEU bay plan: the Unit 4 examples stowed as 40 ft containers on a feeder ship at the quay.
// Drawn in side elevation at true scale (6.56 px per metre): flat paint, one-pixel ink outlines.
// The scene is built once and kept; update() repaints states and moves the crane to the opened box.
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const PAINT = { S: "#A9442E", A: "#1F4E79", B: "#3F6B47", C: "#6F695F" };
  const INK = "#1C2126", GALV = "#C9CDC9", GALV2 = "#9AA09C", WHITE = "#EEEFEC", HULL = "#2B3338";
  const EIO = "cubic-bezier(0.77, 0, 0.175, 1)", EO = "cubic-bezier(0.23, 1, 0.32, 1)";
  const W = 1400, H = 556;
  const WL = 400, QUAY = 374, DECK = 361, BASE = 348;
  const STERN = 34, FCLE = 1272, STEM = 1368, X0 = 207, GAP = 9, TG = 1, MAXTIER = 5;
  const LEG = 66, LW = 13, PORTAL = 196, BOOMB = 79, BOOMT = 53, ROPE0 = BOOMB + 11;
  const VIEW = { full: { y: 0, h: H, up: 170, lbl: WL + 84 }, compact: { y: 226, h: 256, up: 228, lbl: WL + 52 } };

  function mount(host, { groups, onOpen, onBay }) {
    const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
    // a subtopic with more than five examples takes two bays, so no stack rises above five tiers
    const bays = [];
    groups.forEach((g, gi) => {
      const n = g.items.length, parts = n > MAXTIER ? 2 : 1, first = Math.ceil(n / parts);
      for (let p = 0; p < parts; p++) bays.push({ g: gi, items: g.items.slice(p * first, (p + 1) * first) });
    });
    const NB = bays.length;
    const BW = Math.min(96, (FCLE - 6 - X0 - (NB - 1) * GAP) / NB), CH = Math.round(BW * 0.2375);
    const bayX = i => X0 + i * (BW + GAP);
    const slotY = k => BASE - (k + 1) * (CH + TG) + TG;

    host.innerHTML = `<div class="ship-scroll"><div class="ship-stage"><svg class="ship-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bay plan: the Unit 4 examples stowed as containers on a ship, one bay per subtopic"></svg><div class="ship-lbls"></div></div></div>`;
    const s = host.querySelector("svg"), lbls = host.querySelector(".ship-lbls"), scroller = host.querySelector(".ship-scroll");
    const setPaint = (el, k, v) => { if (v == null) return; if (String(v).startsWith("var(")) el.style[k] = v; else el.setAttribute(k, v); };
    const E = (tag, a, p = s) => { const e = document.createElementNS(NS, tag); for (const k in a) (k === "fill" || k === "stroke") ? setPaint(e, k, a[k]) : e.setAttribute(k, a[k]); p.appendChild(e); return e; };
    const T = (x, y, str, cls, p = s, a = {}) => { const e = E("text", { x, y, class: cls, ...a }, p); e.textContent = str; return e; };
    const R = (x, y, w, h, fill, p = s, extra = {}) => E("rect", { x, y, width: w, height: h, fill, class: "o", ...extra }, p);
    const P = (d, fill, p = s, extra = {}) => E("path", { d, fill, class: "o", ...extra }, p);
    const L = (d, w = 1, col = INK, p = s) => E("path", { d, fill: "none", stroke: col, "stroke-width": w }, p);
    const at = (el, x, y) => { el.style.transform = `translate(${x}px, ${y}px)`; };
    let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    const loops = [];  // idle animations, so they can stop under reduced motion
    const loop = (el, frames, opts) => { if (!el.animate) return; const a = el.animate(frames, { iterations: Infinity, ...opts }); loops.push(a); if (reduce()) a.pause(); };

    const defs = E("defs", {});
    const rib = E("pattern", { id: "teuRib", width: 4, height: 8, patternUnits: "userSpaceOnUse" }, defs);
    E("rect", { x: 3, width: 1, height: 8, fill: "rgba(0,0,0,.14)" }, rib);

    // ---------- sky ----------
    E("rect", { x: -1, y: -1, width: W + 2, height: 120, fill: "var(--sky1)" });
    E("rect", { x: -1, y: 119, width: W + 2, height: 120, fill: "var(--sky2)" });
    E("rect", { x: -1, y: 239, width: W + 2, height: 140, fill: "var(--sky3)" });
    const clouds = E("g", {});
    const cloud = (x, y, w) => { const g = E("g", {}, clouds);
      for (const [dx, dy, ww, hh] of [[0, 0, w, 9], [w * .18, -7, w * .46, 9], [w * .52, -3, w * .3, 6]]) R(x + dx, y + dy, ww, hh, "var(--cloud)", g, { rx: hh / 2, class: "far" }); };
    for (let rep = 0; rep < 2; rep++) [[60, 70, 220], [420, 122, 150], [760, 46, 260], [1150, 104, 190], [1500, 66, 170]].forEach(([x, y, w]) => cloud(x + rep * 1700, y, w));
    loop(clouds, [{ transform: "translateX(0px)" }, { transform: "translateX(-1700px)" }], { duration: 600000, easing: "linear" });
    // distant shore: hills, lighthouse, warehouses, a yard and other berths' cranes, all in the far tone
    P(`M-1 ${QUAY} L-1 336 C 120 318, 220 330, 330 322 C 460 312, 560 334, 700 330 C 860 326, 960 300, 1100 306 C 1220 312, 1300 296, 1401 304 L1401 ${QUAY} Z`, "var(--far)", s, { class: "far" });
    R(1252, 262, 8, 40, "var(--far-hi)", s, { class: "far" }); R(1249, 256, 14, 7, "var(--far2)", s, { class: "far" });
    E("circle", { cx: 1256, cy: 253, r: 2.4, fill: "#D9A43A", class: "beacon" });
    for (const [x, w, h] of [[250, 120, 26], [600, 90, 20], [880, 140, 30], [1060, 60, 18]]) R(x, QUAY - h, w, h, "var(--far2)", s, { class: "far" });
    for (let x = 380; x < 580; x += 22) for (let k = 0; k < 2 + (x % 3); k++) R(x, QUAY - 9 - k * 9, 20, 8, k % 2 ? "var(--far3)" : "var(--far2)", s, { class: "far" });
    for (const [x, sc] of [[820, .62], [980, .55], [1150, .5]]) {
      const g = E("g", { transform: `translate(${x} ${QUAY}) scale(${sc})` });
      P("M-30 0 L-22 -150 L-14 -150 L-20 0 Z M30 0 L22 -150 L14 -150 L20 0 Z", "var(--far2)", g, { class: "far" });
      R(-150, -170, 260, 10, "var(--far2)", g, { class: "far" });
      R(-22, -196, 44, 26, "var(--far-hi)", g, { class: "far" });
      P("M-18 -196 L0 -250 L18 -196 Z", "none", g, { class: "far" });
      L("M0 -250 L-150 -170 M0 -250 L110 -170", 1, "var(--far-line)", g);
    }
    const gulls = E("g", {});
    for (const [x, y] of [[600, 150], [630, 140]]) L(`M${x - 6} ${y - 2} q3 -3 6 0 q3 -3 6 0`, 1.2, "var(--gull)", gulls);
    loop(gulls, [{ transform: "translate(0px, 0px)" }, { transform: "translate(140px, -10px)" }, { transform: "translate(260px, 4px)" }], { duration: 38000, direction: "alternate", easing: "ease-in-out" });

    // ---------- quay ----------
    R(-1, QUAY, W + 2, 30, "var(--quay)");
    for (const fx of [10, 1376]) R(fx, QUAY + 6, 12, 20, INK);
    for (const bx of [14, 1388]) { R(bx - 3, QUAY - 6, 6, 6, INK); R(bx - 5, QUAY - 8, 10, 3, INK); }

    // ---------- crane, back layer (legs stand behind the ship) ----------
    const craneBack = E("g", {});
    for (const lx of [-LEG, LEG]) {
      R(lx - LW / 2, PORTAL + 14, LW, QUAY - PORTAL - 14, GALV, craneBack);
      R(lx - LW / 2 - 6, QUAY - 9, LW + 12, 9, INK, craneBack);
      for (const wx of [lx - 9, lx - 3, lx + 3, lx + 9]) E("circle", { cx: wx, cy: QUAY - 1.5, r: 2.2, fill: GALV2, class: "o" }, craneBack);
      L(`M${lx - LW / 2} ${PORTAL + 60} h${LW} M${lx - LW / 2} ${PORTAL + 110} h${LW}`, 1, INK, craneBack);
    }
    E("circle", { cx: -LEG - 14, cy: QUAY - 26, r: 9, fill: GALV, class: "o" }, craneBack);
    E("circle", { cx: -LEG - 14, cy: QUAY - 26, r: 3, fill: INK }, craneBack);
    L(`M${LEG - 3} ${PORTAL + 14} V${QUAY - 10} M${LEG + 3} ${PORTAL + 14} V${QUAY - 10}`, 1, INK, craneBack);
    for (let y = PORTAL + 20; y < QUAY - 12; y += 6) L(`M${LEG - 3} ${y} h6`, 1, INK, craneBack);

    // ---------- hull ----------
    const hullD = `M${STERN} ${DECK - 2} L${FCLE} ${DECK - 2} L${FCLE} ${DECK - 19} L${STEM - 6} ${DECK - 21}
      C ${STEM} ${DECK - 21}, ${STEM - 6} ${WL - 22}, ${STEM - 22} ${WL + 30} L ${STERN + 40} ${WL + 30}
      C ${STERN + 20} ${WL + 10}, ${STERN + 8} ${WL - 10}, ${STERN} ${WL - 22} Z`;
    P(hullD, HULL);
    const hc = E("clipPath", { id: "teuHull" }, defs); E("path", { d: hullD }, hc);
    E("rect", { x: 0, y: WL - 9, width: W, height: 40, fill: "#8E2F22", "clip-path": "url(#teuHull)" });
    L(`M${STERN} ${WL - 9} H${STEM}`);
    L(`M${STERN + 2} ${DECK + 5} H${FCLE}`, 1, "#4E565D");
    for (const y of [DECK + 16, WL - 20]) L(`M${STERN + 6} ${y} H${STEM - 14}`, 1, "#353D43");
    for (let x = X0 - 4; x < FCLE; x += BW + GAP) L(`M${x} ${DECK + 6} V${WL - 9}`, 1, "#353D43");
    for (let x = STERN + 54; x < FCLE - 10; x += 26) R(x, DECK + 1, 5, 2, INK);
    T(STEM - 200, DECK + 24, "TEU MERIDIAN", "name");
    T(STERN + 8, DECK + 22, "TEU MERIDIAN", "tiny"); T(STERN + 8, DECK + 30, "VALLETTA", "tiny");
    for (const dx of [STERN + 60, STEM - 48]) for (let m = 0; m < 4; m++) { const y = WL - 9 - m * 6.56; L(`M${dx} ${y} h4`, 1, "#E4E6E3"); T(dx + 6, y + 2, String(8 - m) + (m % 2 ? "" : "M"), "tiny"); }
    E("circle", { cx: STEM - 86, cy: WL - 24, r: 6, fill: "none", stroke: "#E4E6E3", "stroke-width": 1 });
    L(`M${STEM - 92} ${WL - 24} h12 M${STEM - 86} ${WL - 30} v12`, 1, "#E4E6E3");
    for (const tx of [300, 1150]) { E("rect", { x: tx, y: DECK + 22, width: 14, height: 10, fill: "none", stroke: "#E4E6E3", "stroke-width": 1 }); T(tx + 1.5, DECK + 29.5, "TUG", "tiny"); }
    R(560, DECK + 20, 8, 12, "#353D43");
    R(620, DECK + 8, 160, 5, GALV);
    for (let x = 628; x < 780; x += 8) L(`M${x} ${DECK + 8} v5`);
    R(STERN + 10, DECK + 1, 7, 4, INK); R(STEM - 20, DECK - 18, 7, 4, INK);
    E("ellipse", { cx: STEM - 34, cy: DECK - 10, rx: 5, ry: 3.5, fill: INK });
    L(`M${STEM - 34} ${DECK - 7} V${DECK + 12} M${STEM - 41} ${DECK + 6} Q${STEM - 34} ${DECK + 16} ${STEM - 27} ${DECK + 6}`, 1.6, GALV);

    // ---------- forecastle ----------
    P(`M${FCLE + 6} ${DECK - 19} L${FCLE + 14} ${DECK - 40} L${FCLE + 20} ${DECK - 40} L${FCLE + 16} ${DECK - 19} Z`, GALV2);
    R(STEM - 52, DECK - 78, 4, 57, WHITE); R(STEM - 62, DECK - 66, 24, 3, WHITE);
    E("circle", { cx: STEM - 50, cy: DECK - 80, r: 2, fill: WHITE, class: "o" });
    for (let x = FCLE + 26; x < STEM - 8; x += 7) L(`M${x} ${DECK - 21} V${DECK - 28}`, 1, "#4E565D");
    L(`M${FCLE + 26} ${DECK - 28} H${STEM - 8}`, 1, "#4E565D");
    R(FCLE + 40, DECK - 30, 22, 9, GALV2); E("circle", { cx: FCLE + 51, cy: DECK - 30, r: 5, fill: GALV, class: "o" });
    L(`M${FCLE + 58} ${DECK - 24} L${STEM - 34} ${DECK - 19}`, 1.4);
    R(FCLE + 70, DECK - 28, 16, 7, GALV2);
    for (const bx of [FCLE + 30, FCLE + 34, STEM - 22, STEM - 18]) R(bx, DECK - 26, 3, 5, INK);

    // ---------- deckhouse aft, side elevation ----------
    const HX = 72, HW = 118, DH = 19, ND = 6, HTOP = DECK - 2 - ND * DH, WH = HTOP - 20, MX = HX + 82;
    P(`M${HX + 4} ${HTOP} L${HX + 10} ${HTOP - 50} L${HX + 40} ${HTOP - 50} L${HX + 38} ${HTOP} Z`, HULL);
    R(HX + 9, HTOP - 40, 30, 9, "#A9442E");
    for (const ex of [HX + 16, HX + 28]) R(ex, HTOP - 60, 5, 10, "#4E565D");
    R(HX + 8, HTOP - 53, 34, 4, INK); R(HX + 44, HTOP - 26, 6, 3, INK);
    R(HX, HTOP, HW, ND * DH, WHITE);
    for (let d = 0; d < ND; d++) {
      const y = HTOP + d * DH;
      L(`M${HX} ${y} H${HX + HW}`);
      for (let w = 0; w < 6; w++) R(HX + 12 + w * 18, y + 6, 7, 8, "var(--win)");
      R(HX + HW - 7, y + 4, 5, 13, "#4E565D");
      if (d > 0) { R(HX - 12, y - 1.5, 12, 2, GALV2); L(`M${HX - 12} ${y - 1.5} v-6 h12`, 1, "#4E565D"); L(`M${HX - 2} ${y + DH - 2} L${HX - 10} ${y + 1}`); }
    }
    P(`M${HX - 6} ${HTOP} L${HX - 6} ${WH} L${HX + HW + 4} ${WH} L${HX + HW + 10} ${HTOP} Z`, WHITE);
    P(`M${HX + 30} ${WH + 5} L${HX + HW + 4} ${WH + 5} L${HX + HW + 7} ${WH + 12} L${HX + 30} ${WH + 12} Z`, "var(--win)");
    for (let m = HX + 44; m < HX + HW; m += 14) L(`M${m} ${WH + 5} V${WH + 12}`, 1, WHITE);
    R(HX - 8, WH - 4, HW + 18, 4, INK); R(HX - 10, WH - 1, HW + 22, 2, GALV2);
    R(HX + HW + 5, WH + 3, 4, 5, "#3F9B5A");
    R(MX - 2, WH - 44, 4, 40, WHITE); R(MX - 18, WH - 30, 36, 3, WHITE); R(MX - 16, WH - 36, 24, 3, INK); R(MX + 2, WH - 24, 18, 3, INK);
    E("circle", { cx: MX, cy: WH - 47, r: 2.5, fill: WHITE, class: "o" });
    for (const ax of [MX - 14, MX + 12]) L(`M${ax} ${WH - 30} v-14`);
    for (const gx of [HX + 4, HX + 104]) E("circle", { cx: gx, cy: WH - 7, r: 3, fill: WHITE, class: "o" });
    L(`M${MX} ${WH - 44} L${HX - 4} ${WH - 4} M${MX} ${WH - 44} L${HX + HW + 6} ${WH - 4}`, 1, "#6E767C");
    const rbY = HTOP + 3 * DH + 6;
    L(`M${HX + HW} ${rbY - 10} h10 v6`, 1.6);
    P(`M${HX + HW + 1} ${rbY - 2} h16 q-2 7 -8 7 h-2 q-5 0 -6 -7 Z`, "#A9442E");
    P(`M${STERN - 4} ${DECK - 6} L${STERN + 40} ${DECK - 38} L${STERN + 44} ${DECK - 34} L${STERN} ${DECK - 2} Z`, GALV2);
    const lb = E("g", { transform: `rotate(-36 ${STERN + 22} ${DECK - 30})` });
    P(`M${STERN - 6} ${DECK - 30} q0 -9 9 -9 h34 q10 0 14 9 q-4 9 -14 9 h-34 q-9 0 -9 -9 Z`, "#A9442E", lb);
    R(STERN + 6, DECK - 34, 16, 5, "var(--win)", lb);
    for (let x = STERN + 46; x < HX; x += 6) L(`M${x} ${DECK - 2} V${DECK - 10}`, 1, "#4E565D");
    L(`M${STERN + 46} ${DECK - 10} H${HX}`, 1, "#4E565D");
    for (let r = 0; r < 3; r++) R(STERN + 50 + r * 9, DECK - 8, 7, 5, WHITE, s, { rx: 2.5 });
    R(STERN + 14, DECK - 8, 12, 6, GALV2); E("circle", { cx: STERN + 20, cy: DECK - 8, r: 3.5, fill: GALV, class: "o" });
    L(`M${STERN + 3} ${DECK - 2} V${DECK - 34}`);
    P(`M${STERN + 3} ${DECK - 34} l14 4 l-14 4 Z`, "#A9442E");

    // ---------- hatch covers, lashing bridges ----------
    bays.forEach((b, i) => {
      const x = bayX(i);
      R(x - 3, DECK - 8, BW + 6, 6, HULL);
      R(x - 2, BASE, BW + 4, DECK - 8 - BASE, GALV2);
      L(`M${x + BW / 2} ${BASE} v${DECK - 8 - BASE}`);
      for (const cx of [x + 6, x + BW / 2 - 6, x + BW / 2 + 6, x + BW - 6]) R(cx - 1, DECK - 10, 2, 2, INK);
      if (i > 0) {
        const lx = x - GAP + 1, top = BASE - 2 * (CH + TG) - 4;
        R(lx, top, GAP - 2, DECK - 8 - top, GALV);
        for (let k = 1; k <= 2; k++) L(`M${lx} ${BASE - k * (CH + TG)} h${GAP - 2}`);
      }
    });
    const backs = bays.map((b, i) => R(bayX(i) - .5, BASE, BW + 1, 0, INK));
    const slotOutline = E("rect", { width: BW - 1, height: CH - 1, fill: "none", stroke: "#D9A43A", "stroke-width": 1.5, "stroke-dasharray": "4 3", opacity: 0 });
    const cargo = E("g", {});

    // ---------- containers ----------
    const tip = document.createElement("div"); tip.className = "ship-tip"; document.body.appendChild(tip);
    const byId = {};
    const words = st => !st.drilled ? "not drilled yet" : st.mastered ? "sealed: mastered" : "loaded: learning";
    bays.forEach((b, bi) => {
      b.boxes = b.items.map(it => {
        const g = E("g", { class: "ship-box" }, cargo);
        const lift = E("g", { class: "lift" }, g);
        E("rect", { width: BW, height: CH, fill: PAINT[it.tier] || PAINT.C, class: "paint" }, lift);
        E("rect", { width: BW, height: CH, fill: "url(#teuRib)" }, lift);
        const wash = E("rect", { width: BW, height: CH, fill: "#77736C", class: "wash" }, lift);
        L(`M0 2.5 h${BW} M0 ${CH - 2.5} h${BW} M2.5 0 v${CH} M${BW - 2.5} 0 v${CH}`, 1, "rgba(28,33,38,.55)", lift);
        for (const cx of [0, BW - 3]) for (const cy of [0, CH - 3]) E("rect", { x: cx, y: cy, width: 3, height: 3, fill: INK }, lift);
        const seal = E("rect", { x: 4, y: 4, width: BW - 8, height: CH - 8, fill: "none", stroke: "rgba(255,255,255,.85)", "stroke-width": 1, class: "seal" }, lift);
        const due = E("rect", { x: BW - 8, width: 8, height: 7, fill: "#D9A43A", class: "o" }, lift);
        E("rect", { width: BW, height: CH, fill: "none", class: "o" }, lift);
        T(7, CH / 2 + 3.7, it.name, "lbl", lift);
        const sel = E("rect", { x: -2.5, y: -2.5, width: BW + 5, height: CH + 5, fill: "none", stroke: "#D9A43A", "stroke-width": 3, opacity: 0 }, lift);
        const box = { ...it, g, wash, seal, due, sel, b: bi, st: {} };
        g.addEventListener("mousemove", ev => { tip.style.display = "block"; tip.style.left = ev.clientX + 14 + "px"; tip.style.top = ev.clientY + 10 + "px"; tip.textContent = `${it.code} · ${it.title} · tier ${it.tier} · ${words(box.st)}${box.st.due ? " · due" : ""}`; });
        g.addEventListener("mouseleave", () => { tip.style.display = "none"; });
        g.addEventListener("click", () => onOpen(it.id));
        byId[it.id] = box;
        return box;
      });
    });
    bays.forEach((b, i) => { if (i > 0) L(`M${bayX(i) - 2} ${BASE} L${bayX(i) + 12} ${slotY(0)}`, 1, "#4E565D"); });

    // ---------- crane, front layer ----------
    const craneFront = E("g", {});
    for (const lx of [-LEG, LEG]) {
      R(lx - 6, BOOMB, 12, PORTAL - BOOMB, GALV, craneFront);
      R(lx - 9, BOOMT, 18, BOOMB - BOOMT, GALV, craneFront);
      L(`M${lx - 9} ${BOOMT} L${lx + 9} ${BOOMB} M${lx + 9} ${BOOMT} L${lx - 9} ${BOOMB}`, 1, INK, craneFront);
    }
    R(-LEG - 18, PORTAL, LEG * 2 + 36, 14, GALV, craneFront);
    T(-LEG + 8, PORTAL + 10.5, "STS 07", "stencil", craneFront);
    for (const fx of [-LEG - 12, -20, 20, LEG + 12]) P(`M${fx - 4} ${PORTAL + 14} h8 l-2 4 h-4 Z`, WHITE, craneFront);
    L(`M${-LEG - 3} ${BOOMB} V${PORTAL} M${-LEG + 3} ${BOOMB} V${PORTAL}`, 1, INK, craneFront);
    for (let y = BOOMB + 6; y < PORTAL; y += 6) L(`M${-LEG - 3} ${y} h6`, 1, INK, craneFront);
    for (let y = BOOMB + 10; y < PORTAL; y += 14) L(`M${-LEG - 6} ${y} h12`, 1, "#4E565D", craneFront);
    P(`M${-LEG - 4} ${PORTAL} L-9 -10 L9 -10 L${LEG + 4} ${PORTAL} L${LEG - 6} ${PORTAL} L3 0 L-3 0 L${-LEG + 6} ${PORTAL} Z`, GALV, craneFront);
    const aX = (y, side) => side * (LEG + 4 - (PORTAL - y) / (PORTAL + 10) * (LEG - 5));
    for (const side of [-1, 1]) for (const y of [118, 158]) {
      L(`M${side * (LEG - 6)} ${y} H${aX(y, side) - side * 3}`, 1.6, INK, craneFront);
      L(`M${side * (LEG - 6)} ${y} L${aX(y + 30, side) - side * 3} ${y + 30}`, 1, INK, craneFront);
    }
    for (const side of [-1, 1]) L(`M${side * 4} 2 L${side * (LEG - 4)} ${BOOMT} M${side * 6} 2 L${side * (LEG + 4)} ${BOOMT}`, 1, INK, craneFront);
    R(-LEG + 9, BOOMT, LEG * 2 - 18, 8, GALV, craneFront);
    for (const side of [-1, 1]) { L(`M${side * LEG - 9} ${BOOMT - 6} h18`, 1, INK, craneFront); for (const px of [-9, 0, 9]) L(`M${side * LEG + px} ${BOOMT} v-6`, 1, INK, craneFront); }
    L(`M${-LEG + 9} ${BOOMB - 1} H${LEG - 9}`, 2, INK, craneFront);
    R(-44, 12, 88, BOOMT - 12, WHITE, craneFront);
    for (let i = 0; i < 5; i++) R(-35 + i * 15, 24, 9, 6, "var(--win)", craneFront);
    R(-40, 34, 9, 15, "#4E565D", craneFront);
    for (let y = 36; y < 48; y += 3) L(`M-26 ${y} h40`, 1, GALV2, craneFront);
    L(`M-44 12 v-5 h88 v5 M-30 7 v5 M-10 7 v5 M10 7 v5 M30 7 v5 M-36 7 v-12`, 1, INK, craneFront);
    E("circle", { cx: 30, cy: 9, r: 3, fill: "#B0372B", class: "o beacon" }, craneFront);
    R(-21, BOOMB, 42, 11, GALV2, craneFront);
    for (const wx of [-15, -7, 7, 15]) E("circle", { cx: wx, cy: BOOMB + 1, r: 2.5, fill: GALV, class: "o" }, craneFront);
    R(6, BOOMB + 11, 22, 18, WHITE, craneFront); R(9, BOOMB + 15, 16, 8, "var(--win)", craneFront);
    L(`M17 ${BOOMB + 15} v8 M9 ${BOOMB + 26} h16`, 1, WHITE, craneFront);
    const ropes = E("g", {}, craneFront);
    for (const rx of [-16, -12, -6, -2, 2, 6, 12, 16]) L(`M${rx} 0 L${rx * 1.5} 1`, 1, INK, ropes);
    const hoist = E("g", {}, craneFront);
    R(-16, -13, 32, 7, INK, hoist);
    for (const sx of [-9, 0, 9]) E("circle", { cx: sx, cy: -9.5, r: 2.4, fill: GALV2, class: "o" }, hoist);
    R(-BW / 2 - 3, -6, BW + 6, 5, INK, hoist);
    L("M-12 -3.5 H12", 1, GALV2, hoist);
    for (const ex of [-BW / 2 - 5, BW / 2 + 1]) R(ex, -8, 4, 9, GALV2, hoist);
    const callG = E("g", { class: "call-g" }, craneFront);
    const callLine = L("", 1, INK, callG);
    const call1 = T(0, 0, "", "call", callG), call2 = T(0, 0, "", "call2", callG);

    // ---------- mooring lines ----------
    L(`M${STERN + 4} ${DECK - 4} Q ${STERN - 6} ${QUAY - 22} 14 ${QUAY - 7}`, 1.2);
    L(`M${STEM - 10} ${DECK - 22} Q ${STEM + 8} ${QUAY - 30} 1388 ${QUAY - 7}`, 1.2);

    // ---------- water ----------
    E("rect", { x: -1, y: WL, width: W + 2, height: 24, fill: "var(--sea1)" });
    E("rect", { x: -1, y: WL + 24, width: W + 2, height: 24, fill: "var(--sea2)" });
    E("rect", { x: -1, y: WL + 48, width: W + 2, height: 24, fill: "var(--sea3)" });
    L(`M-1 ${WL} H${W + 1}`);
    const wc = E("clipPath", { id: "teuWater" }, defs); E("rect", { x: 0, y: WL + 1, width: W, height: 71 }, wc);
    const water = E("g", { "clip-path": "url(#teuWater)" });
    const refl = E("g", { class: "sway" }, water);
    for (let row = 0; row < 6; row++) {
      const y = WL + 3 + row * 5.5, fade = 1 - row / 7;
      for (let x = STERN + 10; x < STEM - 30;) { const w = 30 + rnd() * 90, gap = 14 + rnd() * 30 * (1 + row * .5);
        E("rect", { x, y, width: Math.min(w, STEM - 30 - x), height: 1.8, fill: row < 1 ? "#8E2F22" : "var(--refl)", opacity: (.38 * fade).toFixed(2) }, refl); x += w + gap; }
    }
    for (let row = 0; row < 4; row++) for (let x = HX; x < HX + HW;) { const w = 8 + rnd() * 26; E("rect", { x, y: WL + 40 + row * 6, width: w, height: 1.6, fill: "var(--refl-hi)", opacity: (.42 - row * .05).toFixed(2) }, refl); x += w + 5 + rnd() * 8; }
    for (let x = STERN + 6; x < STEM - 24;) { const w = 14 + rnd() * 40; E("rect", { x, y: WL + .5, width: w, height: 1.4, fill: "var(--foam)" }, water); x += w + 3 + rnd() * 10; }
    [[WL + 8, 3, 8, 18, "var(--rip1)", 1, 240000], [WL + 26, 4, 18, 40, "var(--rip2)", 1.3, 170000], [WL + 50, 4, 36, 80, "var(--rip3)", 1.6, 110000]].forEach(([y0, rows, wMin, wMax, col, h, ms], li) => {
      const g = E("g", {}, water);
      for (let rep = 0; rep < 2; rep++) for (let r = 0; r < rows; r++) for (let x = rnd() * 60; x < 1700;) { const w = wMin + rnd() * (wMax - wMin);
        E("rect", { x: x + rep * 1700, y: y0 + r * (5 + li * 1.5), width: w, height: h, fill: col }, g); x += w + wMin * (2 + rnd() * 5); }
      loop(g, [{ transform: "translateX(0px)" }, { transform: "translateX(-1700px)" }], { duration: ms, easing: "linear" });
    });
    const buoy = E("g", { class: "sway2" });
    P(`M1330 ${WL + 30} l6 -16 h4 l6 16 Z`, "#3F6B47", buoy);
    R(1331, WL + 30, 14, 4, INK, buoy);
    E("circle", { cx: 1338, cy: WL + 11, r: 2.2, fill: "#3F6B47", class: "o beacon" }, buoy);

    // ---------- one label row under the ship: HTML buttons, so the bays filter by keyboard too ----------
    let i0 = 0;
    groups.forEach((g, gi) => {
      const nb = bays.filter(b => b.g === gi).length, x1 = bayX(i0), x2 = bayX(i0 + nb - 1) + BW;
      L(`M${x1} ${WL + 80} H${x2} M${x1} ${WL + 76} v4 M${x2} ${WL + 76} v4`);
      const btn = document.createElement("button");
      btn.className = "ship-lbl"; btn.dataset.n = g.n;
      btn.style.left = (x1 / W * 100) + "%"; btn.style.width = ((x2 - x1) / W * 100) + "%";
      btn.innerHTML = `<b>${g.n}</b><span>${g.name}</span>`;
      btn.addEventListener("click", () => onBay(g.n));
      lbls.appendChild(btn);
      i0 += nb;
    });

    // ---------- crane motion ----------
    let mode = VIEW.full, UP = mode.up;
    let carried = null, fromBay = -1, craneX = 0, hoistY = UP, busy = false, pending = null;
    function layoutStack(i, animate) {
      const b = bays[i];
      b.boxes.forEach((box, k) => {
        if (box === carried) return;
        const to = `translate(${bayX(i)}px, ${slotY(k)}px)`, from = box.g.style.transform;
        if (animate && from && from !== to && !reduce()) box.g.animate([{ transform: from }, { transform: to }], { duration: 220, easing: EO });
        box.g.style.transform = to;
      });
      const n = b.boxes.filter(x => x !== carried).length;
      backs[i].setAttribute("y", BASE - n * (CH + TG)); backs[i].setAttribute("height", n * (CH + TG));
    }
    const setCrane = x => { craneX = x; at(craneBack, x, 0); at(craneFront, x, 0); };
    const setHoist = y => { hoistY = y; at(hoist, 0, y); ropes.style.transform = `translate(0px, ${ROPE0}px) scale(1, ${y - 13 - ROPE0})`; };
    function placeCall() {
      const right = craneX < 1000, x = right ? LEG + 26 : -LEG - 26, a = right ? "start" : "end";
      callLine.setAttribute("d", `M${right ? BW / 2 + 4 : -BW / 2 - 4} ${UP + CH / 2} H${x + (right ? -4 : 4)}`);
      for (const [el, y] of [[call1, UP + 8], [call2, UP + 23]]) { el.setAttribute("x", x); el.setAttribute("y", y); el.setAttribute("text-anchor", a); }
      if (carried) { call1.textContent = carried.tag; call2.textContent = `${carried.code} · tier ${carried.tier}`; }
      callG.style.opacity = carried && mode === VIEW.full ? 1 : 0;
    }
    const tween = (el, from, to, ms, easing) => reduce() || ms <= 0 ? Promise.resolve() : el.animate([{ transform: from }, { transform: to }], { duration: ms, easing }).finished.catch(() => {});
    async function travel(x) {
      const ms = Math.min(560, 200 + Math.abs(x - craneX) * .32), a = `translate(${craneX}px, 0px)`, b = `translate(${x}px, 0px)`;
      setCrane(x); placeCall();
      await Promise.all([tween(craneBack, a, b, ms, EIO), tween(craneFront, a, b, ms, EIO)]);
    }
    async function hoistTo(y) {
      const ms = Math.min(300, 140 + Math.abs(y - hoistY) * .9), fromH = `translate(0px, ${hoistY}px)`, fromR = ropes.style.transform;
      setHoist(y);
      await Promise.all([tween(hoist, fromH, `translate(0px, ${y}px)`, ms, EIO), tween(ropes, fromR, ropes.style.transform, ms, EIO)]);
    }
    function attach(box) { hoist.appendChild(box.g); box.g.style.transform = `translate(${-BW / 2}px, 0px)`; box.sel.setAttribute("opacity", 1); }
    function detach(box, i, k) { cargo.appendChild(box.g); box.g.style.transform = `translate(${bayX(i)}px, ${slotY(k)}px)`; box.sel.setAttribute("opacity", 0); }
    function showSlot(i) {
      if (i < 0) { slotOutline.setAttribute("opacity", 0); return; }
      slotOutline.setAttribute("x", bayX(i) + .5); slotOutline.setAttribute("y", slotY(bays[i].boxes.length - 1) + .5); slotOutline.setAttribute("opacity", 1);
    }
    function follow(i, instant) { // keep the crane in view when the plan scrolls sideways on narrow screens
      if (scroller.scrollWidth <= scroller.clientWidth + 2) return;
      const px = (bayX(i) + BW / 2) / W * scroller.scrollWidth - scroller.clientWidth / 2;
      scroller.scrollTo({ left: Math.max(0, px), behavior: instant || reduce() ? "auto" : "smooth" });
    }
    function bring(box) {  // the opened box goes to the top of its stack, since a crane can only lift the top box
      const i = box.b, stack = bays[i].boxes, k0 = stack.indexOf(box);
      if (k0 < stack.length - 1) {
        stack.splice(k0, 1); stack.push(box);
        if (!reduce()) box.g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: EO });
        layoutStack(i, true);
      }
    }
    function place(box) { // instant: used on first paint
      if (carried) { const i = fromBay; const back = carried; carried = null; detach(back, i, bays[i].boxes.length - 1); layoutStack(i, false); }
      if (!box) { showSlot(-1); placeCall(); return; }
      bring(box);
      setCrane(bayX(box.b) + BW / 2); setHoist(UP);
      carried = box; fromBay = box.b; attach(box); layoutStack(box.b, false); showSlot(box.b); placeCall();
    }
    async function open(box) {
      if (box === carried) return;
      if (busy) { pending = box; return; }
      busy = true;
      try {
        if (carried) {
          const i = fromBay, k = bays[i].boxes.length - 1;
          showSlot(-1);
          await hoistTo(slotY(k));
          const back = carried; carried = null; detach(back, i, k); layoutStack(i, false); placeCall();
          await hoistTo(UP);
        }
        if (pending) { box = pending; pending = null; }
        if (!box) return;
        bring(box);
        follow(box.b);
        await travel(bayX(box.b) + BW / 2);
        await hoistTo(slotY(bays[box.b].boxes.length - 1));
        carried = box; fromBay = box.b; attach(box); layoutStack(box.b, false); showSlot(box.b); placeCall();
        await hoistTo(UP);
      } finally {
        busy = false;
        if (pending) { const p = pending; pending = null; open(p); }
      }
    }

    bays.forEach((b, i) => layoutStack(i, false));
    setCrane(bayX(0) + BW / 2); setHoist(UP); placeCall();
    matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", () => loops.forEach(a => reduce() ? a.pause() : a.play()));

    function setMode(compact) {
      const m = compact ? VIEW.compact : VIEW.full;
      if (m === mode && s.dataset.mode) return;
      mode = m; UP = m.up; s.dataset.mode = compact ? "compact" : "full";
      s.setAttribute("viewBox", `0 ${m.y} ${W} ${m.h}`);
      host.classList.toggle("compact", compact);
      lbls.querySelectorAll(".ship-lbl").forEach(b => { b.style.top = ((m.lbl - m.y) / m.h * 100) + "%"; });
      if (!busy) setHoist(UP);
      placeCall();
    }

    let first = true;
    return {
      update({ states, sel, topic, compact = false }) {
        setMode(compact);
        for (const id in byId) {
          const box = byId[id], st = states[id] || {};
          box.st = st;
          box.wash.style.opacity = st.drilled ? 0 : .48;
          box.seal.style.opacity = st.mastered ? 1 : 0;
          box.due.style.display = st.due ? "" : "none";
          box.g.classList.toggle("dim", topic !== "all" && !(box.topics || [groups[bays[box.b].g].n]).includes(topic));
        }
        lbls.querySelectorAll(".ship-lbl").forEach(b => b.setAttribute("aria-pressed", b.dataset.n === topic));
        const target = sel ? byId[sel] : null;
        if (first) { first = false; place(target); if (target) setTimeout(() => follow(target.b, true), 60); return; }
        if (target !== carried) open(target);
      },
    };
  }

  window.TEUShip = { mount };
})();
