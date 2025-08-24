// -- Utilities: prefers-reduced-motion
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// -- Mobile nav
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle){
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// -- Year
document.getElementById('year').textContent = new Date().getFullYear();

// -- Scroll reveal / count-ups
const revealItems = document.querySelectorAll('.reveal, .gallery figure');
const nums = document.querySelectorAll('.num');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      // Count-up for metrics
      if (entry.target.classList.contains('num')){
        const end = Number(entry.target.getAttribute('data-count') || 0);
        animateCount(entry.target, end);
      }
    }
  });
}, { threshold: 0.2 });

[...revealItems, ...nums].forEach(el => io.observe(el));

function animateCount(el, end){
  if (reduceMotion){ el.textContent = end.toLocaleString(); return; }
  let start = 0;
  const duration = 1000 + Math.random() * 700;
  const t0 = performance.now();
  function tick(now){
    const p = Math.min(1, (now - t0) / duration);
    const val = Math.floor(start + p * (end - start));
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// -- Typing effect restart on load (no loop to keep it classy)
window.addEventListener('load', () => {
  const el = document.querySelector('.typing');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  if (reduceMotion){ el.textContent = text; el.style.borderRight = 'none'; return; }
  let i = 0;
  const step = () => {
    el.textContent = text.slice(0, i++);
    if (i <= text.length) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
});

// -- Starfield canvas
(function starfield(){
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let W, H, stars;
  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.min(220, Math.floor(W * H / 12000));
    stars = Array.from({length: count}, () => ({
      x: Math.random()*W,
      y: Math.random()*H,
      z: Math.random()*0.8 + 0.2,
      r: Math.random()*1.6 + 0.2,
      vx: (Math.random()-0.5)*0.08,
      vy: (Math.random()-0.5)*0.08
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function draw(){
    ctx.clearRect(0,0,W,H);
    for (const s of stars){
      ctx.globalAlpha = 0.4 + s.z*0.6;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = '#cbe7ff';
      ctx.fill();
      // gentle drift
      s.x += s.vx * (reduceMotion ? 0 : 1);
      s.y += s.vy * (reduceMotion ? 0 : 1);
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  draw();
})();
