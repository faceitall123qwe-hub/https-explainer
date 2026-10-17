import { build, icon, typed, esc, VO_OFFSET } from "./frame.mjs";

const durs = [9.0, 9.7, 11.9, 9.7, 7.7, 9.9, 10.0, 9.1, 8.6, 13.7];
const scenes = [];
const HD = `tl.fromTo($(".hd"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, 0.2);`;
const HDCSS = `@R .hd { position:absolute; left:140px; top:96px; }`;
const IN = (sel, t, extra = "") => `tl.fromTo($("${sel}"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E${extra} }, ${t});`;
const ENDS = `
@R .nd { top:440px; width:300px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--muted); }
@R .nd > .ic { width:72px; height:72px; stroke-width:1.4; }
@R .nd .lb { color:var(--text); }
@R .n0 { left:140px; } @R .n1 { left:1480px; }
`;
const endsHtml = (a = "Ты", b = "Сервер") =>
  `<div class="card nd n0">${icon("laptop")}<span class="lb">${a}</span></div><div class="card nd n1">${icon("server")}<span class="lb">${b}</span></div>`;

// 01 HOOK
scenes.push({
  css: `
@R .fm { left:140px; top:250px; width:560px; height:440px; padding:44px; display:flex; flex-direction:column; gap:18px; }
@R .fm .f { height:84px; border-radius:16px; border:1.5px solid var(--line); background:#0e1311; display:flex; align-items:center; padding:0 26px; }
@R .fm .btn { height:84px; border-radius:16px; background:var(--green); color:#0b0e0d; display:flex; align-items:center; justify-content:center; font-weight:600; margin-top:10px; }
@R .fm .ttl { color:var(--muted); }
@R .hp { position:absolute; top:430px; width:96px; height:96px; border-radius:50%; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; color:var(--muted); }
@R .hp .ic { width:44px; height:44px; stroke-width:1.6; }
@R .hl { position:absolute; left:820px; top:340px; color:var(--muted); }
@R .q { position:absolute; left:0; right:0; top:790px; text-align:center; font-size:96px; }
`,
  html: `
<div class="card fm"><span class="lb ttl">пароль</span><div class="f mono">${typed("••••••••")}</div><div class="btn lb">Войти</div></div>
<svg class="wire" viewBox="0 0 1920 1080"><path class="ln" pathLength="1" d="M700 478 L1780 478"/></svg>
${[0, 1, 2, 3, 4, 5].map((i) => `<div class="hp hp${i}" style="left:${800 + i * 170}px">${icon(["wifi", "router", "building-2", "router", "globe", "server"][i])}</div>`).join("")}
<div class="hl lb">чужие устройства по дороге</div>
<h1 class="hd q">Почему пароль <span class="g">никто не прочитает</span>?</h1>`,
  js: `
${IN(".fm", "0.1")}
type(".fm .f", V(0.4), 0.08);
draw(".ln", V(2.5), 1.2);
tl.fromTo($(".hp"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: E, stagger: 0.2 }, V(2.6));
tl.fromTo($(".hl"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(3.8));
tl.fromTo($(".q"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(6.0));
`,
});

