(() => {
  const translations = {
    ru: {
      hero_cta:        'Посмотреть работы',
      hero_contact:    'Связаться',
      about_title:     'Обо мне',
      about_lead:      'Привет, я <b>Horshevsky</b> — разработчик, который создаёт Telegram-ботов, сайты, лендинги и Telegram Mini Apps под ключ.',
      about_body:      'Работаю быстро, держу связь с клиентом и довожу проект до результата. Пишу чистый код, уважаю дедлайны и не оставляю незаконченных задач.',
      fact_projects:   'проектов',
      fact_years:      'года в разработке',
      fact_available:  'на связи',
      portfolio_title: 'Портфолио',
      filter_all:      'Все',
      filter_bot:      'Telegram Боты',
      filter_site:     'Сайты и лендинги',
      filter_mini:     'Telegram Mini Apps',
      reviews_title:   'Отзывы',
      contact_title:   'Связь',
      contact_sub:     'Опишите задачу — отвечу быстро.',
      contact_label:   'Сообщение',
      contact_send:    'Отправить сообщение',
      modal_cta:       'Заказать похожий проект →',
    },
    en: {
      hero_cta:        'View my work',
      hero_contact:    'Contact me',
      about_title:     'About me',
      about_lead:      'Hi, I\'m <b>Horshevsky</b> — a developer who builds Telegram bots, websites, landing pages and Telegram Mini Apps end-to-end.',
      about_body:      'I work fast, keep the client in the loop and always deliver. Clean code, met deadlines, no unfinished projects.',
      fact_projects:   'projects',
      fact_years:      'years in dev',
      fact_available:  'available',
      portfolio_title: 'Portfolio',
      filter_all:      'All',
      filter_bot:      'Telegram Bots',
      filter_site:     'Websites & Landings',
      filter_mini:     'Telegram Mini Apps',
      reviews_title:   'Reviews',
      contact_title:   'Contact',
      contact_sub:     'Describe your project — I\'ll reply fast.',
      contact_label:   'Message',
      contact_send:    'Send message',
      modal_cta:       'Order a similar project →',
    }
  };

  let current = localStorage.getItem('lang') || 'ru';

  const apply = (lang) => {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Side-nav tooltips — store RU label once, then swap
    document.querySelectorAll('.side-nav a[data-label]').forEach(a => {
      if (!a.dataset.labelRu) a.dataset.labelRu = a.dataset.label;
      a.dataset.label = lang === 'en' ? (a.dataset.labelEn || a.dataset.labelRu) : a.dataset.labelRu;
    });

    // Toggle buttons
    document.querySelectorAll('#lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
    current = lang;
  };

  document.getElementById('lang-toggle').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn && btn.dataset.lang !== current) apply(btn.dataset.lang);
  });

  // Apply saved language on load
  if (current !== 'ru') apply(current);
})();
