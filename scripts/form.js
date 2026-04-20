(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const btn = form.querySelector('.btn-submit');
  const cfg = window.CONFIG || {};
  const toast = (msg, type) => window.showToast ? window.showToast(msg, type) : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = form.message.value.trim();
    if (!message) {
      toast('Введите сообщение перед отправкой.', 'err');
      return;
    }

    const ownerUsername = cfg.TELEGRAM_USERNAME || '';
    if (!ownerUsername) {
      toast('Telegram username владельца не задан.', 'err');
      return;
    }

    btn.classList.add('loading');
    btn.disabled = true;
    toast('Открываю Telegram…', 'ok');

    const plainText =
      `Привет! Пишу с сайта Horshevsky.\n\n` +
      `${message}`;

    // Страховочное уведомление в бота (если клиент закроет вкладку ТГ)
    if (cfg.TELEGRAM_BOT_TOKEN && cfg.TELEGRAM_CHAT_ID) {
      const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
      const botText =
        `🟦 *Заявка с сайта (клиент ещё не нажал Send)*\n\n` +
        `${escapeMd(message)}\n\n` +
        `🕐 ${time}`;
      try {
        await fetch(`https://api.telegram.org/bot${cfg.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: cfg.TELEGRAM_CHAT_ID,
            text: botText,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
          })
        });
      } catch (_) { /* не критично */ }
    }

    const redirectUrl = `https://t.me/${ownerUsername}?text=${encodeURIComponent(plainText)}`;

    toast('Готово! Переходим в Telegram — остаётся нажать «Отправить».', 'ok');
    form.reset();

    setTimeout(() => {
      window.location.href = redirectUrl;
      btn.classList.remove('loading');
      btn.disabled = false;
    }, 400);
  });

  function escapeMd(s) {
    return String(s).replace(/[_*`\[\]()]/g, '\\$&');
  }
})();
