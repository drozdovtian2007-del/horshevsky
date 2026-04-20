(() => {
  // ---- Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Typewriter: hero title "Horshevsky"
  const titleEl = document.querySelector('.hero-title');
  if (titleEl) {
    const full = 'Horshevsky';
    let i = 0;
    const typeTitle = () => {
      titleEl.textContent = full.slice(0, i);
      titleEl.setAttribute('data-text', full.slice(0, i));
      if (i <= full.length) { i++; setTimeout(typeTitle, 95); }
    };
    setTimeout(typeTitle, 300);
  }

  // ---- Typewriter: hero subtitle
  const typer = document.querySelector('.typewriter');
  if (typer) {
    const joined = 'Telegram боты  ·  Сайты и лендинги  ·  Telegram Mini Apps';
    let i = 0;
    const type = () => {
      typer.textContent = joined.slice(0, i);
      if (i < joined.length) { i++; setTimeout(type, 40); }
    };
    setTimeout(type, 1600);
  }

  // ---- Scroll progress bar
  const bar = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (bar) bar.style.width = scrolled + '%';
  }, { passive: true });

  // ---- Side nav active section
  const sections = document.querySelectorAll('section.section');
  const navLinks = document.querySelectorAll('.side-nav a');
  const activeByIntersection = () => {
    let cur = sections[0];
    const mid = window.innerHeight / 2;
    sections.forEach(s => {
      const r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) cur = s;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur.id));
  };
  window.addEventListener('scroll', activeByIntersection, { passive: true });
  activeByIntersection();

  // ---- Smooth scroll for anchors (respect scroll-behavior but add feel)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---- Stack card mouse-parallax glow
  document.querySelectorAll('.stack-card').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // ---- Duplicate reviews row for seamless marquee
  const row = document.querySelector('.reviews-row');
  if (row) {
    const clone = row.cloneNode(true);
    clone.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    [...clone.children].forEach(child => row.appendChild(child));
  }

  // ---- 3D tilt on portfolio cards
  document.querySelectorAll('.card.tilt').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
