const K = 'iltizam_app_v1', O = '#FF5A00';
const STRIPE = 'repeating-linear-gradient(-45deg,#262626 0 5px,#141414 5px 10px)';
const SH = ['#1A1A1A', '#5C2400', '#A33D00', O];
const pad = n => String(n).padStart(2, '0');
const dkey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmtDate = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtMonth = new Intl.DateTimeFormat('ar-u-ca-gregory-nu-latn', { month: 'long' });
const mName = (y, m) => fmtMonth.format(new Date(y, m, 1));
const tm = min => { min = ((min % 1440) + 1440) % 1440; const h = Math.floor(min / 60), m = min % 60; return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'ص' : 'م'}`; };
const F = v => Math.round(v).toLocaleString('en-US');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const HB = [
  { k: 'w', label: 'تمرّنت', desc: '30 دقيقة نشاط أو أكثر', name: 'التمرين' },
  { k: 's', label: 'نمت كويس', desc: '7 ساعات نوم أو أكثر', name: 'النوم' },
  { k: 'd', label: 'مشيت على الدايت', desc: 'ما طلعت عن خطة الأكل', name: 'الدايت' },
];
const I = {
  check: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="square"><path d="M20 6 9 17l-5-5"/></svg>',
  plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  minus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 12h14"/></svg>',
  x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  bell: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" style="flex:none"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>',
  cal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" style="flex:none"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4"/><path d="M3 10h18"/><path d="M12 14v4"/><path d="M10 16h4"/></svg>',
  dl: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" style="flex:none"><path d="M12 15V3"/><path d="m7 10 5 5 5-5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>',
  r: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m9 18 6-6-6-6"/></svg>',
  l: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m15 18-6-6 6-6"/></svg>',
  share: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" style="flex:none"><path d="M12 2v13"/><path d="m16 6-4-4-4 4"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/></svg>',
  copy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="square" style="flex:none"><rect width="14" height="14" x="8" y="8"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
};

const DEF = { log: {}, start: dkey(new Date()), remOn: true, remTime: 1260, sex: 'm', age: 28, weight: 88, height: 176, act: 1, pace: 1, wake: 390, notified: '', reportSeen: '', reportNotified: '', installClosed: false, tab: 'today', mOff: 0, water: {}, wOn: true, wInt: 120, wFrom: 540, wTo: 1320, wNotified: '', name: '', myId: '', friends: {}, metric: 'o' };
let S;
try { S = Object.assign({}, DEF, JSON.parse(localStorage.getItem(K) || '{}')); } catch (e) { S = Object.assign({}, DEF); }
S.mOff = 0;
if (!S.myId) S.myId = Math.random().toString(36).slice(2, 10);
let deferredInstall = null, linkCode = '';
const L = ml => String(+(ml / 1000).toFixed(2));
const pad4 = n => String(n).padStart(4, '0');
const mkey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
const pc = v => clamp(Math.round(+v || 0), 0, 100);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const segS = on => `background:${on ? O : 'transparent'};color:${on ? 'var(--ink)' : 'var(--txt)'}`;
function wBase() { return Math.round(S.weight * 35 / 50) * 50; }
function wGoal(dk) { return Math.round((S.weight * 35 + ((S.log[dk] || {}).w ? 500 : 0)) / 50) * 50; }
function wSlots() { const a = []; for (let t = S.wFrom; t <= S.wTo; t += S.wInt) a.push(t); return a; }

async function readState() {
  try { const c = await caches.open('iltizam-state'); const r = await c.match('./state.json'); return r ? r.json() : null; } catch (e) { return null; }
}
async function syncSW() {
  if (!('caches' in window)) return;
  try {
    const old = await readState(), k = dkey(new Date());
    const notified = old && old.notified > S.notified ? old.notified : S.notified;
    const wNotified = old && (old.wNotified || '') > S.wNotified ? old.wNotified : S.wNotified;
    const c = await caches.open('iltizam-state');
    await c.put('./state.json', new Response(JSON.stringify({ remOn: S.remOn, remTime: S.remTime, todayKey: k, today: S.log[k] || {}, notified, wOn: S.wOn, wFrom: S.wFrom, wTo: S.wTo, wInt: S.wInt, wMl: S.water[k] || 0, wGoal: wGoal(k), wBase: wBase(), wNotified }), { headers: { 'Content-Type': 'application/json' } }));
  } catch (e) {}
}
function save() { try { localStorage.setItem(K, JSON.stringify(S)); } catch (e) {} syncSW(); }

function monthStats(y, m) {
  const now = new Date(), st = new Date(S.start + 'T00:00:00');
  const last = new Date(y, m + 1, 0).getDate();
  if (new Date(y, m + 1, 0) < new Date(st.getFullYear(), st.getMonth(), st.getDate())) return null;
  if (new Date(y, m, 1) > now) return null;
  const from = st.getFullYear() === y && st.getMonth() === m ? st.getDate() : 1;
  const to = now.getFullYear() === y && now.getMonth() === m ? now.getDate() : last;
  const n = to - from + 1, c = { w: 0, s: 0, d: 0, wa: 0 };
  for (let d = from; d <= to; d++) { const dk = dkey(new Date(y, m, d)), x = S.log[dk]; if (x) HB.forEach(h => { if (x[h.k]) c[h.k]++; }); if ((S.water[dk] || 0) >= wGoal(dk)) c.wa++; }
  const p = k => Math.round(c[k] / n * 100);
  return { n, c, from, to, last, pct: { w: p('w'), s: p('s'), d: p('d'), wa: p('wa') }, overall: Math.round((c.w + c.s + c.d) / (n * 3) * 100) };
}
const prevMonth = () => { const d = new Date(); const p = new Date(d.getFullYear(), d.getMonth() - 1, 1); return { y: p.getFullYear(), m: p.getMonth(), key: `${p.getFullYear()}-${pad(p.getMonth() + 1)}` }; };
function minOff() { const st = new Date(S.start + 'T00:00:00'), n = new Date(); return -((n.getFullYear() - st.getFullYear()) * 12 + n.getMonth() - st.getMonth()); }
function streak() {
  const full = x => x && x.w && x.s && x.d; let n = 0; const d = new Date();
  if (!full(S.log[dkey(d)])) d.setDate(d.getDate() - 1);
  while (full(S.log[dkey(d)])) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function feedback(ms) {
  const wk = ['w', 's', 'd'].reduce((a, k) => ms.pct[k] < ms.pct[a] ? k : a, 'w');
  const weak = HB.find(h => h.k === wk).name, o = ms.overall;
  const t = o >= 80 ? ['أداء وحشي', `التزامك عالي. حافظ على نفس الريتم، و${weak} هو الشي الوحيد اللي تقدر ترفعه أكثر.`]
    : o >= 65 ? ['مستوى قوي', `أنت قريب من القمة. شد حيلك في ${weak} وتوصل فوق 80%.`]
    : o >= 50 ? ['تقدر أحسن', `وصلت نص الطريق. خلّ ${weak} أولويتك، يوم ورا يوم.`]
    : ['لازم نرجع', `ابدأ بعادة وحدة بس: ${weak}. ثبّتها أسبوعين وبعدها زود.`];
  return { wk, title: t[0], body: t[1] };
}

const stepper = (label, val, unit, a, isText) => `<div class="row"><div style="flex:1;font-size:15px;font-weight:800">${label}</div><button class="sq" data-a="${a}" data-v="1" aria-label="زيادة">${I.plus}</button><div style="min-width:84px;display:flex;align-items:baseline;justify-content:center;gap:4px">${isText ? `<span style="font-size:17px;font-weight:900">${val}</span>` : `<span class="num" style="font-size:30px;line-height:1">${val}</span><span class="lbl" style="font-size:11px">${unit}</span>`}</div><button class="sq" data-a="${a}" data-v="-1" aria-label="نقص">${I.minus}</button></div>`;
const toggle = (on, a = 'remToggle') => `<button data-a="${a}" aria-label="تشغيل التذكير" style="width:52px;height:30px;flex:none;border:2px solid ${on ? O : '#444'};background:${on ? O : 'transparent'};display:flex;justify-content:${on ? 'flex-end' : 'flex-start'};padding:3px"><div style="width:20px;height:20px;background:${on ? 'var(--ink)' : '#666'}"></div></button>`;

function vInstall() {
  if (standalone || S.installClosed) return '';
  const how = deferredInstall ? `<button class="btn p" data-a="install" style="align-self:flex-start">${I.dl}ثبّت التطبيق الحين</button>`
    : isIOS ? '<div style="font-size:13px;line-height:1.7">من Safari اضغط زر المشاركة، بعدها «إضافة إلى الشاشة الرئيسية». بعد التثبيت تقدر تفعّل الإشعارات.</div>'
    : '<div style="font-size:13px;line-height:1.7">من قائمة المتصفح اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</div>';
  return `<div style="margin:16px 20px 0;border:2px solid ${O};padding:14px 12px 14px 16px;display:flex;gap:12px;align-items:flex-start"><div style="flex:1;display:flex;flex-direction:column;gap:8px"><div style="font-size:15px;font-weight:900;color:${O}">ثبّت التطبيق على جوالك</div>${how}</div><button data-a="closeInstall" aria-label="إغلاق" style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;flex:none">${I.x}</button></div>`;
}
function vReport() {
  const p = prevMonth(); if (S.reportSeen === p.key) return '';
  const ps = monthStats(p.y, p.m); if (!ps) return '';
  return `<button data-a="report" style="margin:16px 20px 0;width:calc(100% - 40px);background:${O};color:var(--ink);padding:16px;display:flex;align-items:center;gap:12px"><div style="flex:1;display:flex;flex-direction:column;gap:4px"><div style="font-size:12px;font-weight:800">تقرير ${mName(p.y, p.m)} جاهز</div><div style="font-size:20px;font-weight:900">نسبة التزامك <span class="num" style="font-size:26px">${ps.overall}%</span></div></div>${I.l}</button>`;
}
function vNotif() {
  const sup = 'Notification' in window, perm = sup ? Notification.permission : 'na';
  let h = `<div class="sec lbl">التذكيرات</div><div style="border-top:2px solid var(--rule)"><div class="row" style="padding:16px 20px"><div style="flex:1;display:flex;flex-direction:column;gap:4px"><div style="font-size:15px;font-weight:800">التذكير اليومي</div><div style="font-size:12px;font-weight:500;color:var(--mut)">إشعار كل يوم عشان تسجّل</div></div>${toggle(S.remOn)}</div>`;
  if (S.remOn) h += stepper('وقت التذكير', tm(S.remTime), '', 'rem', true);
  h += '<div class="rule" style="padding:16px 20px;display:flex;flex-direction:column;gap:10px">';
  if (S.remOn) h += permHtml();
  h += `<button class="btn" data-a="ics">${I.cal}أضف التذكير لتقويم الجوال</button><div style="font-size:12px;line-height:1.7;color:var(--mut)">التقويم يذكّرك كل يوم الساعة ${tm(S.remTime)}، وأول كل شهر بالتقرير، حتى لو التطبيق مقفل.</div></div></div>`;
  return h;
}

