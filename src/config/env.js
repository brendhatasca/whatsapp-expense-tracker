import 'dotenv/config';

export const env = {
    personalPhoneNumber: process.env.PERSONAL_PHONE_NUMBER,
    port: process.env.PORT || 3000,
    twilioAccountSID: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    googleSheetID: process.env.GOOGLE_SHEET_ID,
}

for (const [k, v] of Object.entries(env)) {
  if (!v) throw new Error(`Missing env var for ${k}`);
}