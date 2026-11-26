# Pyae Khant Kyaw — Portfolio Website

Personal data analytics and business intelligence portfolio built with semantic HTML, CSS, and vanilla JavaScript, hosted on GitHub Pages.

- **Live Site:** [pyaekhantkyaw.github.io/portfolio](https://pyaekhantkyaw.github.io/portfolio/)
- **Author:** Pyae Khant Kyaw (Data Science Student, Swinburne University of Technology)

## Pages

- **`index.html`** — Landing page featuring the analytics lifecycle diagram, featured projects, technical toolkit (SQL, Python, Power BI), credentials, career direction, and contact section with an email/meeting request modal.
- **`projects.html`** — Detailed technical case studies with metrics, methodology, and interactive dashboard previews:
  1. **Olist E-commerce Sales & Logistics:** End-to-end Power BI star schema model, DAX measures, Row-Level Security (RLS), and Power BI Service governance.
  2. **SaleOps Automotive Sales Analytics:** Full workflow combining SQLite queries, Python exploratory analysis (`pandas`, `Plotly`), and Power BI executive reporting.
- **`about.html`** — Academic timeline, current analytics/BI focus, and long-term direction toward data science and engineering.
- **`privacy.html`** — Static site privacy notice covering Cloudflare Web Analytics, contact options, and local theme storage.

## Configuration (`js/config.js`)

Public runtime settings are centralized in `window.PORTFOLIO_CONFIG`:

- **Contact & Booking:** Email address and optional Airtable form integration for meeting requests.
- **Analytics:** Privacy-first visitor tracking via Cloudflare Web Analytics (`cloudflareBeaconToken`).
- **Credentials:** Configurable paths for certificate images and verification links.

## Local Development

Open `index.html` directly in a browser or serve the root folder with any static local server (e.g., `python3 -m http.server`).