function vToday() {
  const d = new Date(), k = dkey(d), t = S.log[k] || {}, done = HB.filter(h => t[h.k]).length;
  const ms = monthStats(d.getFullYear(), d.getMonth()), mins = d.getHours() * 60 + d.getMinutes();
  const left = HB.filter(h => !t[h.k]).map(h => h.name);
  let h = `<div style="padding:14px 20px 0;display:flex;justify-content:space-between;align-items:center"><div style="display:flex;align-items:center;gap:8px"><div style="width:12px;height:12px;background:${O}"></div><div style="font-size:15px;font-weight:900">التزام</div></div><div class="lbl">${fmtDate.format(d)}</div></div>`;
  h += vInstall() + vReport();
  h += `<div class="hero" style="padding-bottom:16px"><div style="display:flex;flex-direction:column;gap:6px;padding-bottom:6px"><div class="h1">يومك</div><div class="sub">${['ابدأ يومك وسجّل أول إنجاز', 'بداية حلوة، كمّل', 'باقي خطوة وحدة', 'يوم كامل. كفو!'][done]}</div></div><div class="num big">${Math.round(done / 3 * 100)}<span style="font-size:52px">%</span></div></div>`;
  h += `<div class="rule" style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:0 20px 20px">${HB.map(x => `<div style="height:10px;background:${t[x.k] ? O : STRIPE}"></div>`).join('')}</div>`;
  if (S.remOn && mins >= S.remTime && left.length) h += `<div style="margin:16px 20px 0;background:${O};color:var(--ink);padding:14px 16px;display:flex;gap:12px;align-items:flex-start">${I.bell}<div style="flex:1;display:flex;flex-direction:column;gap:3px"><div style="font-size:14px;font-weight:900">تذكير اليوم · ${tm(S.remTime)}</div><div style="font-size:13px;font-weight:500;line-height:1.5">باقي تسجّل: ${left.join('، ')}. لا تكسر السلسلة.</div></div></div>`;
  h += `<div class="sec" style="display:flex;justify-content:space-between"><div class="lbl">سجّل يومك</div><div class="lbl">أيام هذا الشهر</div></div><div style="border-top:2px solid var(--rule)">`;
  h += HB.map(x => { const on = !!t[x.k], sub = on ? '#3A1400' : 'var(--mut)'; return `<button data-a="hab" data-v="${x.k}" style="width:100%;display:flex;align-items:center;gap:16px;padding:18px 20px;border-bottom:2px solid var(--rule);background:${on ? O : 'var(--ink)'};color:${on ? 'var(--ink)' : 'var(--txt)'};transition:background .18s"><div style="width:34px;height:34px;flex:none;border:2.5px solid ${on ? 'var(--ink)' : 'var(--txt)'};background:${on ? 'var(--ink)' : 'transparent'};display:flex;align-items:center;justify-content:center;color:${O}">${on ? I.check : ''}</div><div style="flex:1;display:flex;flex-direction:column;gap:4px"><div style="font-size:20px;font-weight:900;line-height:1.2">${x.label}</div><div style="font-size:12.5px;font-weight:500;color:${sub}">${x.desc}</div></div><div style="display:flex;align-items:baseline;gap:4px"><span class="num" style="font-size:40px;line-height:1">${ms ? ms.c[x.k] : 0}</span><span style="font-size:11px;font-weight:700;color:${sub}">يوم</span></div></button>`; }).join('') + '</div>';
  h += `<div class="rule" style="display:grid;grid-template-columns:1fr 1fr"><div style="padding:20px;border-left:2px solid var(--rule);display:flex;flex-direction:column;gap:6px"><div class="lbl">سلسلة الالتزام الكامل</div><div style="display:flex;align-items:baseline;gap:6px"><span class="num" style="font-size:56px;line-height:1;color:${O}">${streak()}</span><span style="font-size:14px;font-weight:800">أيام</span></div></div><div style="padding:20px;display:flex;flex-direction:column;gap:6px"><div class="lbl">التزامك في ${mName(d.getFullYear(), d.getMonth())}</div><span class="num" style="font-size:56px;line-height:1;align-self:flex-start">${ms ? ms.overall : 0}<span style="font-size:28px">%</span></span></div></div>`;
  return h + vNotif();
}

