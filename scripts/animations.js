(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fallback: IntersectionObserver reveal (always works).
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '50px 0px 50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Hard fallback: reveal everything after 2s — also clear any GSAP inline opacity
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => {
      el.style.opacity = '';
      el.style.transform = '';
      el.classList.add('in');
    });
  }, 2000);

  if (prefersReduced || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Section titles: slide + char reveal
  gsap.utils.toArray('.sec-title').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out'
    });
  });

  // About stack cards — stagger fly-in
  gsap.from('.stack-card', {
    scrollTrigger: { trigger: '.stack', start: 'top 80%' },
    y: 40, opacity: 0, scale: .92, rotateX: -20,
    stagger: .06, duration: .7, ease: 'power3.out'
  });

  // Portfolio cards — 3D fly-in (clearProps ensures no leftover inline styles)
  gsap.utils.toArray('.card').forEach((el, i) => {
    gsap.fromTo(el,
      { y: 60, opacity: 0, rotateY: 15 },
      {
        scrollTrigger: { trigger: el, start: 'top 92%' },
        y: 0, opacity: 1, rotateY: 0,
        delay: (i % 3) * 0.08, duration: .8, ease: 'power3.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  // Facts counter
  gsap.utils.toArray('.facts .n').forEach(el => {
    const raw = el.textContent.trim();
    const match = raw.match(/(\d+)(.*)/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      scrollTrigger: { trigger: el, start: 'top 85%' },
      duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; }
    });
  });

  // Hero parallax
  gsap.to('.hero-content', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    y: 120, opacity: .2
  });
})();
