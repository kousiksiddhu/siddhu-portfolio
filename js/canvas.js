/**
 * Hero neural-mesh canvas — drifting nodes joined by proximity links,
 * gently reactive to the pointer. Skipped entirely for reduced motion.
 */
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const LINK_DIST = 130;
  const MOUSE_DIST = 200;

  let width = 0;
  let height = 0;
  let nodes = [];
  let raf = null;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
  }

  function seed() {
    const count = Math.min(90, Math.floor((width * height) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }

    // Links between close nodes
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          const t = 1 - dist / LINK_DIST;
          // Links near the pointer glow lime, elsewhere stay faint white
          const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
          const md = Math.hypot(mid.x - mouse.x, mid.y - mouse.y);
          const nearMouse = Math.max(0, 1 - md / MOUSE_DIST);
          ctx.strokeStyle = nearMouse > 0.05
            ? `rgba(200, 240, 77, ${0.05 + t * 0.22 * nearMouse})`
            : `rgba(255, 255, 255, ${t * 0.05})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      const near = Math.max(0, 1 - md / MOUSE_DIST);
      ctx.fillStyle = near > 0.05
        ? `rgba(200, 240, 77, ${0.35 + near * 0.5})`
        : 'rgba(255, 255, 255, 0.28)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + near * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  // Pause when the hero is off-screen
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!raf) raf = requestAnimationFrame(step);
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  });
  io.observe(canvas);

  resize();
}