function vMonth() {
  const now = new Date(), base = new Date(now.getFullYear(), now.getMonth() + S.mOff, 1), y = base.getFullYear(), m = base.getMonth();
  const ms = monthStats(y, m), pb = new Date(y, m - 1, 1), pv = monthStats(pb.getFullYear(), pb.getMonth()), mo = minOff();
  const cur = S.mOff === 0;
  let h = `<div style="padding:10px 12px 0;display:flex;align-items:center;justify-content:space-between"><button data-a="mPrev" aria-label="الشهر السابق" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;opacity:${S.mOff > mo ? 1 : .25}">${I.r}</button><div style="font-size:16px;font-weight:900">${mName(y, m)} <span class="num" style="font-style:normal;font-weight:800">${y}</span></div><button data-a="mNext" aria-label="الشهر التالي" style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;opacity:${cur ? .25 : 1}">${I.l}</button></div>`;
  if (!ms) return h + '<div class="sec sub">ما فيه بيانات لهذا الشهر.</div>';
  const fb = feedback(ms), dl = pv ? ms.overall - pv.overall : null;
  h += `<div class="hero rule" style="padding-top:12px"><div style="display:flex;flex-direction:column;gap:10px;padding-bottom:6px"><div style="font-size:26px;font-weight:900;line-height:1.15">نسبة<br>التزامك</div><div style="align-self:flex-start;font-size:12px;font-weight:800;padding:4px 8px;border:2px solid ${O};color:${O}">${pv ? `${dl >= 0 ? '+' : '−'}${Math.abs(dl)}% عن ${mName(pb.getFullYear(), pb.getMonth())}` : 'أول شهر لك'}</div></div><div class="num big">${ms.overall}<span style="font-size:52px">%</span></div></div>`;
  h += `<div style="background:${O};color:var(--ink);padding:20px;display:flex;flex-direction:column;gap:8px"><div style="font-size:12px;font-weight:800">فيدباك ${mName(y, m)}${cur ? ' · لين اليوم' : ''}</div><div style="font-size:30px;font-weight:900;line-height:1.1">${fb.title}</div><div style="font-size:14px;font-weight:500;line-height:1.6;text-wrap:pretty">${fb.body}</div></div>`;
  h += '<div class="rule" style="display:flex;flex-direction:column;gap:16px;padding:22px 20px">' + HB.map(x => { const c = x.k === fb.wk ? 'var(--txt)' : O; return `<div style="display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:15px;font-weight:800">${x.name} <span style="font-size:12px;font-weight:500;color:var(--mut)">· ${ms.c[x.k]} من ${ms.n} يوم</span></div><div class="num" style="font-size:22px;color:${c}">${ms.pct[x.k]}%</div></div><div class="bar"><i style="width:${ms.pct[x.k]}%;background:${c}"></i></div></div>`; }).join('') + '</div>';
  let cells = ['أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'].map(w => `<div style="text-align:center;font-size:11px;font-weight:800;color:var(--mut);padding-bottom:4px">${w}</div>`).join('');
  const first = new Date(y, m, 1).getDay(), tk = dkey(now);
  for (let i = 0; i < first; i++) cells += '<div></div>';
  for (let d = 1; d <= ms.last; d++) {
    const dk = dkey(new Date(y, m, d)), inR = d >= ms.from && d <= ms.to, x = S.log[dk] || {}, c = HB.filter(z => x[z.k]).length;
    const bg = inR ? SH[c] : 'transparent', fg = !inR ? '#4A4A48' : c === 3 ? 'var(--ink)' : c === 0 ? 'var(--mut)' : 'var(--txt)', br = dk === tk ? 'var(--txt)' : inR ? SH[c] : '#1C1C1C';
    cells += `<div class="num" style="aspect-ratio:1;background:${bg};color:${fg};border:2px solid ${br};padding:4px 5px;font-size:12px;font-style:normal;font-weight:800;text-align:right">${d}</div>`;
  }
  h += `<div style="padding:22px 20px 0;display:flex;flex-direction:column;gap:12px"><div class="lbl">أيام الشهر</div><div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:4px">${cells}</div><div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--mut)"><span>عادات منجزة:</span>${SH.map((s, i) => `<div style="width:14px;height:14px;background:${s}"></div><span class="num" style="font-style:normal">${i}</span>`).join('')}</div></div>`;
  return h;
}