// 02 HTTP
const spies = [
  ["wifi", "Wi-Fi в кафе", 680, 5.32],
  ["building-2", "провайдер", 1140, 6.36],
];
scenes.push({
  css: `${HDCSS}${ENDS}
@R .pk { position:absolute; left:470px; top:690px; padding:10px 24px; border-radius:16px; background:var(--panel); border:1.5px solid rgba(245,197,24,.6); color:var(--yellow); }
@R .sp { position:absolute; top:250px; width:420px; height:130px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; gap:20px; padding:0 30px; }
@R .sp .lb { white-space:nowrap; }
@R .sp .ic { width:48px; height:48px; color:var(--muted); stroke-width:1.6; flex:none; }
@R .sp .eye { width:44px; height:44px; color:var(--yellow); margin-left:auto; }
@R .wire .dl { stroke:var(--yellow); stroke-dasharray:8 10; }
@R .cap { position:absolute; left:0; right:0; top:860px; text-align:center; font-size:56px; font-weight:600; letter-spacing:-0.02em; }
`,
  html: `
<h1 class="hd"><span class="y">HTTP</span>: открытый текст</h1>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="ln" pathLength="1" d="M440 540 L1480 540"/>
  ${spies.map(([, , x], i) => `<path class="dl dl${i}" d="M${x + 210} 380 L${x + 210} 530"/>`).join("")}
</svg>
${endsHtml()}
${spies.map(([ic, n, x], i) => `<div class="sp sp${i}" style="left:${x}px">${icon(ic)}<span class="lb">${n}</span>${icon("eye", "eye")}</div>`).join("")}
<div class="pk mono">пароль: kot123</div>
<div class="cap">Посредники видят <span class="y">всё</span></div>`,
  js: `${HD}
tl.fromTo($(".nd"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.15 }, V(0.3));
draw(".ln", V(0.8), 0.6);
tl.fromTo($(".pk"), { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.4 }, V(2.0));
tl.to($(".pk"), { x: 690, duration: 4.5, ease: "power1.inOut" }, V(2.4));
${spies.map(([, , , t], i) => `${IN(`.sp${i}`, `V(${t})`)}\ntl.fromTo($(".dl${i}"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, V(${t}) + 0.3);`).join("\n")}
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(7.1));
`,
});

// 03 SYMMETRIC
const chips3 = [
  ["привет", 260, "", 1.0],
  ["8f#Qx!2@", 830, "y", 3.67],
  ["привет", 1400, "", 6.23],
];
scenes.push({
  css: `${HDCSS}
@R .c3 { position:absolute; top:330px; width:300px; height:120px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line);
  display:flex; align-items:center; justify-content:center; font-size:48px; }
@R .ky { position:absolute; top:240px; width:200px; display:flex; justify-content:center; color:var(--yellow); }
@R .kl { position:absolute; top:470px; width:400px; text-align:center; color:var(--muted); }
@R .kl0 { left:495px; } @R .kl1 { left:1065px; }
@R .ky .ic { width:56px; height:56px; stroke-width:1.6; }
@R .ky0 { left:595px; } @R .ky1 { left:1165px; }
@R .one { position:absolute; left:0; right:0; top:560px; text-align:center; color:var(--yellow); }
@R .prob { position:absolute; left:140px; top:640px; width:1640px; height:220px; }
@R .prob .ln2 { position:absolute; left:220px; right:220px; top:108px; height:3px; background:#3a4842; }
@R .prob .p0, @R .prob .p1 { position:absolute; top:60px; width:180px; display:flex; flex-direction:column; align-items:center; gap:6px; color:var(--muted); }
@R .prob .p0 { left:20px; } @R .prob .p1 { right:20px; }
@R .prob .ic { width:56px; height:56px; stroke-width:1.5; }
@R .mk { position:absolute; left:240px; top:84px; width:52px; height:52px; color:var(--yellow); }
@R .mk .ic { width:52px; height:52px; }
@R .ey { position:absolute; left:790px; top:0px; display:flex; align-items:center; gap:16px; color:var(--yellow); }
@R .ey .ic { width:52px; height:52px; }
`,
  html: `
<h1 class="hd">Симметричное <span class="g">шифрование</span></h1>
<svg class="wire" viewBox="0 0 1920 1080"><path class="a0" pathLength="1" d="M570 390 L820 390"/><path class="a1" pathLength="1" d="M1140 390 L1390 390"/></svg>
${chips3.map(([t, x, c], i) => `<div class="c3 c${i} mono ${c}" style="left:${x}px">${esc(t)}</div>`).join("")}
<div class="ky ky0">${icon("key-round")}</div><div class="kl kl0 lb">шифрует</div>
<div class="ky ky1">${icon("key-round")}</div><div class="kl kl1 lb">расшифровывает</div>
<div class="one lb">один и тот же ключ</div>
<div class="prob">
  <div class="ln2"></div>
  <div class="p0">${icon("laptop")}<span class="lb">Ты</span></div><div class="p1">${icon("server")}<span class="lb">Сервер</span></div>
  <div class="mk">${icon("key-round")}</div>
  <div class="ey">${icon("eye")}<span class="lb">как передать ключ?</span></div>
</div>`,
  js: `${HD}
tl.fromTo($(".c0"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(0.9));
draw(".a0", V(3.2), 0.5);
${IN(".ky0", "V(3.3)")}
${IN(".kl0", "V(3.4)")}
tl.fromTo($(".c1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(3.67));
tl.fromTo($(".one"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(4.9));
draw(".a1", V(5.9), 0.5);
${IN(".ky1", "V(6.0)")}
${IN(".kl1", "V(6.1)")}
tl.fromTo($(".c2"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(6.3));
tl.fromTo($(".prob"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(7.8));
tl.fromTo($(".mk"), { x: 0 }, { x: 560, duration: 1.6, ease: IO }, V(8.4));
tl.fromTo($(".ey"), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(9.2));
`,
});

// 04 ASYMMETRIC
const keys = [
  ["публичный", "видят все", "globe", "g", 360, 4.63],
  ["приватный", "хранится в секрете", "lock", "y", 1040, 6.69],
];
scenes.push({
  css: `${HDCSS}
@R .sv { left:700px; top:250px; width:520px; height:170px; display:flex; align-items:center; justify-content:center; gap:24px; color:var(--muted); }
@R .sv .ic { width:72px; height:72px; stroke-width:1.4; }
@R .sv .lb { color:var(--text); font-size:52px; font-weight:600; }
@R .kc { top:560px; width:520px; height:280px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; }
@R .kc .ic { width:72px; height:72px; stroke-width:1.5; }
@R .kc .nm { font-size:56px; font-weight:600; letter-spacing:-0.02em; }
@R .kc .s { display:flex; align-items:center; gap:14px; color:var(--muted); }
@R .kc .s .ic { width:40px; height:40px; }
@R .kg { color:var(--green); } @R .ky { color:var(--yellow); }
`,
  html: `
<h1 class="hd">Асимметричное: <span class="g">два ключа</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">${keys.map(([, , , , x], i) => `<path class="w${i}" pathLength="1" d="M960 420 C 960 490, ${x + 260} 490, ${x + 260} 560"/>`).join("")}</svg>
<div class="card sv">${icon("server")}<span class="lb">сервер</span></div>
${keys.map(([n, s, ic, c, x], i) => `<div class="card kc k${i} k${c}" style="left:${x}px">${icon("key-round")}<span class="nm">${n}</span><span class="s lb">${icon(ic)}${s}</span></div>`).join("\n")}`,
  js: `${HD}
${IN(".sv", "V(1.8)")}
${keys.map(([, , , , , t], i) => `draw(".w${i}", V(3.6) + ${i} * 0.15, 0.5);\n${IN(`.k${i}`, `V(3.85) + ${i} * 0.15`)}`).join("\n")}
tl.to($(".k0"), { borderColor: "rgba(62,224,143,.6)", duration: 0.4 }, V(4.6));
tl.to($(".k1"), { borderColor: "rgba(245,197,24,.6)", duration: 0.4 }, V(6.7));
tl.fromTo($(".k1 .s .ic"), { scale: 1 }, { scale: 1.2, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(8.2));
`,
});

// 05 PADLOCK
scenes.push({
  css: `${HDCSS}
@R .lk { position:absolute; left:860px; top:290px; width:200px; height:200px; color:var(--green); }
@R .lk .ic { position:absolute; inset:0; width:200px; height:200px; stroke-width:1.2; }
@R .who { position:absolute; top:560px; width:640px; display:flex; flex-direction:column; align-items:center; gap:16px; }
@R .who .ic { width:64px; height:64px; stroke-width:1.5; }
@R .w0 { left:160px; color:var(--green); } @R .w1 { left:1120px; color:var(--yellow); }
@R .who .lb { color:var(--text); }
@R .cap { position:absolute; left:0; right:0; top:850px; text-align:center; color:var(--muted); }
`,
  html: `
<h1 class="hd">Публичный ключ = <span class="g">открытый замок</span></h1>
<div class="lk"><span class="o">${icon("lock-open")}</span><span class="c">${icon("lock")}</span></div>
<div class="who w0">${icon("users")}<span class="lb">защёлкнуть: каждый</span></div>
<div class="who w1">${icon("key-round")}<span class="lb">открыть: только владелец</span></div>`,
  js: `${HD}
tl.fromTo($(".lk"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.7, ease: E }, V(1.5));
tl.set($(".lk .c"), { opacity: 0 }, 0);
${IN(".w0", "V(3.2)")}
tl.to($(".lk .o"), { opacity: 0, duration: 0.3 }, V(4.4));
tl.to($(".lk .c"), { opacity: 1, duration: 0.3 }, V(4.4));
tl.fromTo($(".lk"), { y: 0 }, { y: 8, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1 }, V(4.4));
${IN(".w1", "V(5.1)")}
tl.to($(".lk"), { color: "#f5c518", duration: 0.4 }, V(5.9));
`,
});

// 06 HANDSHAKE
const hs = [
  ["открытая часть A", 430, 1, 1.62],
  ["открытая часть B", 560, -1, 2.7],
];
scenes.push({
  css: `${HDCSS}
@R .hh { top:250px; width:320px; height:100px; display:flex; align-items:center; justify-content:center; gap:20px; }
@R .hh .ic { width:48px; height:48px; color:var(--muted); stroke-width:1.5; }
@R .h0 { left:160px; } @R .h1 { left:1440px; }
@R .wire .ar { stroke:var(--green); } @R .wire .ah { fill:var(--green); }
@R .al { position:absolute; left:660px; width:600px; text-align:center; color:var(--green); }
${hs.map(([, y], i) => `@R .al${i} { top:${y - 68}px; }`).join("\n")}
@R .sk { position:absolute; top:640px; width:320px; display:flex; flex-direction:column; align-items:center; gap:10px; color:var(--yellow); }
@R .sk .ic { width:64px; height:64px; stroke-width:1.6; }
@R .sk0 { left:160px; } @R .sk1 { left:1440px; }
@R .ey { position:absolute; left:660px; top:690px; width:600px; display:flex; flex-direction:column; align-items:center; gap:14px; }
@R .ey .ic { width:60px; height:60px; color:var(--yellow); }
@R .ey .lb { color:var(--muted); text-align:center; }
`,
  html: `
<h1 class="hd">Рукопожатие <span class="g">TLS</span></h1>
<div class="card hh h0">${icon("globe")}<span class="lb">Браузер</span></div>
<div class="card hh h1">${icon("server")}<span class="lb">Сервер</span></div>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="life" d="M320 350 L320 620"/><path class="life" d="M1600 350 L1600 620"/>
  ${hs
    .map(([, y, dir], i) => {
      const [a, b] = dir > 0 ? [350, 1570] : [1570, 350];
      const hx = b - dir * 22;
      return `<path class="ar ar${i}" pathLength="1" d="M${a} ${y} L${b} ${y}"/><polygon class="ah ah${i}" points="${b},${y} ${hx},${y - 12} ${hx},${y + 12}"/>`;
    })
    .join("")}
</svg>
${hs.map(([t], i) => `<div class="al al${i} lb">${t}</div>`).join("")}
<div class="sk sk0">${icon("key-round")}<span class="lb">общий ключ</span></div>
<div class="sk sk1">${icon("key-round")}<span class="lb">общий ключ</span></div>
<div class="ey">${icon("eye")}<span class="lb">видит A и B, но не ключ</span></div>`,
  js: `${HD}
tl.fromTo($(".hh"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E, stagger: 0.15 }, V(0.6));
tl.fromTo($(".life"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, V(1.0));
tl.set($(".ah"), { opacity: 0 }, 0);
${hs.map(([, , , t], i) => `draw(".ar${i}", V(${t}), 0.6);\ntl.to($(".ah${i}"), { opacity: 1, duration: 0.15 }, V(${t}) + 0.5);\ntl.fromTo($(".al${i}"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: E }, V(${t}));`).join("\n")}
tl.fromTo($(".sk"), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, ease: E, stagger: 0.1 }, V(4.3));
tl.fromTo($(".ey"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(5.7));
tl.fromTo($(".ey .ic"), { scale: 1 }, { scale: 1.15, duration: 0.25, ease: "power2.out", yoyo: true, repeat: 1 }, V(8.0));
`,
});

// 07 CERTIFICATE
scenes.push({
  css: `${HDCSS}
@R .bw { left:140px; top:420px; width:300px; height:220px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--muted); }
@R .bw .ic { width:64px; height:64px; stroke-width:1.5; }
@R .bw .lb { color:var(--text); }
@R .ct { left:610px; top:300px; width:700px; height:460px; padding:40px 48px; display:flex; flex-direction:column; gap:22px; border-color:rgba(62,224,143,.5); }
@R .ct .t { display:flex; align-items:center; gap:18px; color:var(--green); }
@R .ct .t .ic { width:56px; height:56px; stroke-width:1.5; }
@R .ct .t .lb { color:var(--text); font-size:52px; font-weight:600; }
@R .ct .r { display:flex; gap:20px; }
@R .ct .r .k { color:var(--muted); }
@R .sg { display:flex; align-items:center; gap:14px; color:var(--green); }
@R .sg .ic { width:44px; height:44px; stroke-width:2; }
@R .ca { left:1480px; top:420px; width:300px; height:220px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; color:var(--yellow); text-align:center; }
@R .ca .ic { width:64px; height:64px; stroke-width:1.5; }
@R .ca .lb { color:var(--text); }
@R .wire .tr { stroke:var(--green); stroke-dasharray:10 10; }
@R .tl { position:absolute; left:610px; top:820px; background:var(--bg); width:700px; text-align:center; color:var(--green); }
`,
  html: `
<h1 class="hd">Сертификат: <span class="g">это точно он?</span></h1>
<svg class="wire" viewBox="0 0 1920 1080">
  <path class="w0" pathLength="1" d="M1480 530 L1310 530"/>
  <path class="tr" d="M290 640 C 290 820, 1630 820, 1630 640"/>
</svg>
<div class="card bw">${icon("globe")}<span class="lb">Браузер</span></div>
<div class="card ct">
  <div class="t">${icon("file-badge")}<span class="lb">Сертификат</span></div>
  <div class="r mono r0"><span class="k">кому:</span><span>example.ru</span></div>
  <div class="r mono r1"><span class="k">кем выдан:</span><span class="y">центр</span></div>
  <div class="sg lb">${icon("badge-check")}подпись верна</div>
</div>
<div class="card ca">${icon("shield-check")}<span class="lb">центр сертификации</span></div>
<div class="tl lb">браузер доверяет центру</div>`,
  js: `${HD}
${IN(".bw", "V(0.6)")}
tl.fromTo($(".ct"), { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.6, ease: E }, V(4.9));
tl.fromTo($(".ct .r"), { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: E, stagger: 0.2 }, V(5.2));
${IN(".ca", "V(6.3)")}
draw(".w0", V(6.6), 0.4);
tl.fromTo($(".sg"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(6.9));
tl.fromTo($(".tr"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, V(8.1));
tl.fromTo($(".tl"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(8.2));
`,
});

// 08 SYMMETRIC TRAFFIC
const msgs = [
  ["пароль", "x9#Qf!2", 4.15],
  ["куки", "L@7p%e", 4.74],
  ["страница", "Zq3#!m", 5.3],
];
scenes.push({
  css: `${HDCSS}${ENDS}
@R .m { position:absolute; left:470px; top:500px; height:80px; }
@R .m span { position:absolute; left:0; top:0; white-space:nowrap; padding:8px 22px; border-radius:16px; background:var(--panel); }
@R .m .p { border:1.5px solid rgba(62,224,143,.6); color:var(--green); }
@R .m .x { border:1.5px solid var(--line); color:var(--muted); }
@R .lk2 { position:absolute; left:930px; top:420px; width:60px; height:60px; color:var(--green); }
@R .lk2 .ic { width:60px; height:60px; stroke-width:1.6; }
@R .ey { position:absolute; left:760px; top:700px; width:400px; display:flex; flex-direction:column; align-items:center; gap:12px; }
@R .ey .ic { width:56px; height:56px; color:var(--yellow); }
@R .cap { position:absolute; left:0; right:0; top:880px; text-align:center; font-size:56px; font-weight:600; letter-spacing:-0.02em; }
`,
  html: `
<h1 class="hd">Дальше: <span class="g">быстрый шифр</span></h1>
<svg class="wire" viewBox="0 0 1920 1080"><path class="ln" pathLength="1" d="M440 540 L1480 540"/></svg>
${endsHtml()}
<div class="lk2">${icon("lock")}</div>
${msgs.map(([p, x], i) => `<div class="m m${i}" data-layout-allow-overlap><span class="mono p" data-layout-allow-overlap>${p}</span><span class="mono x" data-layout-allow-overlap>${esc(x)}</span></div>`).join("")}
<div class="ey">${icon("eye")}<span class="lb muted">только шум</span></div>
<div class="cap">Посредник видит <span class="y">только шум</span></div>`,
  js: `${HD}
tl.fromTo($(".nd"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.2);
draw(".ln", V(0.4), 0.6);
tl.fromTo($(".lk2"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: E }, V(2.6));
tl.set($(".m"), { opacity: 0 }, 0);
${msgs
  .map(
    ([, , t], i) => `tl.fromTo($(".m${i}"), { opacity: 0, x: 0 }, { opacity: 1, x: 0, duration: 0.3 }, V(${t}) - 0.4);
tl.to($(".m${i}"), { x: 820, duration: 1.0, ease: "power1.inOut" }, V(${t}) - 0.15);
tl.fromTo($(".m${i} .x"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, V(${t}) + 0.1);
tl.fromTo($(".m${i} .p"), { opacity: 1 }, { opacity: 0, duration: 0.2 }, V(${t}) + 0.1);
tl.to($(".m${i} .p"), { opacity: 1, duration: 0.2 }, V(${t}) + 0.6);
tl.to($(".m${i} .x"), { opacity: 0, duration: 0.2 }, V(${t}) + 0.6);
tl.to($(".m${i}"), { opacity: 0, duration: 0.25 }, V(${t}) + 0.9);`,
  )
  .join("\n")}
tl.fromTo($(".ey"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(6.6));
tl.fromTo($(".cap"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(7.4));
`,
});

// 09 WHAT IS VISIBLE
const vis = [
  ["eye", "домен сайта", "y", 4.55],
  ["eye", "объём данных", "y", 6.32],
];
const hid = [
  ["eye-off", "путь и адрес страницы"],
  ["eye-off", "пароли и куки"],
  ["eye-off", "содержимое"],
];
scenes.push({
  css: `${HDCSS}
@R .col { position:absolute; top:260px; width:780px; }
@R .c0 { left:140px; } @R .c1 { left:1000px; }
@R .col .h { font-size:52px; font-weight:600; margin-bottom:24px; }
@R .it { height:110px; display:flex; align-items:center; gap:22px; padding:0 32px; margin-bottom:18px; border-radius:22px; background:var(--panel); border:1.5px solid var(--line); }
@R .it .ic { width:44px; height:44px; stroke-width:1.8; flex:none; }
@R .c0 .it { border-color:rgba(245,197,24,.5); } @R .c0 .it .ic { color:var(--yellow); }
@R .c1 .it .ic { color:var(--green); }
`,
  html: `
<h1 class="hd">HTTPS скрывает <span class="y">не всё</span></h1>
<div class="col c0"><div class="h y">видит провайдер</div>${vis.map(([ic, t], i) => `<div class="it v${i}">${icon(ic)}<span class="lb">${t}</span></div>`).join("")}</div>
<div class="col c1"><div class="h g">скрыто</div>${hid.map(([ic, t]) => `<div class="it hdn">${icon(ic)}<span class="lb">${t}</span></div>`).join("")}</div>`,
  js: `${HD}
tl.fromTo($(".c1"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: E }, V(1.0));
tl.fromTo($(".c1 .it"), { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.45, ease: E, stagger: 0.15 }, V(1.3));
tl.fromTo($(".c0 .h"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: E }, V(3.0));
${vis.map(([, , , t], i) => `tl.fromTo($(".v${i}"), { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, ease: E }, V(${t}));`).join("\n")}
`,
});

// 10 SUMMARY + TRY
const sum = [
  ["key-round", "Симметричный ключ", 0.1],
  ["lock", "Пара ключей", 1.34],
  ["handshake", "Рукопожатие", 2.24],
  ["file-badge", "Сертификат", 3.11],
];
scenes.push({
  exit: 0.9,
  css: `
@R .ls { position:absolute; inset:0; }
@R .sm { width:790px; height:150px; display:flex; align-items:center; gap:28px; padding:0 40px; color:var(--green); }
@R .sm .ic { width:60px; height:60px; stroke-width:1.5; }
@R .sm .lb { color:var(--text); font-size:54px; font-weight:600; letter-spacing:-0.02em; }
${sum.map((_, i) => `@R .s${i} { left:${140 + (i % 2) * 850}px; top:${180 + Math.floor(i / 2) * 190}px; }`).join("\n")}
@R .ft { position:absolute; left:140px; top:640px; font-size:108px; }
@R .fin { position:absolute; inset:0; }
@R .fh { position:absolute; left:0; right:0; top:150px; text-align:center; font-size:100px; }
@R .ab { left:360px; top:380px; width:1200px; height:110px; display:flex; align-items:center; gap:24px; padding:0 40px; font-size:52px; }
@R .ab .ic { width:46px; height:46px; color:var(--green); stroke-width:1.8; }
@R .cur { position:absolute; left:640px; top:520px; width:56px; height:56px; color:var(--text); }
@R .cur .ic { width:56px; height:56px; stroke-width:1.6; }
@R .pop { left:360px; top:520px; width:760px; height:220px; padding:34px 40px; display:flex; flex-direction:column; gap:20px; border-color:rgba(62,224,143,.5); }
@R .pop .r { display:flex; align-items:center; gap:18px; }
@R .pop .ic { width:44px; height:44px; color:var(--green); stroke-width:1.8; }
`,
  html: `
<div class="ls">
${sum.map(([ic, n], i) => `<div class="card sm s${i}">${icon(ic)}<span class="lb">${n}</span></div>`).join("\n")}
<h1 class="hd ft">Так работает <span class="g">HTTPS</span></h1>
</div>
<div class="fin">
  <h1 class="hd fh">Проверь <span class="g">сам</span></h1>
  <div class="card ab mono">${icon("lock")}<span>example.ru</span></div>
  <div class="card pop">
    <div class="r lb">${icon("lock")}Соединение защищено</div>
    <div class="r lb">${icon("file-badge")}Сертификат действителен</div>
  </div>
  <div class="cur">${icon("mouse-pointer-2")}</div>
</div>`,
  js: `
${sum.map(([, , w], i) => IN(`.s${i}`, `V(${w})`)).join("\n")}
tl.fromTo($(".ft"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(4.6));
tl.to($(".ls"), { opacity: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.inOut" }, V(6.8));
tl.fromTo($(".fh"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: E }, V(7.2));
${IN(".ab", "V(7.6)")}
tl.fromTo($(".cur"), { opacity: 0, x: 120, y: 120 }, { opacity: 1, x: 0, y: 0, duration: 0.3 }, V(8.0));
tl.to($(".cur"), { x: -230, y: -95, duration: 0.8, ease: IO }, V(8.2));
tl.fromTo($(".cur"), { scale: 1 }, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 }, V(9.0));
tl.fromTo($(".pop"), { opacity: 0, y: -10, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: E }, V(9.2));
tl.to($(".cur"), { opacity: 0, duration: 0.3 }, V(9.4));
`,
});

build({
  title: "Как работает HTTPS",
  lang: "ru",
  durs,
  scenes,
  sfx: (st) => [
    ["typing", st[0] + VO_OFFSET + 0.4, 0.7, 0.3, 14],
    ["click-soft", st[4] + VO_OFFSET + 4.4, 0.365, 0.5, 13],
    ...[1.62, 2.7].map((t) => ["click-soft", st[5] + VO_OFFSET + t, 0.365, 0.4, 13]),
    ["click-soft", st[9] + VO_OFFSET + 9.0, 0.365, 0.5, 13],
    ["chime", st[9] + VO_OFFSET + 7.2, 2.5, 0.22, 15],
  ],
});
