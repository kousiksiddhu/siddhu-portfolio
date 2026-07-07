/**
 * Counters — Animated count-up for stat numbers
 * Uses IntersectionObserver + easeOutExpo easing.
 * Supports data-count and data-suffix attributes.
 */

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000; // ms
  const startTime = performance.now();

  if (isNaN(target)) return;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const currentValue = Math.round(easedProgress * target);

    el.textContent = currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

export function initCounters() {
  const counterElements = document.querySelectorAll('[data-count]');

  if (!counterElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }
  );

  counterElements.forEach((el) => {
    // Set initial state
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = '0' + suffix;
    observer.observe(el);
  });
}
