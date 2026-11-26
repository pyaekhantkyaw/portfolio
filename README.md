# Pyae Khant Kyaw — Analytics Portfolio | V3 UX Edition

A responsive, static portfolio for GitHub Pages. No Node, build step, database or server-side secrets are required. Includes light/dark theme, mobile navigation, separate technical case studies and a meeting-request dialog.

## V3 — usability improvements

- Clear page and section navigation, current-section indicators, responsive menu with Escape dismissal, larger touch targets, descriptive project and résumé links.
- Readable typography, visible keyboard focus, reduced-motion support, and a persistent light/dark theme. Decorative hero diagram is hidden on small phones to prioritize project access.
- Enlargable SaleOps screenshots, direct GitHub links near the top of both case studies, copy-email control with manual fallback, and an inline meeting request summary. The booking link falls back to email without JavaScript.
- No new dependencies; analytics, Airtable and certificate configuration remain in `js/config.js`.

Validation: Chromium rendered the supplied HTML, CSS and scripts using an inline test harness (normal local navigation was blocked by the test environment). All four pages were checked at 320, 375, 768, 961, 1024, 1280 and 1440 px; no horizontal page overflow or JS errors were detected. Menu, theme, booking summary and image preview interactions were checked. This is not a full accessibility audit or a live GitHub Pages test; verify on real devices after deployment.

## 1. Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and open `http://localhost:8000`. The public site analytics are intentionally disabled locally.

## 2. Publish to GitHub Pages

1. Back up the current portfolio repository or create a backup branch. Keep its `.git` folder.
2. Extract this ZIP. Copy the **contents** of the extracted `portfolio-ux` folder into the root of your existing repository. Replace old `index.html`, `about.html` and `styles.css`. The old `about.css` is no longer used and can be deleted. Do not put the extracted folder itself inside the repo.
3. Review `images/resume.pdf` before publishing. It is the original résumé supplied with the source ZIP, unchanged; update it with your current projects, degree and credentials. The website does not claim you passed PL-300.
4. Commit and push using your existing Git workflow, or upload the files from GitHub's web UI. In repository Settings → Pages, choose Deploy from a branch, `main`, `/(root)` if that is your intended branch. The website uses relative paths, so it works under a repository URL such as `https://pyaekhantkyaw.github.io/portfolio/` or your actual Pages address. Use the URL shown by GitHub, not an assumed URL.
5. Open the live site and test on phone and desktop. Confirm your resume, project links, and contact details. If the older site is cached, try a hard reload.

## 3. Private visitor analytics (Cloudflare Web Analytics)

No visits are recorded until you set up the service. Use your own Cloudflare account; the dashboard is private to authorized users. A public website visitor cannot see the dashboard or its metrics through this portfolio.

1. Open https://dash.cloudflare.com/ and find Web Analytics. Add a site using the **live GitHub Pages hostname**, for example `pyaekhantkyaw.github.io` (not a URL path). Choose manual JavaScript installation for a site hosted outside Cloudflare.
2. Copy the public beacon token from the snippet shown by Cloudflare (the value of `token` inside `data-cf-beacon`). In `js/config.js`, set `cloudflareBeaconToken: 'YOUR_PUBLIC_BEACON_TOKEN'`. This is not your Cloudflare API token. Never commit account credentials.
3. Commit and redeploy. Open the published HTTPS website and check that the Cloudflare beacon is loaded. Check your Web Analytics dashboard after it has received traffic. See https://developers.cloudflare.com/web-analytics/get-started/ for the official instructions.
4. Filter page paths to this portfolio if you have multiple projects under the same `github.io` hostname. Use the dashboard to examine visits, page views, referrers, geography and device information where available. These are aggregate measurements; a blocked beacon, bots, attribution limits or browser settings may affect numbers. You cannot know exactly which recruiter visited, who did not visit, or whether a given hiring manager read the whole page. Do not treat visits as application outcomes.
5. No public visitor counter is shown. The website includes a privacy page. If you add another analytics service, update that page to match its actual data handling.

## 4. Connect Airtable for meeting requests

The request dialog already works without Airtable: it creates an email draft with the visitor's chosen topic and future date/time in Malaysia (UTC+8). It does not send an email automatically or reserve a time.

To collect requests in Airtable:

1. In your Airtable base, create a table named `Meeting requests`. Add `Name` (single line text), `Email` (email), `Organization` (optional), `Meeting purpose` (single select using the options in `index.html`, or single line text), `Preferred date` (date), `Preferred time (Malaysia UTC+8)` (single line text), `Status` (single select: Pending/Confirmed/Declined), and optionally `Notes`. For a calendar, use a date or date-time field and set up your calendar view/confirmed date-time field. Do not expose the private table or personal calendar.
2. Create a public Airtable form for the request fields. Make name and email required. Leave internal Status and confirmed date/time fields out of the public form. Copy the public form URL (the link for submitting a response). Modern form links resemble `https://airtable.com/app.../pag.../form`; legacy `https://airtable.com/shr...` links are also supported. Do not use a private edit link or API token.
3. In `js/config.js`, set `airtableFormUrl` to that share URL and adjust `airtableFields` to match your form's field names exactly. The date is passed as YYYY-MM-DD and time as HH:MM. Test the prefilled date/time and purpose on the actual Airtable form before sharing the portfolio. The visitor must finish and submit the external form; the portfolio never submits data silently.
4. If desired, create an Airtable automation triggered by a form submission, notify yourself, check calendar availability, and manually confirm the request. A true self-service slot scheduler with availability, conflict prevention and confirmation needs a dedicated scheduling provider (e.g. a public booking page) or a secure backend; Airtable form/calendar alone is not one. No API secret should be placed in public GitHub Pages code.

Official resources: https://support.airtable.com/docs/building-and-sharing-forms-in-airtable and https://support.airtable.com/docs/prefilling-a-form-via-encoded-url

## 5. Update certificates

The supplied DataCamp Associate Data Analyst image is displayed. DA101 is an exam identifier, not a separate certificate. The supplied image shows an issue date of November 7, 2025. Check the current validity in your DataCamp account; the website describes it as an earned credential rather than claiming active status. The IBM and Microsoft/Coursera cards use branded text artwork, not fake certificate images. The old images were course-level certificates, not evidence of the complete professional programs. Before publishing, confirm that both full professional certificates are earned; if either is still in progress, change its label to `In progress` or remove the card until completed.

- Add your full IBM certificate image as `images/ibm-professional.jpg` (or PNG).
- Add your full Microsoft/Coursera certificate image as `images/powerbi-professional.jpg` (or PNG).
- Set the corresponding `certificates.ibm.image` and `certificates.powerbi.image` paths in `js/config.js`. Optional: set `verifyUrl` to the actual public verification URL. If a local image fails to load, the original artwork remains intact.
- For PL-300, only add the Microsoft Certified: Power BI Data Analyst Associate credential after you have passed and verified it. Coursera completion is not equivalent to passing Microsoft's PL-300 exam. A failed attempt score is intentionally omitted from the recruiter-facing site.

## 6. Add future projects

The visible portfolio contains only the two completed projects. In `index.html`, duplicate an existing `article.project-card` inside `.project-grid` at the future project comment, edit title, screenshot, description, skills and repository link, then add a corresponding unique ID case study inside `projects.html`. The grid automatically wraps. Update the homepage project count and case study navigation. Use real evidence, not invented impact.

The Olist project preview is a custom conceptual schema, not a screenshot. Its KPI values match the actual dashboard. The case study links to the actual screenshot in GitHub. To replace the preview with your own screenshot, download it from your repository, place it in `images/`, and copy the image markup pattern from SaleOps. The SaleOps images are taken from the original portfolio ZIP.

## 7. Files

- `index.html` — recruiter-oriented homepage
- `about.html` — profile, academic timeline and career direction
- `projects.html` — detailed case studies with actual project links
- `privacy.html` — analytics/contact privacy notice
- `styles.css` — responsive shared theme and layout
- `js/config.js` — one public integration/settings file
- `js/site.js` — theme, navigation, certificate images, booking dialog and analytics loader
- `images/` — existing verified assets and new favicon

## Source project references

- https://github.com/pyaekhantkyaw/olist_ecommerce_sales_logistics_powerbi
- https://github.com/pyaekhantkyaw/saleops_business_analysis

No third-party analytics or booking account was connected or deployed during this redesign. Review the public-facing claims, credentials and résumé before publishing.