function vCal() {
  const bmr = 10 * S.weight + 6.25 * S.height - 5 * S.age + (S.sex === 'm' ? 5 : -161);
  const tdee = bmr * [1.2, 1.375, 1.55, 1.725][S.act];
  const target = Math.round(Math.max(tdee - [250, 500, 750][S.pace], S.sex === 'm' ? 1500 : 1200) / 10) * 10;
  const weekly = Math.max(0, (tdee - target) * 7 / 7700);
  const seg = on => `background:${on ? O : 'transparent'};color:${on ? 'var(--ink)' : 'var(--txt)'}`;
  let h = `<div class="rule" style="padding:14px 20px 18px;display:flex;flex-direction:column;gap:6px"><div class="h1">السعرات</div><div class="sub">احسب حرقك اليومي وكم تاكل عشان تنزل وزن</div></div>`;
  h += `<div style="background:${O};color:var(--ink);padding:20px;display:flex;flex-direction:column;gap:4px"><div style="font-size:13px;font-weight:800">عشان تنزل وزن، كُل يومياً</div><div style="display:flex;align-items:baseline;gap:10px"><span class="num" style="font-size:104px;line-height:.9;letter-spacing:-.02em">${F(target)}</span><span style="font-size:16px;font-weight:900">سعرة</span></div><div style="font-size:13px;font-weight:700">نزول متوقع ≈ <span class="num" style="font-style:normal">${weekly.toFixed(2)}</span> كجم بالأسبوع</div></div>`;
  h += `<div class="rule" style="display:grid;grid-template-columns:1fr 1fr"><div style="padding:16px 20px;border-left:2px solid var(--rule);display:flex;flex-direction:column;gap:4px"><div class="lbl">حرقك اليومي</div><div class="num" style="font-size:36px;line-height:1;align-self:flex-start">${F(tdee)}</div></div><div style="padding:16px 20px;display:flex;flex-direction:column;gap:4px"><div class="lbl">معدل الأيض بالراحة</div><div class="num" style="font-size:36px;line-height:1;align-self:flex-start">${F(bmr)}</div></div></div>`;
  h += `<div class="sec lbl">بياناتك</div><div style="display:grid;grid-template-columns:1fr 1fr;margin:0 20px 12px;border:2px solid #333">${[['m', 'ذكر'], ['f', 'أنثى']].map(([k, l]) => `<button data-a="sex" data-v="${k}" style="height:44px;display:flex;align-items:center;padding:0 14px;font-size:15px;font-weight:800;${seg(S.sex === k)}">${l}</button>`).join('')}</div>`;
  h += '<div style="border-top:2px solid var(--rule)">' + stepper('العمر', S.age, 'سنة', 'age') + stepper('الوزن', S.weight, 'كجم', 'weight') + stepper('الطول', S.height, 'سم', 'height') + '</div>';
  const ACT = [['قليل الحركة', 'شغل مكتبي وبدون تمرين'], ['نشاط خفيف', 'تمرين 1–3 أيام بالأسبوع'], ['نشاط متوسط', 'تمرين 3–5 أيام بالأسبوع'], ['نشاط عالي', 'تمرين 6–7 أيام بالأسبوع']];
  h += '<div class="sec lbl">مستوى نشاطك</div><div style="border-top:2px solid var(--rule)">' + ACT.map(([l, d], k) => { const on = S.act === k; return `<button data-a="act" data-v="${k}" style="width:100%;display:flex;align-items:center;gap:14px;padding:14px 20px;border-bottom:2px solid var(--rule)"><div style="width:20px;height:20px;flex:none;border:2px solid ${on ? O : '#444'};display:flex;align-items:center;justify-content:center"><div style="width:10px;height:10px;background:${on ? O : 'transparent'}"></div></div><div style="flex:1;display:flex;flex-direction:column;gap:2px"><div style="font-size:15px;font-weight:800;color:${on ? O : 'var(--txt)'}">${l}</div><div style="font-size:12px;font-weight:500;color:var(--mut)">${d}</div></div></button>`; }).join('') + '</div>';
  h += `<div class="sec lbl">سرعة النزول</div><div style="display:grid;grid-template-columns:repeat(3,1fr);margin:0 20px;border:2px solid #333">${[['هادي', '−250 سعرة'], ['متوسط', '−500 سعرة'], ['سريع', '−750 سعرة']].map(([l, d], k) => `<button data-a="pace" data-v="${k}" style="padding:10px 12px;display:flex;flex-direction:column;gap:2px;${seg(S.pace === k)}"><span style="font-size:14px;font-weight:900">${l}</span><span style="font-size:11px;font-weight:600">${d}</span></button>`).join('')}</div>`;
  return h;
}

