const CACHE_NAME = "finbuddy-v4";
const CACHE_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./Logo.png",
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
];

const IDB_NAME = "finbuddy";
const IDB_STORE = "state";
const DIGEST_KEY = "finbuddy_last_digest_week";

function localDateKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function weekKey(d = new Date()) {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay() || 7;
  date.setDate(date.getDate() + 4 - day);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

function openIDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet(key) {
  return openIDB().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readonly");
    const req = tx.objectStore(IDB_STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}

function idbPut(key, value) {
  return openIDB().then((db) => new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  }));
}

function entryDate(e) {
  if (e.date) return e.date;
  return localDateKey(new Date(e.id));
}

function fmtInr(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function buildWeeklyDigest(expenses, categories) {
  const today = new Date();
  const end = localDateKey(today);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 6);
  const start = localDateKey(startDate);

  const weekExp = expenses.filter((e) => {
    const d = entryDate(e);
    return d >= start && d <= end;
  });

  if (!weekExp.length) return null;

  const total = weekExp.reduce((s, e) => s + e.amount, 0);
  const catTotals = {};
  weekExp.forEach((e) => {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });

  const catLabel = (id) => {
    const c = categories.find((x) => x.id === id);
    return c ? c.label : id;
  };

  const top = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];
  const topLine = top ? ` Top: ${catLabel(top[0])} ${fmtInr(top[1])}.` : "";

  return `This week: ${fmtInr(total)} across ${weekExp.length} transactions.${topLine} Tap to open.`;
}

async function maybeFireWeeklyDigest() {
  if (new Date().getDay() !== 0) return;

  const state = await idbGet("mirror");
  if (!state || !Array.isArray(state.expenses)) return;

  const currentWeek = weekKey();
  const lastSent = state[DIGEST_KEY];
  if (lastSent === currentWeek) return;

  const body = buildWeeklyDigest(state.expenses, state.categories || []);
  if (!body) return;

  await self.registration.showNotification("FinBuddy Weekly Digest", {
    body,
    icon: "./Logo.png",
    badge: "./Logo.png",
    vibrate: [200, 100, 200],
    tag: "weekly-digest",
    data: { tab: "home" },
  });

  const updated = { ...state, [DIGEST_KEY]: currentWeek };
  await idbPut("mirror", updated);
}

self.addEventListener("message", (event) => {
  if (!event.data) return;

  if (event.data.type === "show-notification") {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: "./Logo.png",
      badge: "./Logo.png",
      vibrate: [200, 100, 200],
      tag: event.data.tag || "budget-alert",
      requireInteraction: true,
    });
  }

  if (event.data.type === "weekly-digest-check") {
    maybeFireWeeklyDigest();
  }
});

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "weekly-digest") {
    event.waitUntil(maybeFireWeeklyDigest());
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const tab = (event.notification.data && event.notification.data.tab) || "home";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("index.html") || client.url.endsWith("/")) {
          client.postMessage({ type: "navigate-tab", tab });
          return client.focus();
        }
      }
      return clients.openWindow(`./?tab=${tab}`);
    })
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match("./index.html");
        });
      })
  );
});