require('dotenv').config({ override: true });
const { google } = require('googleapis');

async function test() {
  console.log("Email:", process.env.GOOGLE_CLIENT_EMAIL);
  console.log("Key length:", process.env.GOOGLE_PRIVATE_KEY?.length);
  console.log("Sheet ID:", process.env.GOOGLE_SPREADSHEET_ID);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  
  try {
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    });
    console.log("Sheet title:", sheetInfo.data.sheets[0].properties.title);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
