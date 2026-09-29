const V = 'iltizam-v2';
const SHELL = ['./', './index.html', './app.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'];
const STATE_URL = new URL('state.json', self.registration.scope).href;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V && k !== 'iltizam-state').map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  if (r.url.startsWith(self.location.origin)) {
    e.respondWith(fetch(r).then(res => {
      if (res.ok) { const cl = res.clone(); caches.open(V).then(c => c.put(r, cl)); }
      return res;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
      if (res.ok || res.type === 'opaque') { const cl = res.clone(); caches.open(V).then(c => c.put(r, cl)); }
      return res;
    })));
  }
});

const pad = n => String(n).padStart(2, '0');
const dkey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const L = ml => String(+(ml / 1000).toFixed(2));
const note = (title, body, tag) => self.registration.showNotification(title, { body, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag, lang: 'ar', dir: 'rtl' });

async function check() {
  const c = await caches.open('iltizam-state');
  const r = await c.match(STATE_URL);
  if (!r) return;
  const s = await r.json();
  const d = new Date(), k = dkey(d), mins = d.getHours() * 60 + d.getMinutes();
  const same = s.todayKey === k, t = same ? (s.today || {}) : {};
  let dirty = false;
  if (s.remOn && s.notified !== k && mins >= s.remTime && ['w', 's', 'd'].some(x => !t[x])) {
    await note('التزام: سجّل يومك', 'لا تنسى تسجّل تمرينك ونومك والدايت اليوم.', 'daily');
    s.notified = k; dirty = true;
  }
  if (s.wOn) {
    const ml = same ? (s.wMl || 0) : 0, g = same ? s.wGoal : s.wBase;
    let slot = -1;
    for (let x = s.wFrom; x <= s.wTo; x += s.wInt) if (x <= mins) slot = x;
    const tag = `${k}|${String(slot).padStart(4, '0')}`;
    if (slot >= 0 && ml < g && (s.wNotified || '') < tag) {
      await note('التزام: وقت المويه', `شربت ${L(ml)} من ${L(g)} لتر. اشرب كوب الحين.`, 'water');
      s.wNotified = tag; dirty = true;
    }
  }
  if (dirty) await c.put(STATE_URL, new Response(JSON.stringify(s), { headers: { 'Content-Type': 'application/json' } }));
}

self.addEventListener('periodicsync', e => { if (e.tag === 'iltizam-daily') e.waitUntil(check()); });

self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) { data = { body: e.data && e.data.text() }; }
  e.waitUntil(note(data.title || 'التزام', data.body || 'سجّل يومك', 'push'));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) if ('focus' in c) return c.focus();
    return clients.openWindow('./');
  }));
});
