// ---------- CONFIG ----------
const WEDDING_DATETIME_LOCAL = "2026-05-30T16:00:00"; // 4:00 PM local AZ time (edit anytime)
const PHX_TRAVEL_TIME = "~2 hours";
const VENUE_ELEVATION = "~4,500 feet";

// ---------- Helpers ----------
function $(sel){ return document.querySelector(sel); }
function pad(n){ return String(n).padStart(2,"0"); }

// ---------- Fireflies ----------
(function initFireflies(){
  const host = document.querySelector(".fireflies");
  if(!host) return;

  const count = 12; // keep subtle
  for(let i=0;i<count;i++){
    const f = document.createElement("div");
    f.className = "firefly";

    // edge bias: mostly left/right edges
    const edge = Math.random() < 0.5 ? "left" : "right";
    const x = edge === "left"
      ? (Math.random() * 8) // 0-8% from left
      : (92 + Math.random() * 8); // 92-100% from left
    const y = Math.random() * 100;

    const dx = (edge === "left" ? 12 : -12) + (Math.random()*14 - 7); // drift inward a bit
    const dy = -(50 + Math.random()*70); // drift upward

    const size = 4 + Math.random()*4;
    const dur = 10 + Math.random()*10;
    const delay = Math.random()*10;

    f.style.left = `${x}%`;
    f.style.top = `${y}%`;
    f.style.width = `${size}px`;
    f.style.height = `${size}px`;
    f.style.setProperty("--dx", `${dx}px`);
    f.style.setProperty("--dy", `${dy}px`);
    f.style.animationDuration = `${dur}s`;
    f.style.animationDelay = `${delay}s`;

    host.appendChild(f);
  }
})();

// ---------- Countdown ----------
(function initCountdown(){
  const daysEl = $("#cd-days");
  const hoursEl = $("#cd-hours");
  const minsEl = $("#cd-mins");
  const secsEl = $("#cd-secs");
  const targetEl = $("#countdown-target");

  if(targetEl){
    targetEl.textContent = `Counting down to May 30, 2026 • ${new Date(WEDDING_DATETIME_LOCAL).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'})}`;
  }

  if(!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const target = new Date(WEDDING_DATETIME_LOCAL);

  function tick(){
    const now = new Date();
    let diff = target - now;

    if(diff <= 0){
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      const msg = $("#countdown-target");
      if(msg) msg.textContent = "Today’s the day ✨";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// ---------- Travel constants injection (optional placeholders) ----------
(function injectConstants(){
  const t = $("#phx-travel-time");
  if(t) t.textContent = PHX_TRAVEL_TIME;

  const e = $("#venue-elevation");
  if(e) e.textContent = VENUE_ELEVATION;
})();

