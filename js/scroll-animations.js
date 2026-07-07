/**
 * Scroll Animations — GSAP + ScrollTrigger powered entrance animations
 * Gracefully degrades when prefers-reduced-motion is enabled.
 */

export function initScrollAnimations() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If reduced motion, make everything visible and bail
  if (reducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Register ScrollTrigger plugin (loaded via CDN as global)
  gsap.registerPlugin(ScrollTrigger);

  // ------- General reveal elements -------
  gsap.utils.toArray('.reveal').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => el.classList.add('active'),
      once: true,
    });
  });

  // ------- Section titles — clip-path reveal -------
  gsap.utils.toArray('.section-title').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // ------- Skill cards — stagger from bottom -------
  const skillCards = gsap.utils.toArray('.skill-card');
  if (skillCards.length) {
    gsap.fromTo(skillCards, {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skillCards[0]?.parentElement || skillCards[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // ------- Timeline items — stagger from bottom -------
  const timelineItems = gsap.utils.toArray('.timeline-item');
  if (timelineItems.length) {
    gsap.fromTo(timelineItems, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: timelineItems[0]?.parentElement || timelineItems[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // ------- Project cards — stagger from bottom -------
  const projectCards = gsap.utils.toArray('.project-card');
  if (projectCards.length) {
    gsap.fromTo(projectCards, {
      opacity: 0,
      y: 60,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: projectCards[0]?.parentElement || projectCards[0],
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // ------- About image wrapper — scale entrance -------
  const aboutImage = document.querySelector('.about-avatar-wrapper');
  if (aboutImage) {
    gsap.fromTo(aboutImage, {
      scale: 0.8,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: aboutImage,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // ------- Contact section — slide in from sides -------
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    gsap.fromTo(contactInfo, {
      x: -50,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: contactInfo,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    gsap.fromTo(contactForm, {
      x: 50,
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: contactForm,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  // ------- Aurora parallax on scroll -------
  const auroraBlobs = gsap.utils.toArray('.aurora-blob');
  if (auroraBlobs.length) {
    gsap.to(auroraBlobs, {
      y: '+=100',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
  }
}
