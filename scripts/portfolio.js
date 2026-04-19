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
      t: 'Сайт-визитка',
      d: 'Персональный бренд: минимализм, быстрая загрузка, адаптив под любые экраны. Three.js-фон, кастомный курсор, плавные анимации. Хостинг на GitHub Pages — бесплатно.',
      tags: ['HTML', 'CSS', 'Three.js', 'GSAP'],
      img: 'images/projects/site3.svg',
      review: { text: '«Переделал мой старый сайт под мобильные — теперь не стыдно делиться ссылкой. Профессионально и быстро.»', author: 'Юлия А. · Коуч' }
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

  const openModal = (id) => {
    const item = data[id]; if (!item) return;
    mPreview.style.backgroundImage = `url(${item.img})`;
    mT.textContent = item.t;
    mD.textContent = item.d;
    mTags.innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
    mReview.innerHTML = `${item.review.text}<strong>${item.review.author}</strong>`;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.more').forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.id)));
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
