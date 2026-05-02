(() => {
  // ---- Filters
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.card');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const match = f === 'all' || c.dataset.cat === f;
        c.classList.toggle('hide', !match);
      });
    });
  });

  // ---- Project data with previews and related reviews
  const data = {
    bot1: {
      t: 'Бот магазина',
      d: 'Telegram-бот с каталогом товаров, корзиной, оплатой через ЮKassa и уведомлениями в чат администратора. Гибкая панель: категории, товары, скидки — всё без кода.',
      tags: ['Python', 'Aiogram', 'SQLite', 'ЮKassa'],
      img: 'images/projects/bot1.svg',
      review: { text: '«Сделал бота под мой магазин за 3 дня — каталог, корзина, оплата. Клиенты покупают прямо в Telegram, без лишних шагов.»', author: 'Алексей М. · Владелец магазина' }
    },
    bot2: {
      t: 'Бот-помощник',
      d: 'Принимает заявки клиентов, отвечает на частые вопросы через FSM-меню и передаёт сложные кейсы менеджеру. Работает 24/7, не теряет ни одного сообщения.',
      tags: ['Python', 'Aiogram', 'FSM', 'PostgreSQL'],
      img: 'images/projects/bot2.svg',
      review: { text: '«Бот-помощник снял с меня кучу рутины. Клиенты сами разбираются с частыми вопросами, а я получаю только реальные заявки.»', author: 'Сергей Т. · Автосервис' }
    },
    bot3: {
      t: 'Бот-рассылка',
      d: 'Сегментированные рассылки по спискам подписчиков с отложенной отправкой и аналитикой доставки. Поддержка фото, кнопок, опросов и A/B-тестов.',
      tags: ['Python', 'PostgreSQL', 'Celery', 'Redis'],
      img: 'images/projects/bot3.svg',
      review: { text: '«Сделал бота для кафе — рассылки акций, сбор отзывов. Гости довольны, конверсия в повторные визиты выросла.»', author: 'Никита Ф. · Ресторатор' }
    },
    site1: {
      t: 'Лендинг студии',
      d: 'Продающая одностраничка с GSAP-анимациями при скролле. Форма отправляет заявку напрямую в Telegram за секунду. Lighthouse 95+, адаптив для всех устройств.',
      tags: ['HTML', 'CSS', 'GSAP', 'Telegram API'],
      img: 'images/projects/site1.svg',
      review: { text: '«Заказывал лендинг под рекламу — конверсия оказалась выше прошлого сайта в два раза. Всё чётко, без воды.»', author: 'Виктор С. · Арбитражник' }
    },
    site2: {
      t: 'Корпоративный сайт',
      d: 'Многостраничник с лёгкой собственной CMS для редактирования контента и блогом на Markdown. SEO-оптимизация, адаптив, скорость загрузки < 1 с.',
      tags: ['Next.js', 'MDX', 'Tailwind', 'Vercel'],
      img: 'images/projects/site2.svg',
      review: { text: '«Запустили сайт за неделю — всё по ТЗ и даже чуть лучше. Редактируем контент сами, без разработчиков.»', author: 'Ольга Р. · Маркетолог' }
    },
    site3: {
      t: 'Va1fy — Premium Caviar',
      d: 'Сайт бренда премиальной икры: подводная сцена с анимированными пузырьками, плавающая рыбка-маскот, индикатор «глубины» при скролле, фоновая музыка и каталог банок с ценами. Чёткий one-page с навигацией: Главная · Обо мне · Икра · Хайлайты. Деплой на Railway. Ссылка: https://va1fy-site-production-1a9c.up.railway.app/',
      tags: ['HTML', 'CSS', 'JS', 'Three.js', 'GSAP', 'Railway'],
      img: 'images/projects/va1fy.svg',
      imgs: [
        'images/projects/va1fy.svg',
        'images/projects/va1fy-2.jpg',
        'images/projects/va1fy-3.jpg',
        'images/projects/va1fy-4.jpg'
      ],
      review: { text: '«Сайт получился именно таким, как я хотел — атмосфера моря, пузыри, рыбка. Бренду теперь не стыдно показать клиентам.»', author: 'Va1fy · Premium Caviar' }
    },
    site4: {
      t: 'AdsRadar',
      d: 'Веб-сервис для анализа YouTube-видео: вставляешь ссылку — и получаешь список всех рекламных интеграций с названием бренда, доменом и описанием. Авторизация пользователей, лимит запросов в день, чистый фиолетовый UI. Деплой на Railway. Ссылка: https://youtube-adradar-production.up.railway.app/',
      tags: ['HTML', 'CSS', 'JS', 'Python', 'Railway'],
      img: 'images/projects/adsradar-1.jpg',
      imgs: [
        'images/projects/adsradar-1.jpg',
        'images/projects/adsradar-2.jpg'
      ],
      link: 'https://youtube-adradar-production.up.railway.app/',
      review: { text: '«Нашёл всех рекламодателей конкурентов за пару минут — просто вставил ссылку и получил полный список. Очень удобно.»', author: 'Клиент · AdsRadar' }
    },
    mini1: {
      t: 'Mini App — Каталог',
      d: 'Интернет-магазин внутри Telegram: карточки товаров с фото, корзина, оплата через Telegram Payments. Данные синхронизируются с ботом в реальном времени.',
      tags: ['React', 'TWA', 'FastAPI', 'Telegram Payments'],
      img: 'images/projects/mini1.svg',
      review: { text: '«Mini App получилось лучше, чем я представляла. Клиенты делают заказы не выходя из Telegram — заявок стало вдвое больше.»', author: 'Екатерина В. · Салон красоты' }
    },
    mini2: {
      t: 'Mini App — Бронирование',
      d: 'Запись на услуги: выбор мастера, даты и удобного времени, подтверждение в боте. Интеграция с Google Calendar, напоминания за час до визита.',
      tags: ['Vue', 'TWA', 'FastAPI', 'Google Calendar'],
      img: 'images/projects/mini2.svg',
      review: { text: '«Запустили Mini App для записи в студию — клиенты сами выбирают время, я только подтверждаю. Удобно и нам, и им.»', author: 'Анна Л. · Йога-студия' }
    },
    mini3: {
      t: 'Mini App — Игра',
      d: 'Казуальная игра с рейтингом, сохранением прогресса в Telegram Cloud Storage и монетизацией через Telegram Stars. Таблица лидеров обновляется в реальном времени.',
      tags: ['Phaser', 'TWA', 'Node.js', 'Telegram Stars'],
      img: 'images/projects/mini3.svg',
      review: { text: '«Сделали игру с рейтингом и монетизацией — запустили за 2 недели. Пользователи сами приглашают друзей через шеринг.»', author: 'Руслан Б. · Онлайн-школа' }
    }
  };

  const modal    = document.getElementById('modal');
  const mPreview = modal.querySelector('.modal-preview');
  const mT       = modal.querySelector('.modal-title');
  const mD       = modal.querySelector('.modal-text');
  const mTags    = modal.querySelector('.modal-tags');
  const mReview  = modal.querySelector('.modal-review');
  const mLinkBtn = modal.querySelector('.modal-link');
  const mGallery = modal.querySelector('.modal-gallery');
  const mPrev    = modal.querySelector('.gal-prev');
  const mNext    = modal.querySelector('.gal-next');
  const mDots    = modal.querySelector('.gal-dots');

  let gallery = [];
  let gIdx = 0;
  const showSlide = (i) => {
    if (!gallery.length) return;
    gIdx = (i + gallery.length) % gallery.length;
    mPreview.style.backgroundImage = `url(${gallery[gIdx]})`;
    mDots.querySelectorAll('button').forEach((d, k) => d.classList.toggle('active', k === gIdx));
  };

  const openModal = (id) => {
    const item = data[id]; if (!item) return;
    gallery = (Array.isArray(item.imgs) && item.imgs.length) ? item.imgs.slice() : [item.img];
    gIdx = 0;
    const multi = gallery.length > 1;
    mGallery.classList.toggle('has-multi', multi);
    mDots.innerHTML = multi
      ? gallery.map((_, k) => `<button type="button" data-i="${k}" aria-label="Слайд ${k+1}"></button>`).join('')
      : '';
    showSlide(0);
    mT.textContent = item.t;
    mD.textContent = item.d;
    mTags.innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
    mReview.innerHTML = `${item.review.text}<strong>${item.review.author}</strong>`;
    if (item.link) { mLinkBtn.href = item.link; mLinkBtn.style.display = ''; }
    else { mLinkBtn.style.display = 'none'; }
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  mPrev.addEventListener('click', () => showSlide(gIdx - 1));
  mNext.addEventListener('click', () => showSlide(gIdx + 1));
  mDots.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-i]'); if (b) showSlide(+b.dataset.i);
  });
  document.addEventListener('keydown', (e) => {
    if (modal.getAttribute('aria-hidden') === 'false' && gallery.length > 1) {
      if (e.key === 'ArrowLeft')  showSlide(gIdx - 1);
      if (e.key === 'ArrowRight') showSlide(gIdx + 1);
    }
  });
  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.more').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.id)));
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
