/**
 * Main Entry Point — Orchestrates all portfolio modules
 * Initializes page loader, particles, aurora, cursor, navigation,
 * scroll animations, timeline, bento effects, counters, form handling,
 * hero typewriter, and Lucide icons.
 */

import { ParticleCanvas } from './particles.js';
import { initAurora } from './aurora.js';
import { initCursor } from './cursor.js';
import { initNav } from './nav.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initTimeline } from './timeline.js';
import { initBento } from './bento.js';
import { initCounters } from './counters.js';
import { initForm } from './form.js';

// ------- Page Loader -------
function createPageLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.id = 'page-loader';

  Object.assign(loader.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '99999',
    transition: 'opacity 0.6s ease, visibility 0.6s ease',
  });

  // Loader spinner / branding
  const spinner = document.createElement('div');
  spinner.className = 'loader-content';
  spinner.innerHTML = `
    <div style="
      width: 48px;
      height: 48px;
      border: 3px solid rgba(245, 158, 11, 0.15);
      border-top-color: #f59e0b;
      border-radius: 50%;
      animation: loaderSpin 0.8s linear infinite;
    "></div>
  `;
  loader.appendChild(spinner);

  // Inject spin animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes loaderSpin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  document.body.prepend(loader);

  // Fade out after 800ms
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    // Remove from DOM after transition
    setTimeout(() => {
      loader.remove();
    }, 600);
  }, 800);
}

// ------- Hero Typewriter -------
function initHeroTypewriter() {
  // Disabled typewriter effect due to conflicts with gradient text clip
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    heroName.style.visibility = 'visible';
  }
}

// ------- Set Footer Year -------
function setFooterYear() {
  const yearEl = document.querySelector('#footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ------- Initialize Lucide Icons -------
function initLucideIcons() {
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (err) {
    console.warn('Lucide icons could not be initialized:', err);
  }
}

// ------- Bootstrap Everything -------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Page loader
  createPageLoader();

  // 2. Particle canvas
  const particles = new ParticleCanvas('hero-canvas');
  particles.init();

  // 3. Aurora blobs
  initAurora();

  // 4. Custom cursor
  initCursor();

  // 5. Navigation
  initNav();

  // 6. Scroll-dependent animations (slight delay for DOM readiness)
  setTimeout(() => {
    initScrollAnimations();
    initTimeline();
  }, 100);

  // 7. Bento tilt effects
  initBento();

  // 8. Stat counters
  initCounters();

  // 9. Form handling
  initForm();

  // 10. Hero typewriter
  initHeroTypewriter();

  // 11. Lucide icons
  initLucideIcons();

  // 12. Footer year
  setFooterYear();
});
