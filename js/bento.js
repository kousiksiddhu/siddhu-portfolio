/**
 * Bento — 3D tilt effect + radial glow overlay on cards
 * Applies to .skill-card and .project-card elements.
 */

const MAX_TILT = 5; // degrees
const PERSPECTIVE = 1000; // px

export function initBento() {
  const cards = document.querySelectorAll('.skill-card, .project-card');

  cards.forEach((card) => {
    // Create glow overlay element
    const glow = document.createElement('div');
    glow.className = 'bento-glow';
    Object.assign(glow.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.3s ease',
      zIndex: '1',
    });
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(glow);

    // Mouse move — calculate tilt + glow
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Normalize to -1..1
      const normalX = mouseX / (rect.width / 2);
      const normalY = mouseY / (rect.height / 2);

      // Tilt: rotateX is based on Y-axis offset, rotateY on X-axis offset
      const rotateX = -normalY * MAX_TILT;
      const rotateY = normalX * MAX_TILT;

      card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease-out';

      // Glow follows mouse position within card
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      glow.style.background = `radial-gradient(
        circle at ${relX}px ${relY}px,
        rgba(245, 158, 11, 0.12) 0%,
        rgba(45, 212, 191, 0.06) 40%,
        transparent 70%
      )`;
      glow.style.opacity = '1';
    });

    // Mouse leave — reset
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`;
      card.style.transition = 'transform 0.5s ease-out';
      glow.style.opacity = '0';
    });
  });
}
