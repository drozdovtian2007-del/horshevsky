(() => {
  // ---- Block selection / drag / context menu (PNG-like feel), allow inputs
  const isEditable = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  document.addEventListener('selectstart', (e) => { if (!isEditable(e.target)) e.preventDefault(); });
  document.addEventListener('dragstart', (e) => e.preventDefault());
  document.addEventListener('contextmenu', (e) => { if (!isEditable(e.target)) e.preventDefault(); });
  document.addEventListener('copy', (e) => { if (!isEditable(e.target)) e.preventDefault(); });

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

  // ---- Back to top
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- Char counter
  const msgArea = document.getElementById('f-msg');
  const charCounter = document.getElementById('char-counter');
  if (msgArea && charCounter) {
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      charCounter.textContent = `${len} / 500`;
      charCounter.className = 'char-counter' + (len > 450 ? ' warn' : '') + (len >= 500 ? ' over' : '');
    });
  }

  // ---- Toast helper (global)
  window.showToast = (msg, type = 'ok', duration = 3500) => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = msg;
    toast.className = `toast ${type} show`;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), duration);
  };

  // ---- Fake visitor counter
  const vcEl = document.getElementById('visitor-count');
  if (vcEl) {
    const base = 2 + Math.floor(Math.random() * 4);
    vcEl.textContent = base;
    setInterval(() => {
      const delta = Math.random() < .5 ? 1 : -1;
      const cur = parseInt(vcEl.textContent);
      const next = Math.max(1, Math.min(8, cur + delta));
      if (next !== cur) {
        vcEl.style.opacity = '0';
        setTimeout(() => { vcEl.textContent = next; vcEl.style.opacity = '1'; }, 200);
      }
    }, 7000 + Math.random() * 5000);
  }

  // ---- Cursor trail
  const trailCanvas = document.getElementById('cursor-trail');
  if (trailCanvas && !window.matchMedia('(hover: none)').matches) {
    const ctx = trailCanvas.getContext('2d');
    const resize = () => { trailCanvas.width = window.innerWidth; trailCanvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = [];
    let mx = -100, my = -100;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const createParticle = () => {
      particles.push({ x: mx, y: my, r: 2.5 + Math.random() * 2, alpha: .7, vx: (Math.random()-.5)*.8, vy: (Math.random()-.5)*.8 });
    };
    let frame = 0;
    const loop = () => {
      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      if (frame++ % 2 === 0) createParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.alpha -= .025; p.r *= .97;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(65,105,225,${p.alpha.toFixed(2)})`;
        ctx.fill();
      }
      requestAnimationFrame(loop);
    };
    loop();
  }

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
