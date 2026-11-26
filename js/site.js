'use strict';
(() => {
  document.documentElement.classList.add('js');
  const config = window.PORTFOLIO_CONFIG || {};
  const root = document.documentElement;
  const safeHttps = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u : null; } catch { return null; } };
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const theme = document.querySelector('.theme-toggle');
  const setTheme = (value, save = false) => {
    root.dataset.theme = value;
    if (theme) { theme.querySelector('.theme-symbol').textContent = value === 'dark' ? '☼' : '☾'; theme.querySelector('.theme-label').textContent = value === 'dark' ? 'Light' : 'Dark'; theme.setAttribute('aria-label', `Switch to ${value === 'dark' ? 'light' : 'dark'} theme`); theme.title = theme.getAttribute('aria-label'); }
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', value === 'dark' ? '#101512' : '#f5f6ef');
    if (save) try { localStorage.setItem('pk-theme', value); } catch {}
  };
  let stored; try { stored = localStorage.getItem('pk-theme'); } catch {}
  setTheme(stored === 'light' ? 'light' : 'dark');
  theme?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
  const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav-links');
  const setMenu = (open, returnFocus = false) => {
    nav?.classList.toggle('open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (toggle) toggle.querySelector('.menu-symbol').textContent = open ? '×' : '☰';
    if (returnFocus) toggle?.focus();
  };
  toggle?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      setMenu(false);
      const href = a.getAttribute('href');
      if (href?.startsWith('#')) {
        const target = document.getElementById(href.slice(1));
        if (target) { target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); }
      }
    }
  }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('open')) setMenu(false,true); });
  document.addEventListener('pointerdown', e => { if (nav?.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });
  document.querySelector('.site-header')?.addEventListener('focusout', e => { if (e.relatedTarget && !document.querySelector('.site-header').contains(e.relatedTarget)) setMenu(false); });
  matchMedia('(min-width: 1101px)').addEventListener('change', () => setMenu(false));
  // On the home page, indicate the current section without changing the URL.
  if (document.getElementById('work')) {
    const sections = ['home','work','skills','credentials','contact'].map(id => document.getElementById(id));
    const sectionLinks = [...nav.querySelectorAll('a')];
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY + Math.min(180, innerHeight * .3);
      let active = 'home';
      for (const section of sections) if (section && section.getBoundingClientRect().top + scrollY <= y) active = section.id;
      if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 5) active = 'contact';
      sectionLinks.forEach(a => { const href = a.getAttribute('href'); if (href === '#' + active || (active === 'home' && href === 'index.html')) a.setAttribute('aria-current', active === 'home' ? 'page' : 'location'); else a.removeAttribute('aria-current'); });
    };
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, {passive:true});
    window.addEventListener('resize', update); window.addEventListener('load',update); update();
  }
  // Copy email with an explicit, accessible result and manual fallback.
  document.querySelector('.copy-email')?.addEventListener('click', async e => {
    const feedback = document.querySelector('.copy-feedback');
    try { await navigator.clipboard.writeText(e.currentTarget.dataset.email); feedback.textContent = 'Email address copied.'; }
    catch { feedback.textContent = 'Copy manually: ' + config.email; }
  });
  // Image previews retain normal full-size links if JavaScript/dialogs are unavailable.
  const imageDialog = document.getElementById('image-dialog');
  if (imageDialog && typeof imageDialog.showModal === 'function') {
    let imageOpener;
    document.querySelectorAll('[data-preview]').forEach(link => link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault(); imageOpener = link;
      const img = imageDialog.querySelector('#preview-image');
      img.src = link.href; img.alt = link.querySelector('img').alt;
      imageDialog.querySelector('#image-title').textContent = link.closest('figure').querySelector('figcaption').textContent;
      imageDialog.querySelector('#preview-original').href = link.href;
      imageDialog.showModal(); imageDialog.querySelector('.image-close').focus();
    }));
    imageDialog.querySelector('.image-close').addEventListener('click', () => imageDialog.close());
    imageDialog.addEventListener('click', e => { if (e.target === imageDialog) { const r = imageDialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) imageDialog.close(); } });
    imageDialog.addEventListener('close', () => imageOpener?.focus());
  }
  // Optional credentials: only replace artwork after the local image loads successfully.
  for (const [key, data] of Object.entries(config.certificates || {})) {
    const target = [...document.querySelectorAll('[data-cert]')].find(x => x.dataset.cert === key);
    const linkSlot = [...document.querySelectorAll('[data-cert-link]')].find(x => x.dataset.certLink === key);
    if (!target || !linkSlot || !data) continue;
    const verify = safeHttps(data.verifyUrl);
    const addLink = (href, label) => { const link = document.createElement('a'); link.className = 'text-link'; link.href = href; link.textContent = label + ' ↗'; linkSlot.replaceWith(link); };
    if (verify) addLink(verify.href, 'Verify credential');
    if (typeof data.image === 'string' && /^images\/[\w./-]+\.(png|jpe?g|webp)$/i.test(data.image) && !data.image.includes('..')) {
      const img = new Image(); img.alt = key === 'ibm' ? 'IBM Data Analyst professional certificate' : 'Microsoft Power BI Data Analyst professional certificate';
      img.onload = () => { const a = document.createElement('a'); a.href = data.image; a.append(img); target.replaceChildren(a); target.classList.remove('cert-art'); if (!verify) addLink(data.image, 'View certificate'); };
      img.src = data.image;
    }
  }
  const dialog = document.getElementById('booking-dialog');
  const form = document.getElementById('booking-form');
  if (dialog && form) {
    const dateInput = document.getElementById('meeting-date');
    const timeInput = document.getElementById('meeting-time');
    const topicInput = document.getElementById('meeting-topic');
    const airtable = safeHttps(config.airtableFormUrl);
    const validAirtable = airtable && ['airtable.com', 'www.airtable.com'].includes(airtable.hostname) && (/^\/app[\w]+\/pag[\w]+\/form\/?$/.test(airtable.pathname) || /^\/shr[\w]+\/?$/.test(airtable.pathname));
    if (validAirtable) {
      document.getElementById('booking-description').textContent = 'Choose a preferred date and time, then complete and submit the Airtable request form. I’ll confirm availability personally.';
      document.getElementById('booking-submit').textContent = 'Continue to Airtable ↗';
    }
    const malaysiaNow = () => new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
    let opener;
    document.querySelectorAll('.booking-trigger').forEach(button => button.addEventListener('click', e => { if (typeof dialog.showModal !== 'function' || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; e.preventDefault(); opener = button; dateInput.min = malaysiaNow().slice(0,10); dialog.showModal(); topicInput.focus(); }));
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => opener?.focus());
    const updateSummary = () => {
      timeInput.setCustomValidity('');
      const summary = document.getElementById('request-summary-text');
      if (!dateInput.value || !timeInput.value) { summary.textContent = 'Choose a date and time to preview your request.'; return; }
      const formatted = new Intl.DateTimeFormat('en-GB', {dateStyle:'medium', timeStyle:'short', timeZone:'Asia/Kuala_Lumpur'}).format(new Date(dateInput.value + 'T' + timeInput.value + ':00+08:00'));
      summary.textContent = `${topicInput.value} · ${formatted} MYT (UTC+8)`;
    };
    const clear = updateSummary;
    topicInput.addEventListener('change',updateSummary);
    dateInput.addEventListener('input', clear); timeInput.addEventListener('input', clear);
    form.addEventListener('submit', e => {
      e.preventDefault();
      const date = dateInput.value, time = timeInput.value, topic = topicInput.value;
      if (`${date}T${time}` <= malaysiaNow().slice(0,16)) { timeInput.setCustomValidity('Choose a future date and time in Malaysia (UTC+8).'); timeInput.reportValidity(); return; }
      if (validAirtable) {
        const url = new URL(airtable.href); const fields = config.airtableFields || {};
        for (const [key,value] of [['topic',topic],['date',date],['time',time]]) if (fields[key]) url.searchParams.set('prefill_' + fields[key],value);
        location.href = url.href;
      } else {
        const body = `Hi Pyae,\n\nI'd like to request a call.\nPurpose: ${topic}\nPreferred date: ${date}\nPreferred time: ${time} (Malaysia, UTC+8)\n\nPlease let me know if this works for you.\n\nName:\nOrganization (optional):\n`;
        location.href = `mailto:${config.email || 'pyaekhantkyaw.it@gmail.com'}?subject=${encodeURIComponent('Meeting request — '+topic)}&body=${encodeURIComponent(body)}`;
      }
      dialog.close();
    });
  }
  // No analytics requests on file://, localhost or until a public beacon token is configured.
  const token = String(config.cloudflareBeaconToken || '').trim();
  if (/^[a-zA-Z0-9_-]{16,128}$/.test(token) && location.protocol === 'https:' && !['localhost','127.0.0.1'].includes(location.hostname)) {
    const script = document.createElement('script'); script.defer = true; script.src = 'https://static.cloudflareinsights.com/beacon.min.js'; script.setAttribute('data-cf-beacon', JSON.stringify({ token, spa: false })); document.head.append(script);
  }
})();
