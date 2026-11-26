/* Public settings only. Never place an Airtable personal access token, API secret,
   Cloudflare account credential or other private key in this file. */
window.PORTFOLIO_CONFIG = {
  email: 'pyaekhantkyaw.it@gmail.com',
  // Public Airtable form share URL, not a calendar view or base edit link.
  airtableFormUrl: '',
  // Must exactly match field names on your Airtable form.
  airtableFields: { topic: 'Meeting purpose', date: 'Preferred date', time: 'Preferred time (Malaysia UTC+8)' },
  // Public site beacon token from Cloudflare Web Analytics, not an API token.
  cloudflareBeaconToken: '30a46af22d68499fbb1f629179744a00',
  // Add local images after obtaining full professional certificates. Optional public verification URLs.
  certificates: {
    ibm: { image: 'images/ibm-certificate.png', verifyUrl: '' },
    powerbi: { image: 'images/powerbi-certificate.png', verifyUrl: '' }
}
};