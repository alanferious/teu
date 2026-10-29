/* TEU · Unit 2 as an airport terminal, printed like a three-ink travel poster: mustard, teal and brick red
   on paper. Each subtopic is a gate. Its terms wait in the lounge until you master them, then board the
   plane and light a cabin window; when the last one boards, the flight leaves. The departures board is
   the Unit 2 home, flashcards are boarding passes, and Unit 2's real-world examples (data/micro.js) are
   drilled in the Examples tab. Loaded before app.js and only reads its globals when called. */
window.TEUAir = (() => {
  const UIK = "teu-air";
  const ui = { seen: {}, board: {}, rmode: "browse" };
  try { const u = JSON.parse(localStorage.getItem(UIK)) || {}; for (const k of ["seen", "board"]) if (u[k] && typeof u[k] === "object") ui[k] = u[k]; if (typeof u.rmode === "string") ui.rmode = u.rmode; } catch {}
  const saveUi = () => { try { localStorage.setItem(UIK, JSON.stringify(ui)); } catch {} };
  const MILES = [0, 40, 120, 160];                       // per grade: Forgot, Shaky, Got it, Easy
  const GRADE_WORDS = { again: "Missed the flight", hard: "Standby", good: "Boarded", easy: "Upgraded" };
  const DEST = { "2.1": "DEMAND", "2.2": "SUPPLY", "2.3": "EQUILIBRIUM", "2.4": "BEHAVIOURAL ECON", "2.5": "DEMAND ELASTICITY", "2.6": "SUPPLY ELASTICITY",
    "2.7": "GOVERNMENT", "2.8": "EXTERNALITIES", "2.9": "PUBLIC GOODS", "2.10": "ASYMMETRIC INFO", "2.11": "MARKET POWER", "2.12": "EQUITY" };
  const SEAT_FILL = { board: "#E1A63A", late: "#C4472C", new: "#1F4D5A", wait: "#C9BDA3" };
  const SEAT_INK = { board: "#16363F", late: "#FFF8EE", new: "#EFEAE0", wait: "#16363F" };
  const SEAT_WORD = { board: "due", late: "overdue", new: "new", wait: "waiting, not due yet", gone: "on board" };
  const PAX_WORD = { late: "DELAYED", board: "BOARDING", new: "CHECK-IN", wait: "WAITING", gone: "ON BOARD" };
  const reduce = () => calm();
  const F = 'font-family="Atkinson Hyperlegible Next, sans-serif"', M = 'font-family="Atkinson Hyperlegible Mono, monospace"';

  // ---------- Model ----------
  const subs = () => COURSE.filter(t => t.unit === "2");
  const gateOf = n => { const i = +n.split(".")[1]; return (i <= 6 ? "A" : "B") + i; };
  const flightOf = n => "TU " + (200 + +n.split(".")[1]);
  const termsOf = n => CDEFS.filter(d => d.n === n);
  const pad2 = x => String(x).padStart(2, "0");
  const dayKey = t => { const d = new Date(t); return d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate(); };
  const clockOf = t => { const d = new Date(t); return d.toDateString() === new Date().toDateString() ? pad2(d.getHours()) + ":" + pad2(d.getMinutes()) : d.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase().slice(0, 3); };
  const dateOf = t => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short" }).toUpperCase();
  // A term's seat: on board once mastered; before that new, due, overdue (over a day late) or waiting
  function seatOf(id) {
    const c = prog(id);
    if (!c) return "new";
    if (stateOf(id) === "mastered") return "gone";
    return c.due <= now() - DAY ? "late" : c.due <= now() ? "board" : "wait";
  }
  function gate(n) {
    const terms = termsOf(n), st = terms.map(d => seatOf(d.id)), by = k => st.filter(s => s === k).length;
    const g = { n, t: CT[n], gate: gateOf(n), flight: flightOf(n), terms, st, gone: by("gone"), late: by("late"), due: by("board") + by("late"), fresh: by("new"), wait: by("wait") };
    g.departed = terms.length > 0 && g.gone === terms.length;
    const lateDays = g.late ? Math.max(1, Math.floor((now() - Math.min(...terms.filter((d, i) => st[i] === "late").map(d => prog(d.id).due))) / DAY)) : 0;
    g.status = g.departed ? ["gone", "DEPARTED"] : g.late ? ["late", `DELAYED ${lateDays} DAY${lateDays === 1 ? "" : "S"}`] : g.due ? ["board", `BOARDING ${g.due} DUE`] : g.fresh ? ["new", "CHECK-IN OPEN"] : ["wait", "ON TIME"];
    const nextDue = Math.min(...terms.filter((d, i) => st[i] === "wait").map(d => prog(d.id).due), Infinity);
    g.next = g.departed ? "--:--" : g.due ? "NOW" : nextDue < Infinity ? clockOf(nextDue) : "--:--";
    g.when = g.departed ? Math.max(...terms.flatMap(d => evOf(d.id).map(e => e[0]))) : 0;
    return g;
  }
  function passport() {
    const ids = [...CDEFS.filter(d => d.unit === "2").map(d => d.id), ...rwe().map(e => e.id)];
    const evs = ids.flatMap(evOf).filter(e => e[0]);
    const miles = evs.reduce((a, e) => a + MILES[e[3]], 0);
    const tier = miles >= 20000 ? "Gold" : miles >= 5000 ? "Silver" : "Blue", nextAt = miles >= 20000 ? 0 : miles >= 5000 ? 20000 : 5000;
    const days = new Set(evs.map(e => dayKey(e[0])));
    let t = days.has(dayKey(now())) ? now() : now() - DAY, run = 0;
    while (days.has(dayKey(t))) { run++; t -= DAY; }
    const due = CDEFS.filter(d => d.unit === "2" && prog(d.id) && isDue(d.id)).length;
    return { miles, tier, nextAt, run, due, prev: tier === "Gold" ? 20000 : tier === "Silver" ? 5000 : 0 };
  }
  const milesStr = m => m.toLocaleString("en-GB");
  const stats = () => { const p = passport(); return `Miles <b>${milesStr(p.miles)}</b> · ${p.tier} · <b>${p.due}</b> due`; };

  // ---------- Departures board (Unit 2 home) ----------
  const cells = (s, n, cls = "") => `<span class="air-cells ${cls}" aria-hidden="true">${[...(s + " ".repeat(n)).slice(0, n)].map(c => `<span class="air-cell${c === " " ? " sp" : ""}" data-c="${esc(c)}">${c === " " ? "" : esc(c)}</span>`).join("")}</span>`;
  function rowHTML(g) {
    const [k, label] = g.status, nextSay = g.next !== "--:--" && g.next !== "NOW" ? `, next cards ${g.next}` : "";
    return `<button class="air-row" data-ctopic="${g.n}" data-row="${g.n}" aria-label="${g.n} ${esc(g.t.name)}${g.t.hl ? ", higher level" : ""}. Gate ${g.gate}. ${capWord(label)}${nextSay}.">
      <span>${cells(g.next, 5)}</span><span>${cells(g.flight.replace(" ", ""), 5)}</span><span class="dest">${cells(DEST[g.n], 17)}${g.t.hl ? `<span class="air-hl">HL</span>` : ""}</span><span>${cells(g.gate, 3)}</span><span>${cells(label, 15, "st-" + k)}</span>
      <span class="plain" aria-hidden="true"><b>${g.gate}</b><span>${esc(g.t.short)}${g.t.hl ? ` <span class="air-hl">HL</span>` : ""}</span><span class="st-${k}">${esc(capWord(label))}</span></span></button>`;
  }
  const capWord = s => s.charAt(0) + s.slice(1).toLowerCase();
  function passportHTML(gs) {
    const p = passport(), share = p.nextAt ? (p.miles - p.prev) / (p.nextAt - p.prev) : 1;
    const stamps = gs.map(g => g.departed ? `<span class="air-stamp-s got" title="${esc(g.t.name)}: departed">${g.n}<small>${dateOf(g.when)}</small></span>` : `<span class="air-stamp-s" title="${esc(g.t.name)}: not departed yet">${g.n}</span>`).join("");
    return `<aside class="air-pass" aria-label="Your Unit 2 passport">
      <div class="air-pass-h"><h2>Unit 2 passport</h2><span class="tier">${p.tier.toUpperCase()}</span></div>
      <div class="air-pass-rows"><div><span>Miles</span><b>${milesStr(p.miles)}</b></div><div><span>Due today</span><b>${p.due} card${p.due === 1 ? "" : "s"}</b></div><div><span>On-time run</span><b>${p.run} day${p.run === 1 ? "" : "s"}</b></div><div><span>Gates departed</span><b>${gs.filter(g => g.departed).length} of ${gs.length}</b></div></div>
      <div class="air-prog"><i style="--m:${share.toFixed(3)}"></i></div>
      <p class="air-pass-note">${p.nextAt ? `${milesStr(p.nextAt - p.miles)} miles to ${p.tier === "Blue" ? "Silver" : "Gold"}.` : "Gold: the top tier."} Every Unit 2 card or example you grade earns miles: 160 for Easy, 120 for Got it, 40 for Shaky.</p>
      <div class="air-stamps" role="list" aria-label="Gate stamps">${stamps}</div>
      <p class="air-pass-note">A gate is stamped when every term there is mastered and its flight has left.</p></aside>`;
  }
  function boardHTML() {
    const gs = subs().map(t => gate(t.n)), ex = rwe(), exDue = ex.filter(e => prog(e.id) && isDue(e.id)).length, d = new Date();
    return `<div class="air">
      ${wayHTML()}
      <div class="air-boardhead"><svg viewBox="0 0 34 34" aria-hidden="true"><path d="M4 24h26" stroke="currentColor" stroke-width="2.4"/><path d="M6 19.5l3.5-1.2 3 2.2 13-5.2c1.6-.6 3.3.2 3.6 1.4.2.9-.4 1.7-1.4 2.1L10.5 25 6 19.5z" fill="currentColor"/><path d="M14.5 16.8l-3-6 2.4-.9 6.4 4.7z" fill="currentColor"/></svg>
        <h2>Departures</h2><span class="sub">Unit 2 · Microeconomics · ${gs.length} gates</span><span class="air-clock">${pad2(d.getHours())}:${pad2(d.getMinutes())}</span></div>
      <div class="air-board" role="group" aria-label="Unit 2 subtopics as departures">
        <div class="air-row h" aria-hidden="true"><span>Next</span><span>Flight</span><span>Destination</span><span>Gate</span><span>Status</span></div>
        ${gs.map(rowHTML).join("")}
        <p class="air-boardfoot"><span>Open a flight to go to its gate.</span><span>Boarding: cards due · Delayed: overdue · Check-in: not started · Departed: every term mastered</span></p>
      </div>
      <div class="air-lower">${passportHTML(gs)}
        <section class="air-duty" aria-label="Duty free: real-world examples"><p class="k">Duty free</p><h2>${ex.length} real-world examples for Unit 2</h2>
          <p>Recent cases from around the world, each with a story, three numbers and a “but” for a Paper 1 answer. Open one to read it at its gate.${exDue ? ` <b>${exDue} due.</b>` : ""}</p>
          <div class="air-dir">${gs.map(g => { const ys = ex.filter(e => e.n === g.n); return ys.length ? `<div class="row"><span class="g">${g.gate}</span><div>${ys.map(e => `<button class="air-chip" data-airex="${esc(e.key)}" aria-label="${esc(e.mem.tag)}: ${esc(e.title)}. Opens at gate ${g.gate}">${esc(e.mem.tag)}</button>`).join("")}</div></div>` : ""; }).join("")}</div>
          <div class="air-acts"><button class="air-btn" data-view="rwe">Browse and drill <kbd>E</kbd></button></div></section></div>
    </div>`;
  }
  const wayHTML = n => `<nav class="air-way" aria-label="Piers">
      <button data-ctopic="${n ? "u2" : "2.1"}">${n ? `<span class="box"><svg viewBox="0 0 26 26" aria-hidden="true"><path d="M20 13H6M11 8l-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square"/></svg></span>Departures` : `<span class="box">A</span>Gates A1–A6 <small>Markets</small>`}</button>
      ${n ? `<span class="here">Gate ${gateOf(n)} · ${esc(CT[n].short)}</span>` : `<button data-ctopic="2.7"><small>Government and market failure</small> Gates B7–B12 <span class="box">B</span></button>`}</nav>`;
  // The board flips once when a row changes (after a study session), not on every visit
  function flipChanged(el, gs) {
    const changed = gs.filter(g => ui.board[g.n] !== g.status[1] + g.next);
    gs.forEach(g => ui.board[g.n] = g.status[1] + g.next); saveUi();
    if (reduce() || !changed.length) return;
    const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    changed.forEach(g => el.querySelectorAll(`[data-row="${g.n}"] .air-cell:not(.sp)`).forEach((c, i) => {
      const fin = c.dataset.c, steps = 3 + (i % 6); let k = 0;
      const t = setInterval(() => { c.textContent = k++ < steps ? A[(Math.random() * A.length) | 0] : fin; if (k > steps) clearInterval(t); }, 45 + (i % 5) * 6);
    }));
  }

  // ---------- Gate (a subtopic) ----------
  const PLANE_SVG = `<g id="plane">
<defs><clipPath id="planeFus"><path d="M540 191 C541 182 550 171 566 162 C582 153 602 148 630 148 H1146 C1176 149 1206 156 1236 166 L1240 167.5 V176 L1236 177 C1180 186 1120 200 1068 205 H596 C568 205 548 201 540 191 Z"/></clipPath><clipPath id="planeFin"><path id="planeFinShape" d="M1086 160 L1094 148.5 C1112 146 1124 140 1134 128 L1188 64 H1214 L1232 170 Z"/></clipPath></defs>
<g id="noseGear">
<rect x="599.5" y="204" width="3" height="16" fill="#DCD3C1"/>
<rect x="593" y="203" width="5" height="34" fill="#1F4D5A"/>
<rect x="594.2" y="222" width="2.6" height="14" fill="#C4B79D"/>
<path d="M593 224 L588.5 228.5 L593 233" fill="none" stroke="#1F4D5A" stroke-width="1"/><circle cx="588.5" cy="228.5" r="1" fill="#0F2429"/>
<rect x="589" y="236" width="13" height="3" fill="#1F4D5A"/>
<g class="wheel" data-cx="595.5" data-cy="246"><circle cx="595.5" cy="246" r="9" fill="#0F2429"/><circle cx="595.5" cy="246" r="4.5" fill="#C4B79D"/><circle cx="595.5" cy="246" r="1.6" fill="#1F4D5A"/><path d="M595.5 241.5 V243.3" stroke="#1F4D5A" stroke-width=".9"/></g>
</g>
<g id="mainGear">
<path d="M966 214 L946 207" stroke="#1F4D5A" stroke-width="2.4"/><path d="M966 214 L946 207" stroke-dasharray="0"/>
<rect x="972" y="209" width="4.5" height="22" fill="#DCD3C1"/>
<rect x="962.5" y="206" width="8" height="34" fill="#1F4D5A"/>
<rect x="964.3" y="224" width="4.4" height="14" fill="#C4B79D"/>
<path d="M962.5 223 L956 229 L962.5 235" fill="none" stroke="#1F4D5A" stroke-width="1.1"/><circle cx="956" cy="229" r="1.2" fill="#0F2429"/>
<rect x="956" y="238.5" width="21" height="3.5" fill="#1F4D5A"/>
<g class="wheel" data-cx="966.5" data-cy="244"><circle cx="966.5" cy="244" r="11" fill="#0F2429"/><circle cx="966.5" cy="244" r="5.5" fill="#C4B79D"/><circle cx="966.5" cy="244" r="2.0" fill="#1F4D5A"/><path d="M966.5 238.5 V240.7" stroke="#1F4D5A" stroke-width=".9"/></g>
</g>
<g id="fin"><use href="#planeFinShape" fill="#C4472C"/>
<g clip-path="url(#planeFin)"><rect x="1080" y="129" width="160" height="6" fill="#E1A63A"/><path d="M1199 66 L1216 156" stroke="#1F4D5A" stroke-width=".8" fill="none"/></g>
<text x="1176" y="121" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-size="21" font-weight="800" letter-spacing=".5" fill="#EFEAE0">TEU</text></g>
<path id="fuselage" d="M540 191 C541 182 550 171 566 162 C582 153 602 148 630 148 H1146 C1176 149 1206 156 1236 166 L1240 167.5 V176 L1236 177 C1180 186 1120 200 1068 205 H596 C568 205 548 201 540 191 Z" fill="#EFEAE0"/>
<g clip-path="url(#planeFus)">
<rect x="530" y="182" width="720" height="6.5" fill="#C4472C"/><rect x="530" y="190" width="720" height="2" fill="#1F4D5A"/>
<path d="M641 140 V210" stroke="#C4B79D" stroke-width=".6"/>
<path d="M790 140 V210" stroke="#C4B79D" stroke-width=".6"/>
<path d="M1046 140 V210" stroke="#C4B79D" stroke-width=".6"/>
<path d="M1196 140 V210" stroke="#C4B79D" stroke-width=".6"/>
<path d="M600 199.5 H800 M1036 199.5 H1090" stroke="#C4B79D" stroke-width=".6"/>
<path d="M640 155.5 H1140" stroke="#C4B79D" stroke-width=".5"/>
</g>
<path d="M557.5 164 C552 175 552 191 559 202.5" fill="none" stroke="#C4B79D" stroke-width=".8"/>
<g id="cockpit" fill="#16363F"><path d="M562.5 173 L570 164.6 L574 163.6 L574 172.6 Z"/><path d="M576 163.2 L583.5 161.8 L583.5 171.8 L576 172.4 Z"/><path d="M585.5 161.5 L592.5 160.8 L592.5 170.9 L585.5 171.6 Z"/><path d="M594.5 160.6 L600 160.2 L600 167.2 L594.5 170.6 Z"/></g>
<rect id="door" x="604" y="157" width="18" height="35" rx="2.5" fill="none" stroke="#1F4D5A" stroke-width=".9"/>
<rect x="610" y="162" width="6" height="7" rx="1.5" fill="#1F4D5A"/><path d="M607 177 H611" stroke="#1F4D5A" stroke-width="1"/>
<rect id="doorRear" x="1124" y="157" width="16" height="34" rx="2.5" fill="none" stroke="#1F4D5A" stroke-width=".9"/><rect x="1129" y="162" width="6" height="7" rx="1.5" fill="#1F4D5A"/>
<rect x="662" y="192.5" width="30" height="9.5" rx="1.5" fill="none" stroke="#1F4D5A" stroke-width=".7"/>
<rect x="1074" y="192.5" width="24" height="9.5" rx="1.5" fill="none" stroke="#1F4D5A" stroke-width=".7"/>
<rect id="overwingExit" x="892.0" y="159.5" width="22" height="24" rx="2.5" fill="none" stroke="#1F4D5A" stroke-width=".8"/>
<rect class="cw" data-i="0" x="650.0" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="1" x="691.1" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="2" x="732.2" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="3" x="773.3" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="4" x="814.4" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="5" x="855.5" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="6" x="896.5" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="7" x="937.6" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="8" x="978.7" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="9" x="1019.8" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="10" x="1060.9" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<rect class="cw" data-i="11" x="1102.0" y="164" width="13" height="15" rx="5" fill="#1F4D5A"/>
<text x="1148" y="166" font-family="Atkinson Hyperlegible Next, sans-serif" font-size="8" font-weight="700" letter-spacing=".4" fill="#1F4D5A">TU-205</text>
<rect x="1235.5" y="168.8" width="5" height="6.2" rx="1" fill="#16363F"/>
<path d="M700 148 L702 143.5 L705 143.5 L704 148 Z M1010 148 L1012 144 L1015 144 L1014 148 Z" fill="#1F4D5A"/>
<path d="M760 205 L762 209 L765 209 L764 205 Z" fill="#1F4D5A"/>

<path id="bellyFairing" d="M804 205 C814 199 828 196.5 846 196.5 H1000 C1016 196.5 1028 200 1036 205 C1030 211 1012 214 990 214 H850 C826 214 810 211 804 205 Z" fill="#DCD3C1"/>
<path id="stab" d="M1146 179 L1204 173.5 L1235 185.5 L1217 189 Z" fill="#DCD3C1"/><path d="M1192 177 L1224 187.6" stroke="#C4B79D" stroke-width=".7"/>
<g id="wing">
<path d="M1003.2 208.3 C1013.2 206.9 1025.2 207.5 1034.2 209.5 C1025.2 211.8 1013.2 212.8 1005.2 212.3 Z" fill="#C4B79D"/>
<path d="M1019.7 214.3 C1029.7 212.9 1041.7 213.5 1050.7 215.5 C1041.7 217.8 1029.7 218.8 1021.7 218.3 Z" fill="#C4B79D"/>
<path d="M1036.2 220.3 C1046.2 218.9 1058.2 219.5 1067.2 221.5 C1058.2 223.8 1046.2 224.8 1038.2 224.3 Z" fill="#C4B79D"/>
<path d="M836 200 L1032 223 L1066 224.5 L1000 200.5 Z" fill="#DCD3C1"/>
<path d="M978 202.3 L1050 222.4 M850 200.9 L1024 220.3" stroke="#C4B79D" stroke-width=".6"/>
<path d="M1032 223 C1044 220 1052 209 1056 194 L1065 194 C1063 204 1063 214 1066 224.5 Z" fill="#C4472C"/><path d="M1057 198 H1063.6" stroke="#E1A63A" stroke-width="2"/>
<circle id="navPort" cx="1033.5" cy="223" r="1.8" fill="#C4472C"/>
</g>
<g id="engine">
<path d="M846 211 L860 201.5 L926 207 L942 216 L912 214 Z" fill="#DCD3C1"/>
<path d="M906 216.5 H918 L930 219 V231 L918 233.5 H906 Z" fill="#C4B79D"/>
<path d="M928 219.8 L942 225 L928 230.2 Z" fill="#1F4D5A"/>
<path d="M830 210 H890 C900 210 906 212 910 215 L912 217 V233 L910 235 C906 238 900 240 890 240 H830 Z" fill="#1F4D5A"/>
<path d="M868 210.5 V239.5" stroke="#1F4D5A" stroke-width=".8"/><path d="M842 212 H866" stroke="#E1A63A" stroke-width="1.6"/>
<ellipse cx="830" cy="225" rx="5.5" ry="15" fill="#DCD3C1"/><ellipse cx="830.6" cy="225" rx="3.4" ry="11.5" fill="#16363F"/><ellipse cx="830.6" cy="225" rx="1.3" ry="3.4" fill="#C4B79D"/>
</g>
<circle class="beacon" cx="905" cy="146.4" r="2.6" fill="#C4472C"/>
<circle class="beacon" cx="925" cy="215.6" r="2.4" fill="#C4472C"/>
</g>
`;
  const BRIDGE_SVG = `<g id="bridge">
<g id="bridgeRotunda">
<rect x="38" y="214" width="16" height="84" fill="#16363F"/><rect x="42" y="214" width="3" height="84" fill="#E1A63A"/><rect x="30" y="290" width="32" height="6" fill="#E1A63A"/>
<rect x="20" y="124" width="54" height="92" rx="5" fill="#1F4D5A"/><rect x="16" y="118" width="62" height="8" rx="1.5" fill="#16363F"/><path d="M20 150 H74 M20 196 H74" stroke="#16363F" stroke-width=".7"/><path d="M30 126 V214 M64 126 V214" stroke="#2E6878" stroke-width=".8"/><rect x="20" y="206" width="54" height="6" fill="#16363F"/>
</g>
<g id="bridgeTunnel">
<path d="M72 147 L334 149.5 V198.5 L72 196 Z" fill="#1F4D5A" vector-effect="non-scaling-stroke"/><path d="M72 147 L334 149.5 V153 L72 150.5 Z" fill="#2E6878" vector-effect="non-scaling-stroke"/><path d="M72 191 L334 193.5 V198.5 L72 196 Z" fill="#16363F" vector-effect="non-scaling-stroke"/>
<rect x="92" y="159.2" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="136" y="159.6" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="180" y="160.0" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="224" y="160.5" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="268" y="160.9" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<path d="M114 151.4 V190.4" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M158 151.8 V190.8" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M202 152.2 V191.2" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M246 152.7 V191.7" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M290 153.1 V192.1" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M326 145 L562 147.5 V203.5 L326 201 Z" fill="#1F4D5A" vector-effect="non-scaling-stroke"/><path d="M326 145 L562 147.5 V151.5 L326 149 Z" fill="#2E6878" vector-effect="non-scaling-stroke"/><path d="M326 195.5 L562 198 V203.5 L326 201 Z" fill="#16363F" vector-effect="non-scaling-stroke"/><path d="M326 145 H336 V201.1 H326 Z" fill="#16363F" vector-effect="non-scaling-stroke"/>
<rect x="356" y="158.3" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="400" y="158.8" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="444" y="159.2" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="488" y="159.7" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<rect x="532" y="160.2" width="20" height="10" fill="#E1A63A" vector-effect="non-scaling-stroke"/>
<path d="M378 150.6 V195.6" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M422 151.0 V196.0" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M466 151.5 V196.5" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
<path d="M510 151.9 V196.9" stroke="#16363F" stroke-width=".6" vector-effect="non-scaling-stroke"/>
</g>
<g id="bridgeDrive">
<rect x="426" y="201" width="40" height="6" fill="#16363F"/>
<rect x="434" y="207" width="7" height="56" fill="#16363F"/><rect x="436" y="230" width="3" height="32" fill="#1F4D5A"/>
<rect x="452" y="207" width="7" height="56" fill="#16363F"/><rect x="454" y="230" width="3" height="32" fill="#1F4D5A"/>
<rect x="418" y="262" width="56" height="10" fill="#E1A63A"/><rect x="440" y="264" width="12" height="6" fill="#E1A63A"/>
<circle cx="430" cy="281" r="9" fill="#0F2429"/><circle cx="430" cy="281" r="3.6" fill="#16363F"/>
<circle cx="462" cy="281" r="9" fill="#0F2429"/><circle cx="462" cy="281" r="3.6" fill="#16363F"/>
</g>
<g id="bridgeCab">
<rect x="556" y="150" width="44" height="52" fill="#2E6878"/><rect x="554" y="146.5" width="48" height="6" rx="1" fill="#16363F"/><rect x="563" y="158" width="28" height="13" fill="#E1A63A"/><path d="M577 158 V171"/><rect x="565" y="177" width="16" height="9" fill="#E1A63A"/><text x="573" y="184.4" text-anchor="middle" font-family="Atkinson Hyperlegible Next, sans-serif" font-size="7" font-weight="800" fill="#0F2429">A5</text><rect x="556" y="194" width="44" height="8" fill="#16363F"/>
<rect x="586" y="196" width="12" height="4" fill="#E1A63A"/>
<path d="M599 150.5 H608 C611 150.5 612 152.5 612 155 V197 C612 199.5 611 201.5 608 201.5 H599 Z" fill="#16363F"/>
<rect x="600.0" y="151" width="2.4" height="50" fill="#0F2429"/>
<rect x="602.4" y="151" width="2.4" height="50" fill="#16363F"/>
<rect x="604.8" y="151" width="2.4" height="50" fill="#0F2429"/>
<rect x="607.2" y="151" width="2.4" height="50" fill="#16363F"/>
<rect x="609.6" y="151" width="2.4" height="50" fill="#0F2429"/>
<path d="M599 150.5 H608 C611 150.5 612 152.5 612 155 V197 C612 199.5 611 201.5 608 201.5 H599 Z" fill="none" stroke="#0F2429" stroke-width="1"/>
</g>
</g>
`;
  function sceneSVG(g, departedView) {
    const s = [];
    s.push(`<defs><filter id="airGrain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .22  0 0 0 0 .2  0 0 0 0 .16  0 0 0 .2 0"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>`);
    s.push(`<rect width="1280" height="460" fill="#E8E3D8"/><rect width="1280" height="40" fill="#DCD3C1"/>`);
    for (let x = 330; x < 1280; x += 210) s.push(`<rect x="${x}" y="16" width="130" height="6" fill="#EFEAE0"/>`);
    // the view: mustard sky, paper clouds, a darker mustard skyline, teal apron and the yellow taxi line
    s.push(`<rect x="0" y="44" width="1280" height="182" fill="#E1A63A"/><g fill="#EBC172"><rect x="150" y="70" width="300" height="14" rx="7"/><rect x="210" y="88" width="190" height="10" rx="5"/><rect x="760" y="60" width="230" height="12" rx="6"/><rect x="700" y="76" width="140" height="9" rx="4.5"/></g>`);
    s.push(`<g fill="#C98E2C"><path d="M0 226 V206 H120 V196 H260 V208 H330 V226 Z"/><rect x="455" y="98" width="22" height="128"/><path d="M440 98 L448 76 H484 L492 98 Z"/><rect x="462" y="66" width="8" height="10"/><path d="M640 226 V210 L700 196 L760 210 V226 Z M1160 226 V202 H1280 V226 Z"/></g>`);
    s.push(`<rect x="0" y="226" width="1280" height="74" fill="#1F4D5A"/><rect x="0" y="226" width="1280" height="4" fill="#16363F"/><path d="M640 300 C 760 262 960 254 1280 254" fill="none" stroke="#E1A63A" stroke-width="3.5"/>`);
    if (!departedView) s.push(`<g id="planeMove"><g id="planeTurn">${PLANE_SVG}</g></g>`);
    s.push(BRIDGE_SVG);
    // window wall
    s.push(`<rect x="0" y="38" width="1280" height="8" fill="#16363F"/><rect x="0" y="296" width="1280" height="12" fill="#16363F"/>`);
    for (let x = 0; x <= 1280; x += 160) s.push(`<rect x="${x - 4}" y="44" width="8" height="254" fill="#16363F"/>`);
    s.push(`<rect x="0" y="308" width="1280" height="152" fill="#E8E3D8"/>`);
    [340, 384, 432].forEach(y => s.push(`<path d="M0 ${y} H1280" stroke="#D6CEBC" stroke-width="1.5"/>`));
    // overhead gate sign, desk screen, boarding lane
    const signT = g.departed ? "Departed" : g.t.short.length > 17 ? g.t.short.slice(0, 16) + "…" : g.t.short;
    s.push(`<path d="M80 0 V58 M262 0 V58" stroke="#16363F" stroke-width="2.5"/><rect x="40" y="58" width="270" height="74" fill="#16363F"/><rect x="40" y="58" width="86" height="74" fill="#E1A63A"/>`);
    s.push(`<text x="83" y="110" text-anchor="middle" font-size="${g.gate.length > 2 ? 32 : 40}" font-weight="800" fill="#16363F" ${F}>${g.gate}</text><text x="140" y="88" font-size="13" font-weight="700" fill="#A9BDC0" ${F} letter-spacing="1.5">GATE</text><text id="signT" x="140" y="114" font-size="20" font-weight="800" fill="#EFEAE0" ${F}>${esc(signT)}</text>`);
    s.push(`<rect x="212" y="300" width="8" height="70" fill="#16363F"/><rect x="118" y="236" width="196" height="104" fill="#0F2429"/>`);
    s.push(`<g ${M} font-weight="700"><text x="132" y="262" font-size="15" fill="#E1A63A">${g.flight}  ${g.gate}</text><text x="132" y="284" font-size="12" fill="#EFEAE0">${esc(DEST[g.n])}</text><text id="fidsS" x="132" y="306" font-size="13" fill="#E1A63A">${g.status[1].slice(0, 22)}</text><text id="fidsN" x="132" y="326" font-size="11" fill="#C9D5D6">${g.departed ? "DEP " + dateOf(g.when) : g.due ? `GROUP 1  ${g.due} DUE` : g.fresh ? `${g.fresh} TO CHECK IN` : "NEXT " + g.next}</text></g>`);
    s.push(`<rect x="92" y="370" width="250" height="64" fill="#1F4D5A"/><rect x="86" y="362" width="262" height="10" fill="#16363F"/><rect x="112" y="388" width="70" height="8" fill="#E1A63A"/><rect x="92" y="420" width="250" height="14" fill="#C4472C"/>`);
    s.push(`<path d="M372 352 H436" stroke="#C4472C" stroke-width="5"/><rect x="368" y="344" width="7" height="76" fill="#1F4D5A"/><rect x="433" y="344" width="7" height="76" fill="#1F4D5A"/><rect x="361" y="418" width="21" height="5" fill="#16363F"/><rect x="426" y="418" width="21" height="5" fill="#16363F"/>`);
    s.push(`<rect x="356" y="318" width="96" height="24" fill="#16363F"/><text id="laneT" x="404" y="334" text-anchor="middle" font-size="11.5" font-weight="800" fill="#E1A63A" ${F}>${g.departed ? "GATE CLOSED" : g.due ? "GROUP 1 · DUE" : "CHECK-IN"}</text>`);
    // the lounge: one seat per term, in rows of six
    const rows = Math.ceil(g.terms.length / 6);
    g.terms.forEach((d, i) => {
      const r = Math.floor(i / 6), x = 494 + (i % 6) * 120 + r * 26, y = r ? 392 : 338, st = g.st[i], empty = st === "gone";
      s.push(`<g class="air-seat" tabindex="0" role="button" data-i="${i}" aria-label="${esc(d.t)}: ${SEAT_WORD[st]}"><title>${esc(d.t)}: ${SEAT_WORD[st]}</title>
        <rect class="back" x="${x}" y="${y}" width="96" height="30" fill="${empty ? "#DCD3C1" : SEAT_FILL[st]}" ${empty ? 'stroke="#8C7F66" stroke-width="1.5" stroke-dasharray="5 4"' : ""}/>
        <rect x="${x - 3}" y="${y + 30}" width="102" height="9" fill="${empty ? "#D3C9B5" : "#16363F"}"/>
        <text x="${x + 48}" y="${y + 20}" text-anchor="middle" font-size="13" font-weight="700" fill="${empty ? "#8C7F66" : SEAT_INK[st]}" ${M}>${esc(d.tk)}</text></g>`);
    });
    for (let r = 0; r < rows; r++) {
      const y = r ? 392 : 338, n = Math.min(6, g.terms.length - r * 6), w = n * 120 - 16;
      s.push(`<rect x="${490 + r * 26}" y="${y + 39}" width="${w}" height="5" fill="#16363F"/>` + [0, 2, 4, 6].filter(k => k * 118 < w).map(k => `<rect x="${500 + r * 26 + k * 118}" y="${y + 44}" width="5" height="${r ? 18 : 14}" fill="#16363F"/>`).join(""));
    }
    s.push(`<rect width="1280" height="460" filter="url(#airGrain)" pointer-events="none"/>`);
    return s.join("");
  }
  // Cabin windows: one per term, lit when that term is on board
  function paintPlane(svg, g) {
    svg.querySelectorAll(".cw").forEach(w => {
      const i = +w.dataset.i, on = g.st[i] === "gone";
      w.style.display = i < g.terms.length ? "" : "none";
      w.style.fill = on ? "#E1A63A" : ""; w.style.stroke = on ? "#16363F" : ""; w.style.strokeWidth = on ? "1.6" : "";
    });
    const d = svg.querySelector("#door"); if (d) d.style.fill = "#16363F";
  }
  function retractBridge(svg) {
    [["#bridgeCab", "translateX(-70px)"], ["#bridgeTunnel", "scaleX(.857)"], ["#bridgeDrive", "translateX(-53px)"]].forEach(([s, t]) => { const el = svg.querySelector(s); if (el) el.style.transform = t; });
  }
  const pax = (g, i) => { const d = g.terms[i], st = g.st[i]; return `<div class="air-pax" id="pax-${i}"><span class="seat">${esc(d.tk)}</span><div><b>${esc(d.t)}${hlMark(d.hl && !g.t.hl)}</b><p>${esc(d.d)}</p></div><span class="ps p-${st}">${PAX_WORD[st]}</span></div>`; };
  const ORDER = { late: 0, board: 1, new: 2, wait: 3, gone: 4 };
  function gateHTML(n) {
    const g = gate(n), t = g.t, i = COURSE.indexOf(t), prev = COURSE[i - 1], next = COURSE[i + 1], ex = rwe().filter(e => e.topics.includes(n));
    const seen = g.departed && ui.seen[n];
    const order = g.terms.map((d, j) => j).sort((a, b) => ORDER[g.st[a]] - ORDER[g.st[b]] || a - b);
    const list = (xs, cls = "") => `<ul class="${cls}">${xs.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const sec = (title, sub, body) => `<section class="air-sec"><h3>${title}${sub ? ` <span>${sub}</span>` : ""}</h3>${body}</section>`;
    const nx = next && next.unit === "2" ? next : null, pv = prev && prev.unit === "2" ? prev : null;
    const btn = g.departed ? (nx ? `<button class="air-btn" data-ctopic="${nx.n}">Next gate: ${gateOf(nx.n)}</button>` : `<button class="air-btn" data-ctopic="u2">Back to departures</button>`)
      : g.due + g.fresh ? `<button class="air-btn" data-view="cards">Board now <kbd>D</kbd></button>` : `<button class="air-btn" data-view="cards">Open flashcards <kbd>D</kbd></button>`;
    const counts = g.departed ? `All ${g.terms.length} terms on board. Gate ${g.gate} is stamped in your passport.` : `${g.due} due · ${g.fresh} new · ${g.wait} waiting · ${g.gone} on board`;
    return `<div class="air air-gate">
      ${wayHTML(n)}
      <h2 class="air-title">${n} ${esc(t.name)}${hlMark(t.hl)}</h2>
      <div class="air-scene"><div class="air-dep" id="airStamp" aria-hidden="true"${seen ? ' style="opacity:1"' : ""}>${n} DEPARTED<small>${esc(DEST[n])} · ${g.when ? dateOf(g.when) : ""}</small></div>
        <svg id="airScene" viewBox="0 0 1280 460" role="group" aria-label="Gate ${g.gate}. The lounge seats the terms still to master; each mastered term has boarded the plane and lit a window.">${sceneSVG(g, seen)}</svg></div>
      <div class="air-fids" aria-label="Flight information"><div class="f1"><span class="fl">${g.flight}</span><span class="fd">${esc(t.short)}</span><span class="fg">Gate ${g.gate}</span></div>
        <div class="f2"><span class="fs" id="airS">${g.status[1]}</span><span id="airN">${counts}</span></div>${btn}
        ${seen ? `<button class="air-link light" data-air="replay">Watch it leave again</button>` : ""}</div>
      <p class="air-legend"><i class="lg due"></i>Due <i class="lg late"></i>Overdue <i class="lg new"></i>New <i class="lg wait"></i>Waiting, not due yet <i class="lg gone"></i>Empty seat: mastered, so that term is on the plane and its window is lit</p>
      <p class="air-big">${esc(t.big)}</p>
      ${dutyHTML(n, sec)}
      <div class="air-grid">
        <div>
          ${sec("Passenger list", `${g.terms.length} definitions to learn word for word, weakest first`, `<div class="air-manifest">${order.map(j => pax(g, j)).join("")}</div>`)}
          ${t.points.length ? sec("Flight briefing", "key ideas", list(t.points)) : ""}
          ${t.eval.length ? sec("Evaluate with", "", list(t.eval)) : ""}
        </div>
        <div>
          ${t.traps.length ? sec("Gate announcements", "exam traps", t.traps.map(x => `<div class="air-tannoy"><p class="k"><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2 7h3l5-4v12l-5-4H2z" fill="currentColor"/><path d="M13 6c1.3 1.6 1.3 4.4 0 6" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>Announcement</p><p>${esc(x)}</p></div>`).join("")) : ""}
          ${t.diagrams.length ? sec("Window seat", "diagrams to draw", `<div class="air-window">${t.diagrams.map(dg => diagramFig({ ...dg, hl: dg.hl && !t.hl })).join("")}</div>`) : ""}
          ${t.formulas.length ? sec("Fare rules", "formulas and calculations", `<table class="ftable">${t.formulas.map(f => `<tr><td style="width:34%"><b>${esc(f.name)}</b>${hlMark(f.hl && !t.hl)}</td><td><span class="f">${esc(f.f)}</span>${f.note ? `<p class="note" style="margin-top:4px">${esc(f.note)}</p>` : ""}</td></tr>`).join("")}</table>`) : ""}
          ${t.mnemonics.length ? sec("Memory aids", "", `<div class="mnem">${t.mnemonics.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`) : ""}
        </div>
      </div>
      <div class="pager">${pv ? `<button class="btn" data-ctopic="${pv.n}">Back: Gate ${gateOf(pv.n)} ${esc(pv.short)}</button>` : `<button class="btn" data-ctopic="u2">Departures</button>`}${nx ? `<button class="btn" data-ctopic="${nx.n}">Next: Gate ${gateOf(nx.n)} ${esc(nx.short)}</button>` : ""}</div>
    </div>`;
  }
  // The gate's own examples first, then ones from other gates that also fit here
  function dutyHTML(n, sec) {
    const ex = rwe().filter(e => e.topics.includes(n)), own = ex.filter(e => e.n === n), also = ex.filter(e => e.n !== n);
    if (!ex.length) return sec("Duty free", "real-world examples", `<p class="note">No examples for this gate yet.</p>`);
    return `<section class="air-sec air-dutysec" id="airDuty"><h3>Duty free <span>${ex.length} real-world example${ex.length === 1 ? "" : "s"} for this gate: open one to read it</span></h3>
      <div class="air-dutylist">${own.map(exHTML).join("")}</div>
      ${also.length ? `<p class="air-also">Also useful here, from other gates</p><div class="air-dutylist">${also.map(exHTML).join("")}</div>` : ""}
      <div class="air-acts"><button class="air-btn ghost" data-view="rwe">Drill ${ex.length === 1 ? "this example" : `these ${ex.length} examples`} <kbd>E</kbd></button></div></section>`;
  }
  const rankLine = e => `<p class="air-rank">Ranked <b>${e.rank} of ${e.of}</b> for gate ${gateOf(e.n)} on exam value (${e.score} of 100 for relevance, evaluation, data and recency: our rating, not an examiner's)</p>`;
  const exHTML = e => `<details class="air-ex" data-ex="${esc(e.key)}"><summary><span class="code">${esc(e.tk)}</span><span><b>${esc(e.mem.tag)}</b><span class="t">${esc(e.title)} · ${esc(e.region)} · ${esc(e.years)}</span></span>${prog(e.id) ? stateTag(e.id) : `<span class="gate">${gateOf(e.n)}</span>`}</summary>
    <div class="air-exbody">${storyHTML(e.mem)}${numsHTML(e.mem)}<p class="use"><b>Use it for</b> ${esc(e.mem.use)}</p>${butHTML(e.mem)}${rankLine(e)}
    <details class="more"><summary>Facts, diagram, evaluation and sources</summary>${factSheet(e)}</details></div></details>`;

  // ---------- The departure: door shuts, bridge pulls back, pushback, turn, taxi away ----------
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const anim = (el, kf, duration, easing = "cubic-bezier(0.77, 0, 0.175, 1)") => el ? el.animate(kf, { duration, easing, fill: "forwards" }).finished : Promise.resolve();
  async function depart(svg, g) {
    const $s = q => svg.querySelector(q), alive = () => svg.isConnected;
    const setStatus = t => { const a = document.getElementById("airS"); if (a) a.textContent = t; const f = $s("#fidsS"); if (f) f.textContent = t; };
    const move = $s("#planeMove"), turn = $s("#planeTurn");
    setStatus("BOARDING COMPLETE"); await wait(reduce() ? 0 : 700); if (!alive()) return;
    if (reduce()) { move?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" }); retractBridge(svg); return finish(svg, g); }
    const door = $s("#door");
    if (door) { await door.animate([{ fillOpacity: 1 }, { fillOpacity: 0 }], { duration: 450, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" }).finished; door.style.fill = "none"; }
    setStatus("GATE CLOSED"); { const ln = $s("#laneT"); if (ln) ln.textContent = "GATE CLOSED"; }
    await Promise.all([anim($s("#bridgeCab"), [{ transform: "translateX(0)" }, { transform: "translateX(-70px)" }], 1100), anim($s("#bridgeTunnel"), [{ transform: "scaleX(1)" }, { transform: "scaleX(.857)" }], 1100), anim($s("#bridgeDrive"), [{ transform: "translateX(0)" }, { transform: "translateX(-53px)" }], 1100)]);
    if (!alive()) return;
    const blink = [...svg.querySelectorAll(".beacon")].map(b => b.animate([{ opacity: 1 }, { opacity: .1 }, { opacity: 1 }], { duration: 900, iterations: Infinity }));
    setStatus("PUSHBACK");
    await anim(move, [{ transform: "translateX(0)" }, { transform: "translateX(150px)" }], 2000);
    // turn to face the taxiway: squeeze to edge-on, flip, open out; the tail lettering is flipped back so it still reads
    await anim(turn, [{ transform: "scaleX(1)" }, { transform: "scaleX(0.02)" }], 520, "cubic-bezier(0.55, 0, 1, 0.45)");
    turn.querySelectorAll("text").forEach(t => { t.style.transformBox = "fill-box"; t.style.transformOrigin = "center"; t.style.transform = "scaleX(-1)"; });
    await anim(turn, [{ transform: "scaleX(-0.02)" }, { transform: "scaleX(-1)" }], 520, "cubic-bezier(0.23, 1, 0.32, 1)");
    setStatus("TAXIING");
    const spin = [...turn.querySelectorAll(".wheel")].map(w => w.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], { duration: 700, iterations: Infinity }));
    await anim(move, [{ transform: "translateX(150px)" }, { transform: "translateX(1250px)" }], 3200, "cubic-bezier(0.5, 0, 0.9, 0.6)");
    blink.forEach(b => b.cancel()); spin.forEach(w => w.cancel());
    if (alive()) finish(svg, g);
  }
  function finish(svg, g) {
    const setT = (q, t) => { const el = svg.querySelector(q); if (el) el.textContent = t; };
    setT("#fidsS", "DEPARTED"); setT("#fidsN", "DEP " + dateOf(g.when || now())); setT("#signT", "Departed"); setT("#laneT", "GATE CLOSED");
    const a = document.getElementById("airS"); if (a) a.textContent = "DEPARTED";
    const st = document.getElementById("airStamp");
    st?.animate([{ opacity: 0, transform: "translate(-50%, -50%) rotate(-8deg) scale(1.12)" }, { opacity: 1, transform: "translate(-50%, -50%) rotate(-8deg) scale(1)" }], { duration: reduce() ? 1 : 260, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" });
    say(`Flight ${g.flight} has departed. Gate ${g.gate} is stamped in your passport.`);
  }

  // ---------- Notes view ----------
  let host = null;
  function render(el) {
    if (host !== el) { host = el; wire(el); }
    const n = CT[S.ctopic]?.unit === "2" ? S.ctopic : null;
    if (!n) { el.innerHTML = boardHTML(); flipChanged(el, subs().map(t => gate(t.n))); return; }
    const g = gate(n);
    if (!g.departed && ui.seen[n]) { delete ui.seen[n]; saveUi(); }
    el.innerHTML = gateHTML(n);
    const svg = el.querySelector("#airScene");
    if (g.departed && ui.seen[n]) retractBridge(svg);
    else {
      paintPlane(svg, g);
      if (g.departed) { ui.seen[n] = now(); saveUi(); setTimeout(() => depart(svg, g), reduce() ? 0 : 600); }
    }
  }
  function replay() {
    const n = S.ctopic, g = gate(n); if (!g.departed || !host) return;
    const svg = host.querySelector("#airScene"); svg.innerHTML = sceneSVG(g, false); paintPlane(svg, g);
    host.querySelector("#airStamp").style.opacity = 0; host.querySelector("#airStamp").getAnimations().forEach(a => a.cancel());
    depart(svg, g);
  }
  function wire(el) {
    el.addEventListener("click", ev => {
      const b = ev.target.closest('[data-air], .air-seat'); if (!b || !el.contains(b)) return;
      if (b.dataset.air === "replay") replay();
      else if (b.classList.contains("air-seat")) {
        const r = el.querySelector("#pax-" + b.dataset.i); if (!r) return;
        r.scrollIntoView({ block: "center", behavior: reduce() ? "auto" : "smooth" });
        r.classList.remove("lit"); void r.offsetWidth; r.classList.add("lit");
      }
    });
    el.addEventListener("keydown", ev => { const s = ev.target.closest?.(".air-seat"); if (s && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); s.dispatchEvent(new MouseEvent("click", { bubbles: true })); } });
  }
  // D opens the flashcards for this gate, E the examples
  function key(ev) {
    const k = ev.key.toLowerCase();
    if (ev.target.closest?.("input, textarea, select")) return false;
    if (k === "d") { show("cards"); return true; }
    if (k === "e") { show("rwe"); return true; }
    return false;
  }

  // ---------- Flashcards: the boarding pass ----------
  const GROUP = { new: "New", late: "Overdue", board: "Due now", wait: "Early", gone: "On board" };
  function itinerary() {
    const t0 = new Date().setHours(0, 0, 0, 0), evs = CDEFS.filter(d => d.unit === "2" && inScope(d)).flatMap(d => evOf(d.id)).filter(e => e[0] >= t0);
    const c = g => evs.filter(e => g(e[3])).length, mi = evs.reduce((a, e) => a + MILES[e[3]], 0);
    const ready = subs().map(t => gate(t.n)).find(g => g.departed && !ui.seen[g.n]);
    return `<div class="air-itin"><span class="k">Today's itinerary</span><span>Boarded <b>${c(x => x >= 2)}</b></span><span>Standby <b>${c(x => x === 1)}</b></span><span>Missed <b>${c(x => x === 0)}</b></span><span>Miles <b>+${milesStr(mi)}</b></span>${ready ? `<span class="go">${ready.flight} is fully boarded. <button class="air-link" data-airgo="${ready.n}">Watch it leave</button></span>` : ""}</div>`;
  }
  function pass(x, body, hideSeat) {
    const t = CT[x.n], seat = hideSeat ? `<span aria-label="Seat hidden until you flip">· · ·</span>` : esc(x.tk);
    return itinerary() + `<div class="air-bp"><div class="band"><span>TEU Air · Boarding pass</span><span>Flight <b>${flightOf(x.n)}</b> · Gate <b>${gateOf(x.n)}</b></span></div>
      <div class="main"><div class="fields"><div><span>From</span><b>${x.n} ${esc(t.short)}</b></div><div><span>Seat</span><b>${seat}</b></div><div><span>Group</span><b>${GROUP[seatOf(x.id)]}</b></div><div><span>Class</span><b>${x.hl ? "HL" : "SL and HL"}</b></div></div>${body}</div>
      <div class="stub" aria-hidden="true"><div class="fields"><div><span>Gate</span><b>${gateOf(x.n)}</b></div><div><span>Seat</span><b>${seat}</b></div><div><span>Flight</span><b>${flightOf(x.n)}</b></div><div><span>Class</span><b>${x.hl ? "HL" : "SL/HL"}</b></div></div><div class="barcode"></div><p>Tear here when you grade</p></div></div>`;
  }
  document.addEventListener("click", ev => {
    const x = ev.target.closest("[data-airex]"); if (!x) return;
    ev.stopPropagation();
    const e = rwe().find(e => e.key === x.dataset.airex); if (!e) return;
    setScope(e.n); show("notes");
    const d = document.querySelector(`#notes [data-ex="${CSS.escape(e.key)}"]`); if (!d) return;
    d.open = true; d.scrollIntoView({ block: "start", behavior: reduce() ? "auto" : "smooth" }); d.querySelector("summary").focus({ preventScroll: true });
  }, true);
  document.addEventListener("click", ev => {
    const b = ev.target.closest("[data-airgo]"); if (!b) return;
    ev.stopPropagation(); setScope(b.dataset.airgo); show("notes"); window.scrollTo({ top: 0 });
  }, true);

  // ---------- Examples drill: Recall (graded), Numbers and Pick the example (practice) ----------
  let rweList = null;
  function rwe() {
    if (rweList) return rweList;
    rweList = (typeof MICRO === "undefined" ? [] : MICRO).map(e => {
      const topics = String(e.subtopic).match(/2\.\d+/g) || ["2.1"], sc = scoreOf(e.rating);
      return { ...e, key: e.id, id: "x:" + e.id, tk: String(e.tk || "").toUpperCase(), topics, n: topics[0], score: sc, tier: tierOf(sc) };
    }).sort((a, b) => a.n.localeCompare(b.n, undefined, { numeric: true }) || b.score - a.score);
    for (const n of new Set(rweList.map(e => e.n))) rweList.filter(e => e.n === n).forEach((e, i, xs) => { e.rank = i + 1; e.of = xs.length; });
    return rweList;
  }
  const RBY = id => rwe().find(e => e.id === id);
  const RM = { browse: "Browse", recall: "Recall", numbers: "Numbers", pick: "Pick the example" };
  const BATCH = 6;                                   // new examples per batch, so a cold start stays short
  const R = { mode: RM[ui.rmode] ? ui.rmode : "browse", cur: null, flipped: false, sess: null, undo: null, redo: null, num: null, pick: null, batch: BATCH, newDone: 0, ticks: new Set(), touched: false, focusCard: false };
  let rhost = null;
  const rScope = () => CT[S.ctopic]?.unit === "2" ? S.ctopic : "u2";
  const rPool = () => { const n = rScope(); return n === "u2" ? rwe() : rwe().filter(e => e.topics.includes(n)); };
  function rQueue() {
    const xs = rPool();
    if (R.redo?.length) return R.redo.map(RBY).filter(e => e && xs.includes(e));
    const fresh = xs.filter(e => !prog(e.id)).slice(0, Math.max(0, R.batch - R.newDone));
    return [...xs.filter(e => prog(e.id) && isDue(e.id)).sort((a, b) => prog(a.id).due - prog(b.id).due), ...fresh];
  }
  const unlisted = () => rPool().filter(e => !prog(e.id)).length;
  function rNewNum() {
    const xs = rPool(); if (!xs.length) return R.num = null;
    const e = xs.slice().sort((a, b) => (prog(a.id)?.box ?? -1) - (prog(b.id)?.box ?? -1))[rand(Math.min(6, xs.length))], [num, w] = e.mem.numbers[rand(e.mem.numbers.length)];
    R.num = { id: e.id, n: num, w, answered: false };
  }
  // Wrong options come from other gates where possible, and never share the concept being asked about
  function rNewPick() {
    const xs = rPool().filter(e => e.concepts.length); R.pick = null;
    const clash = (e, nc) => e.concepts.some(k => { const nk = norm(k); return nk.includes(nc) || nc.includes(nk); });
    for (let i = 0; i < 80 && xs.length; i++) {
      const t = xs[rand(xs.length)], c = t.concepts[rand(t.concepts.length)], nc = norm(c);
      const ok = rwe().filter(e => e !== t && !clash(e, nc)), far = ok.filter(e => !e.topics.some(x => t.topics.includes(x)));
      const dis = i < 60 ? far : ok;
      if (dis.length >= 3) { R.pick = { id: t.id, concept: c.charAt(0).toUpperCase() + c.slice(1), opts: shuffle([t, ...shuffle(dis).slice(0, 3)]).map(e => e.id), choice: null }; return; }
    }
  }
  const scoreLine = k => { const x = P.rwe?.[k] || { right: 0, total: 0 }; return `<p class="score-line">${x.right} of ${x.total} right overall · practice only, nothing is rescheduled</p>`; };
  const GR = ["again", "hard", "good", "easy"], GL = { again: "Forgot", hard: "Shaky", good: "Got it", easy: "Easy" };
  const suggested = () => { const c = R.ticks.size; return c === 5 ? "easy" : c >= 3 ? "good" : c >= 1 ? "hard" : "again"; };
  const suggestHTML = () => R.touched
    ? `Suggested: <b>${GL[suggested()]}</b> (${R.ticks.size} of 5). <kbd>Enter</kbd> to accept, or <kbd>1</kbd>–<kbd>4</kbd> to choose.`
    : `Tick what you got right (<kbd>Q</kbd> <kbd>W</kbd> <kbd>E</kbd> <kbd>R</kbd> <kbd>T</kbd>), then <kbd>Enter</kbd>. Or grade straight away with <kbd>1</kbd>–<kbd>4</kbd>.`;
  function tickList(e) {
    const rows = [["The story", storyHTML(e.mem)], ...e.mem.numbers.map(([v, w]) => [v, `<span class="w">${esc(w)}</span>`]), ["The but", `<p>${esc(e.mem.but)}</p>`]];
    return `<div class="air-checks" role="group" aria-label="Tick what you got right">${rows.map(([h, body], i) => {
      const on = R.ticks.has(i), what = i === 0 ? "the story" : i === 4 ? "the but" : "the number " + h;
      return `<div class="air-tickrow${on ? " on" : ""}"><button class="air-tick" data-tick="${i}" aria-pressed="${on}" aria-label="Got ${esc(what)}"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg></button><kbd aria-hidden="true">${"QWERT"[i]}</kbd><div class="body"><b class="${i > 0 && i < 4 ? "fig" : ""}">${esc(h)}</b>${body}</div></div>`;
    }).join("")}</div><p class="use"><b>Use it for</b> ${esc(e.mem.use)}</p>`;
  }
  function updateSuggest() {
    rhost.querySelectorAll(".air-tick").forEach(b => { const on = R.ticks.has(+b.dataset.tick); b.setAttribute("aria-pressed", on); b.parentElement.classList.toggle("on", on); });
    const sg = rhost.querySelector("#rSuggest"); if (sg) sg.innerHTML = suggestHTML();
    rhost.querySelectorAll("[data-rgrade]").forEach(b => b.toggleAttribute("data-hint", R.touched && b.dataset.rgrade === suggested()));
  }
  function toggleTick(i) { if (R.ticks.has(i)) R.ticks.delete(i); else R.ticks.add(i); R.touched = true; updateSuggest(); }
  function rFlip() {
    R.flipped = true; R.ticks = new Set(); R.touched = false;
    renderRwe(rhost); say("Answer shown. Tick what you got right, then grade.");
    rhost.querySelector(".air-bp")?.focus({ preventScroll: true });
  }
  const receipt = (e, inner, fields = true) => `<div class="air-bp air-receipt" tabindex="-1"><div class="band"><span>TEU Air · Duty free · Real-world example</span><span>Gate <b>${gateOf(e.n)}</b> · ${e.n} ${esc(CT[e.n].short)}</span></div>
    <div class="main">${fields ? `<div class="fields"><div><span>Code</span><b>${esc(e.tk)}</b></div><div><span>Region</span><b>${esc(e.region)}</b></div><div><span>Years</span><b>${esc(e.years)}</b></div><div><span>Status</span><b>${prog(e.id) ? stateLabel[stateOf(e.id)] : "New"}</b></div></div>` : ""}${inner}</div></div>`;
  function lastLine() {
    const L = R.sess?.last; if (!L) return "";
    const e = RBY(L.id), back = L.due - now() < 60000 ? "back in a few minutes" : `back in ${previewWhenAir(L.due)}`;
    return `<div class="air-last" aria-live="polite"><span class="k">Last</span><b>${esc(e.mem.tag)}</b><span>${GRADE_WORDS[L.g]}, ${back}</span><button class="air-link" data-rundo="1">Undo <kbd>U</kbd></button></div>`;
  }
  const previewWhenAir = due => { const m = (due - now()) / 60000; const d = Math.round(m / 1440); return m < 60 ? Math.max(1, Math.round(m)) + " min" : m < 1380 ? Math.round(m / 60) + " hours" : d + (d === 1 ? " day" : " days"); };
  function landed() {
    const s = R.sess; if (!s || !s.n) return "";
    const missed = s.missed.map(RBY).filter(Boolean);
    return `<section class="air-landed" aria-label="Session summary"><p class="k">Landed</p><h3>You drilled ${s.n} example${s.n === 1 ? "" : "s"} and earned ${milesStr(s.miles)} miles.</h3>
      ${missed.length ? `<p>To drill again:</p><ul>${missed.map(e => `<li><b>${esc(e.tk)}</b> ${esc(e.mem.tag)}</li>`).join("")}</ul><button class="air-btn" data-rredo="1">Drill these ${missed.length} again <kbd>Enter</kbd></button>`
        : `<p>Nothing missed. Every example here is up to date.</p>`}</section>`;
  }
  function renderRwe(el) {
    if (rhost !== el) { rhost = el; wireRwe(el); }
    if (!rwe().length) { el.innerHTML = `<div class="empty">No Unit 2 examples loaded.</div>`; return; }
    const xs = rPool(), n = rScope(), q = rQueue(), where = n === "u2" ? "Unit 2" : `gate ${gateOf(n)} (${n} ${CT[n].short})`;
    const seg = `<div class="air-seg" role="group" aria-label="Drill type">${Object.entries(RM).map(([k, v]) => `<button data-rx="mode" data-v="${k}" aria-pressed="${R.mode === k}">${v} <kbd aria-label="Shift ${v[0]}">⇧${v[0]}</kbd></button>`).join("")}</div>`;
    let body = "";
    if (!xs.length) body = `<div class="empty">No examples for ${esc(where)} yet. <button class="btn" data-ctopic="u2">Use all of Unit 2</button></div>`;
    else if (R.mode === "browse") {
      const groups = (n === "u2" ? subs().map(t => t.n) : [n]).map(k => [k, xs.filter(e => n === "u2" ? e.n === k : true)]).filter(([, ys]) => ys.length);
      body = `<div class="progress-line"><span>${xs.length} example${xs.length === 1 ? "" : "s"} in ${esc(where)}. Open any one to read it; drill them with Recall when you're ready.</span><span><button class="air-link" data-rx="mode" data-v="recall">Start drilling <kbd>⇧R</kbd></button></span></div>
        ${groups.map(([k, ys]) => `<section class="air-browse"><h3><span class="g">${gateOf(k)}</span>${k} ${esc(CT[k].short)} <small>${ys.length}</small></h3><div class="air-dutylist">${ys.map(exHTML).join("")}</div></section>`).join("")}`;
    } else if (R.mode === "recall") {
      if (!R.cur || !q.some(e => e.id === R.cur)) { R.cur = q[0]?.id || null; R.flipped = false; }
      const left = unlisted();
      const info = `<div class="progress-line"><span>${q.length ? `${q.length} to drill in ${esc(where)}, about ${Math.max(1, Math.round(q.length * 1.5))} min` : `Nothing due in ${esc(where)}`}${R.sess?.n ? ` · ${R.sess.n} drilled this session` : ""}</span><span>${xs.length} examples${left ? ` · ${left} not started` : ""}</span></div>`;
      if (!R.cur) {
        const more = left ? `<div class="air-batch"><p>${left} example${left === 1 ? "" : "s"} here ${left === 1 ? "hasn't" : "haven't"} been started. They come in batches of ${BATCH}, so each session stays short.</p><button class="air-btn" data-rmore="1">Start the next ${Math.min(BATCH, left)} <kbd>M</kbd></button></div>` : "";
        body = info + (landed() || (more ? "" : `<div class="empty">All caught up in ${esc(where)}. Try Numbers or Pick the example, or pick another gate.</div>`)) + more;
      } else {
        const e = RBY(R.cur);
        const front = `<h2 class="title">${esc(e.mem.tag)}</h2><p class="note">${esc(e.cue)}</p>`;
        const back = R.flipped ? `${tickList(e)}<p class="air-suggest" id="rSuggest" aria-live="polite">${suggestHTML()}</p>${gradeRow("data-rgrade", e.id)}${rankLine(e)}<details class="more"><summary>Facts, diagram, evaluation and sources</summary>${factSheet(e)}</details>`
          : `<p class="prompt">Say the story, the three numbers and the “but” out loud, as you'd use them in a Paper 1 answer.</p>${flipButton('data-rflip="1"')}`;
        body = info + lastLine() + receipt(e, front + back);
      }
    } else if (R.mode === "numbers") {
      if (!R.num || !xs.some(e => e.id === R.num.id)) rNewNum();
      const e = RBY(R.num.id), A = R.num;
      const blank = A.answered ? `<span class="num-hl">${esc(A.n)}</span>` : `<input id="rNumIn" class="field" inputmode="decimal" autocomplete="off" aria-label="The number">`;
      body = receipt(e, `<h2 class="title">${esc(e.cue)}</h2><p class="note">${esc(e.mem.tag)}</p><div class="cloze">${blank} <span>${esc(A.w)}</span></div>
        ${A.answered ? `<div class="feedback ${A.ok ? "ok" : "no"}"><b>${A.ok ? "Right." : `Not quite. You wrote ${esc(A.given || "nothing")}.`}</b><p class="detail">The answer is ${esc(A.n)}.</p>${storyHTML(e.mem)}</div><div><button class="air-btn" data-rx="next">Next number <kbd>Enter</kbd></button></div>`
        : `<div class="toolbar"><button class="air-btn" data-rx="check">Check <kbd>Enter</kbd></button><button class="btn" data-rx="reveal">Reveal <kbd>Shift</kbd> <kbd>Enter</kbd></button></div><p class="note">Units don't matter, and answers within 1% count.</p>`}
        ${scoreLine("num2")}`, false);
    } else {
      if (!R.pick || !R.pick.opts.every(id => RBY(id))) rNewPick();
      if (!R.pick) body = `<div class="empty">Not enough examples here to make a question. <button class="btn" data-ctopic="u2">Use all of Unit 2</button></div>`;
      else {
        const Q = R.pick, t = RBY(Q.id), ch = Q.choice && RBY(Q.choice);
        body = `<div class="quiz" tabindex="-1"><p class="note">Which example would you use for…</p><p class="question">${esc(Q.concept)}</p>
          <div class="options">${Q.opts.map((id, i) => { const o = RBY(id), cl = Q.choice ? (id === Q.id ? "right" : id === Q.choice ? "wrong" : "") : "";
            const sr = Q.choice ? (id === Q.id ? `<span class="sr-only">Correct answer. </span>` : id === Q.choice ? `<span class="sr-only">Your choice. </span>` : "") : "";
            return `<button class="opt ${cl}" data-rx="opt" data-v="${esc(id)}" ${Q.choice ? "disabled" : ""}><span class="k">${i + 1}</span><b>${sr}${esc(o.tk)} · ${esc(o.mem.tag)}</b><span class="meta">${esc(o.region)}${Q.choice ? ` · gate ${gateOf(o.n)}, ${o.n} ${CT[o.n].short}` : ""}</span></button>`; }).join("")}</div>
          ${Q.choice ? `<div class="feedback ${Q.choice === Q.id ? "ok" : "no"}"><b>${Q.choice === Q.id ? "Right." : "Not this time."}</b>
            ${Q.choice === Q.id ? `<p class="detail"><b>${esc(t.mem.tag)}</b>: ${esc(t.hook)}</p>` : `<p class="detail">You picked <b>${esc(ch.mem.tag)}</b>, which is for ${esc(ch.mem.use)}.</p><p class="detail"><b>${esc(t.mem.tag)}</b> fits “${esc(Q.concept)}”: ${esc(t.hook)}</p>`}</div>
            <div><button class="air-btn" data-rx="nextpick">Next question <kbd>Enter</kbd></button></div>` : `<p class="keys">Keys <kbd>1</kbd> to <kbd>4</kbd></p>`}
          ${scoreLine("pick2")}</div>`;
      }
    }
    el.innerHTML = seg + body;
    if (R.mode === "numbers" && R.num && !R.num.answered) setTimeout(() => document.getElementById("rNumIn")?.focus({ preventScroll: true }), 0);
    else if (R.focusCard) el.querySelector(".air-bp, .quiz")?.focus({ preventScroll: true });
    R.focusCard = false;
  }
  const rerenderRwe = () => { if (rhost) renderRwe(rhost); renderStats(); };
  function rGrade(g) {
    const id = R.cur; if (!id || !R.flipped) return;
    if (!R.sess) R.sess = { n: 0, miles: 0, missed: [], last: null };
    const wasNew = !prog(id);
    R.undo = { id, card: P.cards[id] ? JSON.parse(JSON.stringify(P.cards[id])) : null, sess: JSON.parse(JSON.stringify(R.sess)), redo: R.redo?.slice(), newDone: R.newDone };
    if (R.redo) { R.redo = R.redo.filter(x => x !== id); if (!R.redo.length) R.redo = null; }
    grade(id, g);
    if (wasNew) R.newDone++;
    const s = R.sess, gi = GR.indexOf(g);
    s.n++; s.miles += MILES[gi]; s.missed = s.missed.filter(x => x !== id); if (gi <= 1) s.missed.push(id);
    s.last = { id, g, due: prog(id).due };
    say(`Graded ${GL[g]}.`);
    R.cur = rQueue().filter(e => e.id !== id)[0]?.id || null; R.flipped = false; R.focusCard = true;
    rerenderRwe();
  }
  function rUndo() {
    const u = R.undo; if (!u) return;
    if (u.card) P.cards[u.id] = u.card; else delete P.cards[u.id];
    persist();
    R.sess = u.sess; R.redo = u.redo || null; R.cur = u.id; R.flipped = true; R.newDone = u.newDone; R.undo = null; R.ticks = new Set(); R.touched = false;
    say("Last grade undone."); rerenderRwe();
  }
  function rPractice(k, ok) { P.rwe = P.rwe || {}; const x = P.rwe[k] || { right: 0, total: 0 }; x.total++; if (ok) x.right++; P.rwe[k] = x; persist(); }
  function rCheck(reveal) {
    const A = R.num; if (!A || A.answered) return;
    const v = reveal ? "" : (document.getElementById("rNumIn")?.value || "").trim(), a = Math.abs(toNum(v)), b = Math.abs(toNum(A.n));
    A.ok = !reveal && !isNaN(a) && (a === b || Math.abs(a - b) <= b * .01); A.answered = true; A.given = v;
    rPractice("num2", A.ok); say(A.ok ? "Right." : "Not quite. The answer is " + A.n);
    renderRwe(rhost); setTimeout(() => rhost.querySelector('[data-rx="next"]')?.focus({ preventScroll: true }), 0);
  }
  function rChoose(id) {
    const Q = R.pick; if (!Q || Q.choice) return;
    Q.choice = id; rPractice("pick2", id === Q.id); say(id === Q.id ? "Right." : "Not this time. The answer is " + RBY(Q.id).mem.tag);
    renderRwe(rhost); setTimeout(() => rhost.querySelector('[data-rx="nextpick"]')?.focus({ preventScroll: true }), 0);
  }
  function setMode(m) { R.mode = m; ui.rmode = m; saveUi(); R.focusCard = true; renderRwe(rhost); }
  const listMore = () => { R.batch += BATCH; R.cur = null; R.focusCard = true; renderRwe(rhost); };
  function wireRwe(el) {
    el.addEventListener("click", ev => {
      if (worldOf() !== "terminal") return;
      const b = ev.target.closest("button"); if (!b || !el.contains(b)) return;
      const d = b.dataset;
      if (d.rx === "mode") setMode(d.v);
      else if (d.rflip) rFlip();
      else if (d.tick) toggleTick(+d.tick);
      else if (d.rgrade) rGrade(d.rgrade);
      else if (d.rundo) rUndo();
      else if (d.rredo) { R.redo = R.sess.missed.slice(); R.sess.missed = []; R.cur = null; R.focusCard = true; renderRwe(el); }
      else if (d.rmore) listMore();
      else if (d.rx === "check") rCheck(false);
      else if (d.rx === "reveal") rCheck(true);
      else if (d.rx === "next") { rNewNum(); renderRwe(el); }
      else if (d.rx === "opt") rChoose(d.v);
      else if (d.rx === "nextpick") { rNewPick(); R.focusCard = true; renderRwe(el); }
      else return;                                   // data-view, data-ctopic: app.js
      ev.stopImmediatePropagation();
    });
  }
  // Keys in the examples drill. Typing in the number box only sends Enter (Shift+Enter reveals).
  function rweKey(ev, free) {
    const k = ev.key, typing = ev.target.id === "rNumIn", lk = k.length === 1 ? k.toLowerCase() : "";
    if (typing) { if (k === "Enter") { ev.preventDefault(); rCheck(ev.shiftKey); } return; }
    if (ev.shiftKey && (lk === "b" || lk === "r" || lk === "n" || lk === "p")) return setMode({ b: "browse", r: "recall", n: "numbers", p: "pick" }[lk]);
    if (R.mode === "browse") return;
    const n = "1234".includes(k) && k.length === 1 ? +k - 1 : -1;
    if (R.mode === "numbers") { if (k === "Enter" && R.num?.answered) { ev.preventDefault(); rNewNum(); renderRwe(rhost); } return; }
    if (R.mode === "pick") {
      if (!R.pick) return;
      if (!R.pick.choice && n >= 0) rChoose(R.pick.opts[n]);
      else if (R.pick.choice && k === "Enter") { ev.preventDefault(); rNewPick(); R.focusCard = true; renderRwe(rhost); }
      return;
    }
    if (lk === "u" && R.undo) return rUndo();
    if (!R.cur) {
      if (k === "Enter" && free && rhost.querySelector("[data-rredo]")) { ev.preventDefault(); rhost.querySelector("[data-rredo]").click(); }
      else if (lk === "m" && rhost.querySelector("[data-rmore]")) listMore();
      return;
    }
    if (!R.flipped && (k === " " || k === "Enter") && free) { ev.preventDefault(); rFlip(); }
    else if (R.flipped && lk && "qwert".includes(lk)) toggleTick("qwert".indexOf(lk));
    else if (R.flipped && k === "Enter" && R.touched && free) { ev.preventDefault(); rGrade(suggested()); }
    else if (R.flipped && n >= 0) rGrade(GR[n]);
  }
  const rweDue = () => worldOf() === "terminal" ? rPool().filter(e => prog(e.id) && isDue(e.id)).length : 0;
  const resetRwe = () => { R.cur = null; R.sess = R.redo = R.undo = null; R.num = R.pick = null; R.batch = BATCH; R.newDone = 0; };

  return { render, key, pass, itinerary, renderRwe, rweKey, rweDue, resetRwe, stats, gateOf, GRADE_WORDS };
})();