function vSleep() {
  const rec = S.age < 18 ? [8, 10] : S.age < 65 ? [7, 9] : [7, 8];
  const d = new Date(), ms = monthStats(d.getFullYear(), d.getMonth());
  let h = `<div class="rule" style="padding:14px 20px 18px;display:flex;flex-direction:column;gap:6px"><div class="h1">النوم</div><div class="sub">معدل النوم الطبيعي لعمرك، ومتى تنام عشان تصحى نشيط</div></div>`;
  h += `<div class="hero rule"><div style="display:flex;flex-direction:column;gap:6px;padding-bottom:6px"><div class="lbl" style="font-size:13px">المعدل الطبيعي</div><div style="font-size:22px;font-weight:900;line-height:1.2">ساعات<br>بالليلة</div></div><div class="num big" style="font-size:112px;line-height:.8">${rec[0]}–${rec[1]}</div></div>`;
  h += stepper('عمرك', S.age, 'سنة', 'age') + stepper('متى تبغى تصحى؟', tm(S.wake), '', 'wake', true);
  h += '<div class="sec lbl">نام الساعة</div><div style="display:flex;flex-direction:column;gap:8px;padding:0 20px">' + [6, 5, 4].map(cy => {
    const hrs = cy * 1.5, ok = hrs >= rec[0] && hrs <= rec[1];
    return `<div style="display:flex;align-items:center;gap:12px;padding:14px 16px;border:2px solid ${ok ? O : '#333'};background:${ok ? O : 'transparent'};color:${ok ? 'var(--ink)' : 'var(--txt)'}"><div style="flex:1;display:flex;flex-direction:column;gap:3px"><div style="font-size:24px;font-weight:900;line-height:1.1">${tm(S.wake - cy * 90 - 15)}</div><div style="font-size:12px;font-weight:600;color:${ok ? '#3A1400' : 'var(--mut)'}">${cy} دورات · ${hrs} ساعات نوم</div></div><div style="font-size:11px;font-weight:900;padding:4px 8px;border:2px solid currentColor">${ok ? 'موصى به' : hrs < rec[0] ? 'أقل من الطبيعي' : 'أكثر من اللازم'}</div></div>`;
  }).join('') + '<div style="font-size:12px;font-weight:500;color:var(--mut);line-height:1.6">كل دورة نوم ≈ 90 دقيقة، وحسبنا 15 دقيقة لين تغفى.</div></div>';
  if (ms) h += `<div style="margin-top:22px;padding:20px;border-top:2px solid var(--rule);display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:15px;font-weight:800">نمت كويس هذا الشهر</div><div class="lbl" style="font-size:13px">${ms.c.s} من ${ms.n} يوم · ${ms.pct.s}%</div></div><div class="bar"><i style="width:${ms.pct.s}%;background:${O}"></i></div></div>`;
  return h;
}

function permHtml() {
  const perm = 'Notification' in window ? Notification.permission : 'na';
  const m = t => `<div style="font-size:13px;line-height:1.7;color:var(--mut)">${t}</div>`;
  if (perm === 'na') return m(isIOS && !standalone ? 'على الآيفون: ثبّت التطبيق على الشاشة الرئيسية أولاً، بعدها افتحه من الأيقونة وفعّل الإشعارات.' : 'هذا المتصفح ما يدعم الإشعارات. استخدم تذكير التقويم تحت.');
  if (perm === 'default') return `<button class="btn p" data-a="perm">${I.bell}فعّل الإشعارات</button>`;
  if (perm === 'granted') return `<button class="btn" data-a="test">${I.bell}أرسل إشعار تجريبي</button>`;
  return m('الإشعارات مقفلة. فعّلها للتطبيق من إعدادات الجوال.');
}

function vWater() {
  const d = new Date(), k = dkey(d), ml = S.water[k] || 0, g = wGoal(k), n = Math.ceil(g / 250), f = Math.floor(ml / 250), done = ml >= g;
  const ms = monthStats(d.getFullYear(), d.getMonth()), trained = !!(S.log[k] || {}).w, sl = wSlots();
  let h = `<div class="rule" style="padding:14px 20px 18px;display:flex;flex-direction:column;gap:6px"><div class="h1">الماء</div><div class="sub">كم لازم تشرب اليوم، وتذكير يجيك طول اليوم</div></div>`;
  h += `<div class="hero" style="padding-bottom:16px"><div style="display:flex;flex-direction:column;gap:6px;padding-bottom:6px"><div class="lbl" style="font-size:13px">شربت اليوم</div><div style="font-size:22px;font-weight:900;line-height:1.2">من <span class="num" style="font-size:30px">${L(g)}</span> لتر</div></div><div class="num big" style="font-size:112px;line-height:.8">${L(ml)}</div></div>`;
  h += `<div class="rule" style="display:grid;grid-template-columns:repeat(${Math.min(n, 8)},minmax(0,1fr));gap:4px;padding:0 20px 20px">${Array.from({ length: n }, (_, i) => `<div style="height:28px;background:${i < f ? O : STRIPE}"></div>`).join('')}</div>`;
  h += `<div style="padding:16px 20px 0;font-size:15px;font-weight:800;color:${done ? O : 'var(--txt)'}">${done ? 'وصلت هدفك اليوم. كفو!' : `باقي ${L(g - ml)} لتر، يعني تقريباً ${Math.ceil((g - ml) / 250)} أكواب`}</div>`;
  h += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:16px 20px 0"><button class="btn p" data-a="wAdd" data-v="250">${I.plus}كوب · 250 مل</button><button class="btn" data-a="wAdd" data-v="500">${I.plus}قارورة · 500 مل</button></div><div style="padding:8px 20px 0"><button class="btn" data-a="wAdd" data-v="-250" style="width:100%;opacity:${ml ? 1 : .45}">${I.minus}تراجع 250 مل</button></div>`;
  h += `<div class="sec lbl">هدفك اليومي</div><div style="border-top:2px solid var(--rule)">${stepper('وزنك', S.weight, 'كجم', 'weight')}<div class="row" style="padding:14px 20px"><div style="flex:1;font-size:14px;font-weight:600;color:var(--mut)">وزنك × 35 مل</div><div style="display:flex;align-items:baseline;gap:4px"><span class="num" style="font-size:24px">${L(S.weight * 35)}</span><span class="lbl">لتر</span></div></div><div class="row" style="padding:14px 20px"><div style="flex:1;font-size:14px;font-weight:600;color:var(--mut)">${trained ? 'زيادة لأنك تمرّنت اليوم' : 'زيادة يوم التمرين'}</div><div style="display:flex;align-items:baseline;gap:4px;color:${trained ? O : 'var(--mut)'}"><span class="num" style="font-size:24px">+0.5</span><span class="lbl" style="color:inherit">لتر</span></div></div></div>`;
  h += `<div class="sec lbl">تذكير المويه</div><div style="border-top:2px solid var(--rule)"><div class="row" style="padding:16px 20px"><div style="flex:1;display:flex;flex-direction:column;gap:4px"><div style="font-size:15px;font-weight:800">ذكّرني أشرب مويه</div><div style="font-size:12px;font-weight:500;color:var(--mut)">${S.wOn ? `${sl.length} تذكيرات من ${tm(S.wFrom)} لين ${tm(S.wTo)}` : 'التذكير مقفل'}</div></div>${toggle(S.wOn, 'wOn')}</div>`;
  if (S.wOn) h += `<div style="padding:14px 20px;border-bottom:2px solid var(--rule);display:flex;flex-direction:column;gap:10px"><div style="font-size:15px;font-weight:800">كل كم؟</div><div style="display:grid;grid-template-columns:repeat(3,1fr);border:2px solid #333">${[[60, 'كل ساعة'], [120, 'كل ساعتين'], [180, 'كل 3 ساعات']].map(([v, l]) => `<button data-a="wInt" data-v="${v}" style="height:44px;display:flex;align-items:center;padding:0 12px;font-size:14px;font-weight:800;${segS(S.wInt === v)}">${l}</button>`).join('')}</div></div>` + stepper('من الساعة', tm(S.wFrom), '', 'wFrom', true) + stepper('لين الساعة', tm(S.wTo), '', 'wTo', true);
  h += `<div class="rule" style="padding:16px 20px;display:flex;flex-direction:column;gap:10px">${S.wOn ? permHtml() : ''}<button class="btn" data-a="wIcs">${I.cal}أضف تذكيرات المويه للتقويم</button></div></div>`;
  if (ms) h += `<div style="padding:20px;display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:15px;font-weight:800">وصلت هدف المويه هذا الشهر</div><div class="lbl" style="font-size:13px">${ms.c.wa} من ${ms.n} يوم</div></div><div class="bar"><i style="width:${ms.pct.wa}%;background:${O}"></i></div></div>`;
  return h;
}

