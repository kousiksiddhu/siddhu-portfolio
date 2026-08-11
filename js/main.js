/**
 * Portfolio 2026 — main entry.
 * Nav + scrollspy, reveals, counters, hero typer, IST clock,
 * card spotlight, timeline toggle, contact form, copy email,
 * plus the hero canvas, AI twin chat, and command palette modules.
 */
import { initHeroCanvas } from './canvas.js';
import { initChat } from './chat.js';
import { initPalette } from './palette.js';

/* ── Nav: scrolled state + scrollspy + mobile menu ── */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.nav-link');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Scrollspy
  const sections = [...document.querySelectorAll('section[id]')];
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle('is-active', l.dataset.section === entry.target.id)
          );
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  // Mobile menu
  const toggleMenu = (force) => {
    const isOpen = force ?? !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };
  burger?.addEventListener('click', () => toggleMenu());
  menu?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => toggleMenu(false))
  );
}

/* ── Scroll progress bar ── */
function initProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Reveal on scroll ── */
function initReveals() {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => io.observe(el));
}

/* ── Animated counters ── */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (reduced) {
          el.textContent = target;
          continue;
        }
        const start = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = Math.round(target * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

/* ── Hero typewriter ── */
function initTyper() {
  const el = document.getElementById('hero-typer');
  if (!el) return;
  const phrases = [
    'building teams that ship',
    'operationalizing AI across the SDLC',
    'architecting GLI-compliant platforms',
    'mentoring engineers into owners',
    'sustaining 90%+ client CSAT',
  ];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = phrases[0];
    return;
  }
  let pi = 0;
  let ci = phrases[0].length;
  let deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (deleting) {
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    } else {
      ci++;
      if (ci === phrase.length) {
        deleting = true;
        el.textContent = phrase;
        setTimeout(tick, 2600);
        return;
      }
    }
    el.textContent = phrases[deleting ? pi : pi].slice(0, ci);
    setTimeout(tick, deleting ? 28 : 55);
  }
  setTimeout(tick, 2400);
}

/* ── IST clock ── */
function initClock() {
  const els = [document.getElementById('ist-clock'), document.getElementById('mobile-clock')].filter(Boolean);
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const update = () => {
    const t = fmt.format(new Date());
    els.forEach((el) => {
      el.textContent = el.id === 'mobile-clock' ? `${t.slice(0, 5)} IST` : t;
    });
  };
  update();
  setInterval(update, 1000);
}

/* ── Card spotlight: track pointer per card ── */
function initSpotlight() {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest?.('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, { passive: true });
}

/* ── Timeline: show earlier roles ── */
function initTimeline() {
  const btn = document.getElementById('tl-more');
  const earlier = document.getElementById('tl-earlier');
  if (!btn || !earlier) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    earlier.hidden = expanded;
    btn.firstChild.textContent = expanded ? 'Show earlier roles ' : 'Hide earlier roles ';
  });
}

/* ── Copy email ── */
function initCopyEmail() {
  const btn = document.getElementById('copy-email');
  const state = document.getElementById('copy-state');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.email);
      state.textContent = 'copied ✓';
      state.style.color = 'var(--acc)';
      setTimeout(() => {
        state.textContent = 'copy';
        state.style.color = '';
      }, 2000);
    } catch {
      window.location.href = `mailto:${btn.dataset.email}`;
    }
  });
}

/* ── Contact form (Web3Forms) ── */
function initForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submit = document.getElementById('form-submit');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submit.disabled = true;
    status.classList.remove('is-error');
    status.textContent = 'sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = 'message sent — Siddhu will get back to you soon ✓';
        form.reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      status.classList.add('is-error');
      status.textContent = 'something went wrong — email kousiksiddhu@gmail.com instead';
    } finally {
      submit.disabled = false;
    }
  });
}

/* ── Footer year ── */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initProgress();
  initReveals();
  initCounters();
  initTyper();
  initClock();
  initSpotlight();
  initTimeline();
  initCopyEmail();
  initForm();
  initYear();
  initHeroCanvas();
  initChat();
  initPalette();
});
