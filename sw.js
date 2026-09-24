const C='trading-journal-gold-v8';
const A=['./','./index.html','./styles.css?v=8','./app.js?v=8','./manifest.webmanifest?v=8','./icon-gold.png?v=8'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(e.request.mode==='navigate' || u.pathname.endsWith('/styles.css') || u.pathname.endsWith('/app.js') || u.pathname.endsWith('/manifest.webmanifest')){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const c=r.clone();caches.open(C).then(k=>k.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const c=x.clone();caches.open(C).then(k=>k.put(e.request,c));return x})));
  }
});