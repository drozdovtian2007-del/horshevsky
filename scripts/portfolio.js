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

  // ---- Modal data
  const data = {
    bot1: { t: 'Бот магазина', d: 'Telegram-бот с каталогом товаров, корзиной, оплатой и уведомлениями админу. Гибкая админ-панель для добавления категорий и товаров без переписывания кода.', tags: ['Python', 'Aiogram', 'SQLite', 'Payments'] },
    bot2: { t: 'Бот-помощник', d: 'Принимает заявки клиентов, отвечает на частые вопросы и передаёт сложные кейсы менеджеру. Работает 24/7, не теряет сообщений.', tags: ['Python', 'Aiogram', 'FSM'] },
    bot3: { t: 'Бот-рассылка', d: 'Сегментированные рассылки по спискам подписчиков с отложенной отправкой и аналитикой открытий. Поддержка фото, кнопок и опросов.', tags: ['Python', 'PostgreSQL', 'Celery'] },
    site1: { t: 'Лендинг студии', d: 'Продающая одностраничка с анимациями при скролле, форма отправляет заявку напрямую в Telegram. Lighthouse 95+.', tags: ['HTML', 'CSS', 'GSAP', 'Telegram API'] },
    site2: { t: 'Корпоративный сайт', d: 'Многостраничник с собственной лёгкой CMS для контента и блогом на Markdown. Адаптив, SEO-оптимизация.', tags: ['Next.js', 'MDX', 'Tailwind'] },
    site3: { t: 'Сайт-визитка', d: 'Персональный бренд: минимализм, быстрая загрузка, адаптив под любые экраны. Размещение на GitHub Pages.', tags: ['HTML', 'CSS', 'JS'] },
    mini1: { t: 'Mini App — Каталог', d: 'Интернет-магазин внутри Telegram: карточки товаров, корзина, оплата через Telegram Payments. Данные синхронизируются с ботом.', tags: ['TWA', 'React', 'FastAPI'] },
    mini2: { t: 'Mini App — Бронирование', d: 'Запись на услуги: выбор мастера, даты и времени, подтверждение в боте. Интеграция с Google Calendar.', tags: ['TWA', 'Vue', 'FastAPI'] },
    mini3: { t: 'Mini App — Игра', d: 'Казуальная игра с рейтингом, сохранением прогресса и монетизацией через Telegram Stars.', tags: ['TWA', 'Phaser', 'Node.js'] }
  };

  const modal = document.getElementById('modal');
  const mT = modal.querySelector('.modal-title');
  const mD = modal.querySelector('.modal-text');
  const mTags = modal.querySelector('.modal-tags');

  const openModal = (id) => {
    const item = data[id]; if (!item) return;
    mT.textContent = item.t;
    mD.textContent = item.d;
    mTags.innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
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
