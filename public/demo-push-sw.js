self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('push',event=>{let data={title:'Mais Você · Novo pedido',body:'Há um novo pedido demonstrativo.',url:'/gestor'};try{data={...data,...event.data.json()}}catch{}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:'/assets/mais-voce/optimized/logo.webp',badge:'/assets/mais-voce/optimized/logo.webp',tag:data.tag||'mais-voce-demo-order',renotify:true,data:{url:data.url}}))});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow(event.notification.data?.url||'/gestor'))});

self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim())});
