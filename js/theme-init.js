/* Apply saved theme before the page is painted. Dark is the portfolio's default. */
try { const t = localStorage.getItem('pk-theme'); if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; } catch {}
