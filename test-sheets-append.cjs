require('dotenv').config({ override: true });
const { google } = require('googleapis');

async function test() {
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
    const title = sheetInfo.data.sheets[0].properties.title;
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: `${title}!A:A`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [["test"]],
      }
    });
    console.log("Success!");
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
