/**
 * Aurora — Ambient gradient blobs that drift behind all content
 * Creates a dreamy, colorful background atmosphere.
 */

const AURORA_CONFIG = [
  {
    id: 'aurora-blob-1',
    gradient: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(251, 191, 36, 0.15) 40%, transparent 70%)',
    size: 500,
    top: '-5%',
    left: '-5%',
    animation: 'auroraDrift1 20s ease-in-out infinite alternate',
  },
  {
    id: 'aurora-blob-2',
    gradient: 'radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, rgba(20, 184, 166, 0.12) 40%, transparent 70%)',
    size: 450,
    top: '-8%',
    right: '-5%',
    animation: 'auroraDrift2 25s ease-in-out infinite alternate',
  },
  {
    id: 'aurora-blob-3',
    gradient: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(124, 58, 237, 0.12) 40%, transparent 70%)',
    size: 400,
    bottom: '5%',
    left: '30%',
    animation: 'auroraDrift3 18s ease-in-out infinite alternate',
  },
];

const KEYFRAMES_CSS = `
@keyframes auroraDrift1 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(60px, 40px) scale(1.08);
  }
  50% {
    transform: translate(30px, 80px) scale(0.95);
  }
  75% {
    transform: translate(-20px, 50px) scale(1.12);
  }
  100% {
    transform: translate(-40px, 20px) scale(1.02);
  }
}

@keyframes auroraDrift2 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(-50px, 50px) scale(1.1);
  }
  50% {
    transform: translate(-80px, 20px) scale(0.92);
  }
  75% {
    transform: translate(-30px, -30px) scale(1.05);
  }
  100% {
    transform: translate(20px, -50px) scale(0.98);
  }
}

@keyframes auroraDrift3 {
  0% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(40px, -30px) scale(1.06);
  }
  50% {
    transform: translate(-30px, -60px) scale(1.12);
  }
  75% {
    transform: translate(-60px, -20px) scale(0.94);
  }
  100% {
    transform: translate(20px, 30px) scale(1.08);
  }
}
`;

export function initAurora() {
  // Inject keyframes stylesheet
  const styleEl = document.createElement('style');
  styleEl.textContent = KEYFRAMES_CSS;
  document.head.appendChild(styleEl);

  // Create aurora blobs
  AURORA_CONFIG.forEach((config) => {
    const blob = document.createElement('div');
    blob.className = 'aurora-blob';
    blob.id = config.id;

    Object.assign(blob.style, {
      position: 'fixed',
      width: config.size + 'px',
      height: config.size + 'px',
      background: config.gradient,
      borderRadius: '50%',
      filter: 'blur(100px)',
      opacity: '0.12',
      zIndex: '0',
      pointerEvents: 'none',
      willChange: 'transform',
      animation: config.animation,
    });

    if (config.top) blob.style.top = config.top;
    if (config.left) blob.style.left = config.left;
    if (config.right) blob.style.right = config.right;
    if (config.bottom) blob.style.bottom = config.bottom;

    document.body.appendChild(blob);
  });
}
