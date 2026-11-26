/* Public settings only. Never place an Airtable personal access token, API secret,
   Cloudflare account credential or other private key in this file. */
window.PORTFOLIO_CONFIG = {
  email: 'pyaekhantkyaw.it@gmail.com',
  // Public Airtable form share URL, not a calendar view or base edit link.
  airtableFormUrl: '',
  // Must exactly match field names on your Airtable form.
  airtableFields: { topic: 'Meeting purpose', date: 'Preferred date', time: 'Preferred time (Malaysia UTC+8)' },
  // Public site beacon token from Cloudflare Web Analytics, not an API token.
  cloudflareBeaconToken: '',
  // Add local images after obtaining full professional certificates. Optional public verification URLs.
  certificates: {
    ibm: { image: '', verifyUrl: '' }, // e.g. images/ibm-professional.jpg
    powerbi: { image: '', verifyUrl: '' } // e.g. images/powerbi-professional.jpg
  }
};
