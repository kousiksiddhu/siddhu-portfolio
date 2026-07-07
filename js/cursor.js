/**
 * Custom Cursor — Dot + trailing ring with hover/click states
 * Gracefully disabled on touch devices.
 */

const INTERACTIVE_SELECTORS = 'a, button, .glass-card, .skill-card, .project-card, input, textarea';
const LERP_FACTOR = 0.15;

export function initCursor() {
  // Detect touch device — bail early
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return;

  // Create cursor elements
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  let isVisible = false;
  let rafId = null;

  function showCursor() {
    if (!isVisible) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisible = true;
    }
  }

  function hideCursor() {
    if (isVisible) {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      isVisible = false;
    }
  }

  // Mouse move — position dot instantly
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    showCursor();
  }

  // Ring follows with lerp
  function animateRing() {
    ringX += (mouseX - ringX) * LERP_FACTOR;
    ringY += (mouseY - ringY) * LERP_FACTOR;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(animateRing);
  }

  // Hover states on interactive elements
  function onElementEnter() {
    ring.classList.add('hover');
  }

  function onElementLeave() {
    ring.classList.remove('hover');
  }

  function bindInteractiveElements() {
    document.querySelectorAll(INTERACTIVE_SELECTORS).forEach((el) => {
      el.addEventListener('mouseenter', onElementEnter);
      el.addEventListener('mouseleave', onElementLeave);
    });
  }

  // Click state
  function onMouseDown() {
    ring.classList.add('click');
    dot.classList.add('click');
  }

  function onMouseUp() {
    ring.classList.remove('click');
    dot.classList.remove('click');
  }

  // Mouse leave window
  function onMouseLeaveWindow(e) {
    if (e.relatedTarget === null || e.target === document.documentElement) {
      hideCursor();
    }
  }

  function onMouseEnterWindow() {
    showCursor();
  }

  // Attach events
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);
  document.documentElement.addEventListener('mouseenter', onMouseEnterWindow);

  // Initial bind
  bindInteractiveElements();

  // Re-bind on DOM changes (e.g., dynamic content)
  const observer = new MutationObserver(() => {
    bindInteractiveElements();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Start ring animation
  rafId = requestAnimationFrame(animateRing);

  // Hide default cursor via body class
  document.body.classList.add('custom-cursor-active');
}