const METR = [['o', 'الكل'], ['w', 'تمرين'], ['s', 'نوم'], ['d', 'دايت'], ['wa', 'ماء']];
const enc = o => btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const dec = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); const b = atob(s); return JSON.parse(new TextDecoder().decode(Uint8Array.from(b, c => c.charCodeAt(0)))); };
function myCard() {
  const d = new Date(), ms = monthStats(d.getFullYear(), d.getMonth()) || { pct: { w: 0, s: 0, d: 0, wa: 0 }, overall: 0 };
  return { v: 1, id: S.myId, n: S.name || 'أنا', m: mkey(d), o: ms.overall, w: ms.pct.w, s: ms.pct.s, d: ms.pct.d, wa: ms.pct.wa, st: streak(), t: Date.now() };
}
function ago(t) { const n = Math.floor((Date.now() - t) / 86400000); return n <= 0 ? 'اليوم' : n === 1 ? 'أمس' : n === 2 ? 'قبل يومين' : `قبل ${n} أيام`; }
function importCode(raw) {
  let s = String(raw || '').trim(); const i = s.indexOf('f='); if (i >= 0) s = s.slice(i + 2); s = s.split(/[\s&#]/)[0];
  try {
    const o = dec(s);
    if (o.v !== 1 || !o.id || typeof o.n !== 'string') throw 0;
    if (o.id === S.myId) { toast('هذا كرتك أنت'); return false; }
    const id = String(o.id).slice(0, 20), name = o.n.slice(0, 20), isNew = !S.friends[id];
    S.friends[id] = { id, n: name, m: String(o.m).slice(0, 7), o: pc(o.o), w: pc(o.w), s: pc(o.s), d: pc(o.d), wa: pc(o.wa), st: Math.max(0, Math.round(+o.st || 0)), t: +o.t || Date.now() };
    save(); toast(isNew ? `تمت إضافة ${name}` : `تم تحديث نتائج ${name}`); return true;
  } catch (e) { toast('الكود غير صحيح'); return false; }
}
function copyText(x) { (navigator.clipboard ? navigator.clipboard.writeText(x) : Promise.reject()).then(() => toast('تم النسخ')).catch(() => prompt('انسخ الكود:', x)); }

function vFriends() {
  const now = new Date(), cm = mkey(now), met = S.metric;
  const all = [{ ...myCard(), me: true }, ...Object.values(S.friends)].map(x => ({ ...x, v: x.m === cm ? pc(x[met]) : null })).sort((a, b) => (b.v ?? -1) - (a.v ?? -1));
  const nf = all.length - 1, rank = all.findIndex(x => x.me) + 1;
  let h = `<div class="rule" style="padding:14px 20px 18px;display:flex;flex-direction:column;gap:6px"><div class="h1">الأصدقاء</div><div class="sub">تحدّى أصحابك وشوف مين الأكثر التزام هذا الشهر</div></div>`;
  if (linkCode) h += `<div style="margin:16px 20px 0;border:2px solid ${O};padding:14px 16px;display:flex;flex-direction:column;gap:10px"><div style="font-size:13px;line-height:1.7">إذا التطبيق مثبّت على شاشتك الرئيسية، انسخ الكود وألصقه في صفحة الأصدقاء داخل التطبيق.</div><button class="btn p" data-a="copyLink" style="align-self:flex-start">${I.copy}انسخ كود الصديق</button></div>`;
  if (nf) h += `<div class="hero rule"><div style="display:flex;flex-direction:column;gap:6px;padding-bottom:6px"><div class="lbl" style="font-size:13px">ترتيبك في ${mName(now.getFullYear(), now.getMonth())}</div><div style="font-size:22px;font-weight:900;line-height:1.2">${rank === 1 ? 'أنت المتصدّر' : `قدّامك ${rank - 1}`}</div></div><div class="num big">${rank}<span style="font-size:48px;color:var(--mut)">/${all.length}</span></div></div>`;
  else h += `<div style="background:${O};color:var(--ink);padding:20px;display:flex;flex-direction:column;gap:8px"><div style="font-size:30px;font-weight:900;line-height:1.1">تحدّى أصحابك</div><div style="font-size:14px;font-weight:500;line-height:1.6;text-wrap:pretty">أرسل كرتك لأصحابك وخلهم يرسلون لك كروتهم. كل واحد يضيف الثاني وتبدأ المنافسة.</div></div>`;
  h += `<div class="sec lbl">كرتك</div><div style="border-top:2px solid var(--rule)"><div class="row"><div style="font-size:15px;font-weight:800;flex:none">اسمك</div><input data-in="name" value="${esc(S.name)}" placeholder="اكتب اسمك" maxlength="20" style="flex:1;min-width:0;height:44px;border:2px solid #333;background:transparent;color:var(--txt);padding:0 12px;font:inherit;font-size:16px;font-weight:700"></div><div class="rule" style="padding:16px 20px;display:flex;flex-direction:column;gap:10px"><button class="btn p" data-a="share">${I.share}شارك كرتك</button><div style="font-size:12px;line-height:1.7;color:var(--mut)">النتائج تتحدث كل ما أرسل واحد منكم كرته من جديد.</div></div></div>`;
  if (nf) {
    h += `<div class="sec lbl">الترتيب</div><div style="display:grid;grid-template-columns:repeat(5,1fr);margin:0 20px 12px;border:2px solid #333">${METR.map(([k, l]) => `<button data-a="metric" data-v="${k}" style="height:40px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;${segS(met === k)}">${l}</button>`).join('')}</div><div style="border-top:2px solid var(--rule)">`;
    h += all.map((x, i) => { const top = i === 0 && x.v !== null; return `<div style="display:flex;align-items:center;gap:14px;padding:14px 20px;border-bottom:2px solid var(--rule);background:${x.me ? '#141414' : 'transparent'}"><div class="num" style="width:40px;height:40px;flex:none;display:flex;align-items:center;justify-content:center;font-size:24px;background:${top ? O : 'transparent'};color:${top ? 'var(--ink)' : 'var(--txt)'};border:2px solid ${top ? O : '#333'}">${i + 1}</div><div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:6px"><div style="display:flex;align-items:center;gap:8px;min-width:0"><span style="font-size:16px;font-weight:900;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(x.me ? (S.name || 'أنت') : x.n)}</span>${x.me ? `<span style="font-size:10px;font-weight:900;padding:2px 6px;border:2px solid ${O};color:${O};flex:none">أنت</span>` : ''}</div><div class="bar" style="height:8px"><i style="width:${x.v || 0}%;background:${top ? O : 'var(--txt)'}"></i></div><div style="font-size:11px;font-weight:600;color:var(--mut)">${x.v === null ? 'بيانات شهر سابق · اطلب منه يرسل كرته' : `سلسلة ${x.st} أيام${x.me ? '' : ` · ${ago(x.t)}`}`}</div></div><div class="num" style="font-size:30px;line-height:1;color:${top ? O : 'var(--txt)'}">${x.v === null ? '—' : x.v + '%'}</div>${x.me ? '' : `<button data-a="rmFriend" data-v="${esc(x.id)}" aria-label="حذف" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex:none;color:var(--mut)">${I.x}</button>`}</div>`; }).join('') + '</div>';
  }
  h += `<div class="sec lbl">أضف صديق</div><div style="display:flex;gap:8px;padding:0 20px"><input id="fcode" placeholder="الصق رابط أو كود صديقك" style="flex:1;min-width:0;height:48px;border:2px solid #333;background:transparent;color:var(--txt);padding:0 12px;font:inherit;font-size:16px"><button class="btn p" data-a="addFriend">أضف</button></div>`;
  return h;
}

let toastT;
function toast(m) { const el = document.getElementById('toast'); el.textContent = m; el.style.opacity = 1; el.style.transform = 'translateY(0)'; clearTimeout(toastT); toastT = setTimeout(() => { el.style.opacity = 0; el.style.transform = 'translateY(8px)'; }, 2400); }

const main = document.getElementById('main');
function render(keep = true) {
  const st = main.scrollTop;
  main.innerHTML = ({ today: vToday, month: vMonth, cal: vCal, sleep: vSleep, water: vWater, friends: vFriends }[S.tab] || vToday)();
  main.scrollTop = keep ? st : 0;
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('on', b.dataset.v === S.tab));
}

async function notify(title, body, tag) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return false;
  const opt = { body, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: tag || title, lang: 'ar', dir: 'rtl' };
  try {
    const reg = navigator.serviceWorker ? await navigator.serviceWorker.getRegistration() : null;
    if (reg) await reg.showNotification(title, opt); else new Notification(title, opt);
    return true;
  } catch (e) { return false; }
}
async function regPeriodic() {
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg || !('periodicSync' in reg)) return;
    const p = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (p.state === 'granted') await reg.periodicSync.register('iltizam-daily', { minInterval: 6 * 3600 * 1000 });
  } catch (e) {}
}
const hms = t => `${pad(Math.floor(t / 60))}${pad(t % 60)}00`;
function waterIcs() {
  const d = new Date(), ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Iltizam//AR', 'CALSCALE:GREGORIAN'];
  wSlots().forEach(t => lines.push('BEGIN:VEVENT', `UID:iltizam-water-${t}`, `DTSTAMP:${ymd}T000000Z`, `DTSTART:${ymd}T${hms(t)}`, 'DURATION:PT5M', 'RRULE:FREQ=DAILY', 'SUMMARY:التزام: اشرب مويه', 'DESCRIPTION:اشرب كوب مويه الحين', 'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:اشرب مويه', 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT'));
  lines.push('END:VCALENDAR');
  saveIcs(lines.join('\r\n'), 'iltizam-water.ics');
}
function saveIcs(ics, name) {
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
}
function downloadIcs() {
  const d = new Date(), ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`, hm = `${pad(Math.floor(S.remTime / 60))}${pad(S.remTime % 60)}00`;
  const f = new Date(d.getFullYear(), d.getMonth() + 1, 1), fy = `${f.getFullYear()}${pad(f.getMonth() + 1)}01`;
  const ev = (uid, start, rule, sum, desc) => ['BEGIN:VEVENT', `UID:${uid}`, `DTSTAMP:${ymd}T000000Z`, `DTSTART:${start}`, 'DURATION:PT10M', `RRULE:${rule}`, `SUMMARY:${sum}`, `DESCRIPTION:${desc}`, 'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${sum}`, 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT'];
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Iltizam//AR', 'CALSCALE:GREGORIAN',
    ...ev('iltizam-daily', `${ymd}T${hm}`, 'FREQ=DAILY', 'التزام: سجّل يومك', 'سجّل تمرينك ونومك والدايت'),
    ...ev('iltizam-monthly', `${fy}T100000`, 'FREQ=MONTHLY;BYMONTHDAY=1', 'التزام: تقريرك الشهري جاهز', 'افتح التطبيق وشوف نسبة التزامك'),
    'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = 'iltizam-reminder.ics';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
}

const LIM = { age: [14, 90], weight: [40, 200], height: [140, 215] };
async function act(a, v) {
  const k = dkey(new Date());
  switch (a) {
    case 'tab': S.tab = v; save(); render(false); return;
    case 'hab': S.log[k] = Object.assign({}, S.log[k]); S.log[k][v] = !S.log[k][v]; if (S.log[k][v] && navigator.vibrate) navigator.vibrate(15); break;
    case 'remToggle': S.remOn = !S.remOn; break;
    case 'rem': S.remTime = (S.remTime + 30 * +v + 1440) % 1440; S.notified = ''; break;
    case 'wake': S.wake = (S.wake + 15 * +v + 1440) % 1440; break;
    case 'age': case 'weight': case 'height': S[a] = clamp(S[a] + +v, ...LIM[a]); break;
    case 'sex': S.sex = v; break;
    case 'act': S.act = +v; break;
    case 'pace': S.pace = +v; break;
    case 'mPrev': S.mOff = Math.max(minOff(), S.mOff - 1); break;
    case 'mNext': S.mOff = Math.min(0, S.mOff + 1); break;
    case 'report': S.reportSeen = prevMonth().key; S.tab = 'month'; S.mOff = -1; save(); render(false); return;
    case 'perm': await Notification.requestPermission(); regPeriodic(); break;
    case 'test': notify('التزام', `الإشعارات شغّالة. بنذكّرك كل يوم الساعة ${tm(S.remTime)}.`, 'test'); return;
    case 'ics': downloadIcs(); return;
    case 'install': if (deferredInstall) { deferredInstall.prompt(); await deferredInstall.userChoice; deferredInstall = null; } break;
    case 'closeInstall': S.installClosed = true; break;
    case 'wAdd': S.water[k] = Math.max(0, (S.water[k] || 0) + +v); if (+v > 0 && navigator.vibrate) navigator.vibrate(15); if (+v > 0 && (S.water[k] >= wGoal(k)) && (S.water[k] - +v) < wGoal(k)) toast('وصلت هدف المويه اليوم!'); break;
    case 'wOn': S.wOn = !S.wOn; break;
    case 'wInt': S.wInt = +v; S.wNotified = ''; break;
    case 'wFrom': S.wFrom = clamp(S.wFrom + 30 * +v, 0, S.wTo - 60); S.wNotified = ''; break;
    case 'wTo': S.wTo = clamp(S.wTo + 30 * +v, S.wFrom + 60, 1410); S.wNotified = ''; break;
    case 'wIcs': waterIcs(); return;
    case 'metric': S.metric = v; break;
    case 'rmFriend': if (S.friends[v] && confirm(`تحذف ${S.friends[v].n} من قائمة أصدقائك؟`)) delete S.friends[v]; break;
    case 'addFriend': { const el = document.getElementById('fcode'); if (!el.value.trim()) { toast('الصق رابط أو كود صديقك'); return; } if (!importCode(el.value)) return; break; }
    case 'copyLink': copyText(linkCode); return;
    case 'share': {
      if (!S.name) { toast('اكتب اسمك أول'); const el = document.querySelector('[data-in="name"]'); if (el) el.focus(); return; }
      const c = myCard(), url = location.origin + location.pathname + '#f=' + enc(c);
      const text = `${S.name} يتحداك في التزام! نسبة التزامي هذا الشهر ${c.o}%. افتح الرابط عشان تضيفني:`;
      if (navigator.share) navigator.share({ title: 'التزام', text, url }).catch(() => {}); else copyText(`${text} ${url}`);
      return;
    }
  }
  save(); render();
}
document.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (b) act(b.dataset.a, b.dataset.v); });
document.addEventListener('change', e => { if (e.target.dataset.in === 'name') { S.name = e.target.value.trim().slice(0, 20); save(); render(); } });
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'fcode') act('addFriend'); if (e.key === 'Enter' && e.target.dataset.in === 'name') e.target.blur(); });

