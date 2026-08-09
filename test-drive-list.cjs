require('dotenv').config({ override: true });
const { google } = require('googleapis');

async function test() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const res = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files.length === 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

test();
