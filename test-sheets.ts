import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function main() {
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
  });
  console.log(res.data.sheets?.map(s => s.properties?.title));
}
main();