let lastSig = '';
async function tick() {
  const d = new Date(), k = dkey(d), mins = d.getHours() * 60 + d.getMinutes(), t = S.log[k] || {};
  const left = HB.filter(h => !t[h.k]);
  if (S.remOn && mins >= S.remTime && left.length && S.notified !== k) {
    const st = await readState();
    if (st && st.notified === k) S.notified = k;
    else if (await notify('التزام: سجّل يومك', `باقي: ${left.map(h => h.name).join('، ')}. لا تكسر السلسلة.`, 'daily')) S.notified = k;
    save();
  }
  if (S.wOn) {
    const ml = S.water[k] || 0, g = wGoal(k); let slot = -1;
    wSlots().forEach(x => { if (x <= mins) slot = x; });
    const tag = `${k}|${pad4(slot)}`;
    if (slot >= 0 && ml < g && S.wNotified < tag) {
      const st = await readState();
      if (st && (st.wNotified || '') >= tag) S.wNotified = st.wNotified;
      else if (await notify('التزام: وقت المويه', `شربت ${L(ml)} من ${L(g)} لتر. اشرب كوب الحين.`, 'water')) S.wNotified = tag;
      save();
    }
  }
  const p = prevMonth(), ps = monthStats(p.y, p.m);
  if (ps && S.reportNotified !== p.key && await notify(`تقرير ${mName(p.y, p.m)} جاهز`, `نسبة التزامك ${ps.overall}%. افتح التطبيق وشوف الفيدباك.`, 'report')) { S.reportNotified = p.key; save(); }
  const sig = `${k}|${mins >= S.remTime}`;
  if (sig !== lastSig) { if (lastSig && S.tab === 'today') render(); lastSig = sig; }
}

window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; if (S.tab === 'today') render(); });
window.addEventListener('appinstalled', () => { deferredInstall = null; S.installClosed = true; save(); render(); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { render(); tick(); } });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').then(regPeriodic).catch(() => {});

if (location.hash.startsWith('#f=')) {
  const code = location.hash.slice(3);
  if (importCode(code)) { S.tab = 'friends'; if (!standalone) linkCode = code; }
  history.replaceState(null, '', location.pathname + location.search);
}
save(); render(false); tick(); setInterval(tick, 30000);
