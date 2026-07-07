/**
 * Timeline — Animated progress line + node activation on scroll
 * Requires GSAP + ScrollTrigger (global).
 */

export function initTimeline() {
  const experienceSection = document.querySelector('.experience');
  const timelineLine = document.querySelector('.timeline-line');
  const timelineNodes = document.querySelectorAll('.timeline-node');

  if (!experienceSection || !timelineLine) return;

  // Ensure ScrollTrigger is registered
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    return;
  }

  // ------- Animate timeline line scaleY from 0 to 1 -------
  gsap.fromTo(
    timelineLine,
    { scaleY: 0, transformOrigin: 'top center' },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: experienceSection,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 0.8,
      },
    }
  );

  // ------- Timeline nodes — activate when scrolled into view -------
  if (timelineNodes.length) {
    timelineNodes.forEach((node) => {
      const item = node.closest('.timeline-item');
      if (item) {
        ScrollTrigger.create({
          trigger: node,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: () => item.classList.add('active'),
          onLeaveBack: () => item.classList.remove('active'),
        });
      }
    });
  }
}
