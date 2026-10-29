'use strict';

// Written by tool/build_web.dart: do not edit.
const CACHE = 'mind-engine-24d89243';
const FILES = [
  "./",
  "assets/AssetManifest.bin",
  "assets/AssetManifest.bin.json",
  "assets/FontManifest.json",
  "assets/NOTICES",
  "assets/assets/audio/music/ambiance.m4a",
  "assets/assets/audio/sfx/achievement.wav",
  "assets/assets/audio/sfx/coin.wav",
  "assets/assets/audio/sfx/coinShower.wav",
  "assets/assets/audio/sfx/combo_1.wav",
  "assets/assets/audio/sfx/combo_2.wav",
  "assets/assets/audio/sfx/combo_3.wav",
  "assets/assets/audio/sfx/combo_4.wav",
  "assets/assets/audio/sfx/combo_5.wav",
  "assets/assets/audio/sfx/combo_6.wav",
  "assets/assets/audio/sfx/combo_7.wav",
  "assets/assets/audio/sfx/combo_8.wav",
  "assets/assets/audio/sfx/correct.wav",
  "assets/assets/audio/sfx/denied.wav",
  "assets/assets/audio/sfx/erase.wav",
  "assets/assets/audio/sfx/hint.wav",
  "assets/assets/audio/sfx/lineComplete.wav",
  "assets/assets/audio/sfx/lose.wav",
  "assets/assets/audio/sfx/mark.wav",
  "assets/assets/audio/sfx/mission.wav",
  "assets/assets/audio/sfx/place.wav",
  "assets/assets/audio/sfx/purchase.wav",
  "assets/assets/audio/sfx/record.wav",
  "assets/assets/audio/sfx/select.wav",
  "assets/assets/audio/sfx/sheetOpen.wav",
  "assets/assets/audio/sfx/streak.wav",
  "assets/assets/audio/sfx/switchOff.wav",
  "assets/assets/audio/sfx/switchOn.wav",
  "assets/assets/audio/sfx/tap.wav",
  "assets/assets/audio/sfx/tick.wav",
  "assets/assets/audio/sfx/timeUp.wav",
  "assets/assets/audio/sfx/win.wav",
  "assets/assets/audio/sfx/wrong.wav",
  "assets/assets/branding/logo_dark.png",
  "assets/assets/branding/logo_light.png",
  "assets/assets/fonts/BricolageGrotesque-500.ttf",
  "assets/assets/fonts/BricolageGrotesque-600.ttf",
  "assets/assets/fonts/BricolageGrotesque-700.ttf",
  "assets/assets/fonts/BricolageGrotesque-800.ttf",
  "assets/assets/fonts/Figtree-400.ttf",
  "assets/assets/fonts/Figtree-500.ttf",
  "assets/assets/fonts/Figtree-600.ttf",
  "assets/assets/fonts/Figtree-700.ttf",
  "assets/assets/fonts/Figtree-800.ttf",
  "assets/assets/mascot/filou/book.png",
  "assets/assets/mascot/filou/calendar.png",
  "assets/assets/mascot/filou/cheer.png",
  "assets/assets/mascot/filou/clap.png",
  "assets/assets/mascot/filou/coins.png",
  "assets/assets/mascot/filou/confetti.png",
  "assets/assets/mascot/filou/explain.png",
  "assets/assets/mascot/filou/head.png",
  "assets/assets/mascot/filou/hello.png",
  "assets/assets/mascot/filou/idea.png",
  "assets/assets/mascot/filou/juggle.png",
  "assets/assets/mascot/filou/magnifier.png",
  "assets/assets/mascot/filou/pencil.png",
  "assets/assets/mascot/filou/phone.png",
  "assets/assets/mascot/filou/proud.png",
  "assets/assets/mascot/filou/puzzle.png",
  "assets/assets/mascot/filou/run.png",
  "assets/assets/mascot/filou/sad.png",
  "assets/assets/mascot/filou/sit.png",
  "assets/assets/mascot/filou/sleep.png",
  "assets/assets/mascot/filou/surprised.png",
  "assets/assets/mascot/filou/think.png",
  "assets/assets/mascot/filou/thumbs.png",
  "assets/assets/mascot/filou/trophy.png",
  "assets/assets/mascot/filou/worried.png",
  "assets/fonts/MaterialIcons-Regular.otf",
  "assets/packages/cupertino_icons/assets/CupertinoIcons.ttf",
  "assets/packages/flutter_local_notifications_web/web/notifications_service_worker.js",
  "assets/shaders/ink_sparkle.frag",
  "assets/shaders/stretch_effect.frag",
  "canvaskit/canvaskit.js",
  "canvaskit/canvaskit.wasm",
  "canvaskit/chromium/canvaskit.js",
  "canvaskit/chromium/canvaskit.wasm",
  "favicon.png",
  "flutter.js",
  "flutter_bootstrap.js",
  "icons/Icon-192.png",
  "icons/Icon-512.png",
  "icons/Icon-maskable-192.png",
  "icons/Icon-maskable-512.png",
  "index.html",
  "main.dart.js",
  "manifest.json",
  "version.json"
];

// The whole app is downloaded at once, so it works offline from then on.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(
        FILES.map((file) => new Request(file, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

// A new version drops the cache of the previous ones.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('mind-engine-') && key !== CACHE)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// From the cache first; whatever is missing from it is fetched, and kept
// for next time.
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = request.mode === 'navigate'
      ? await cache.match('./')
      : await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  })());
});
