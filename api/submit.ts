import { google } from "googleapis";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const {
      fecha_hora,
      nombre,
      correo,
      whatsapp,
      objetivo,
      disponibilidad,
      zona,
      plazo,
      inversion,
      utm_source,
      utm_campaign,
      utm_content,
    } = req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // Manejar correctamente los saltos de línea de la llave privada en Vercel
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId as string,
    });
    
    const firstSheetTitle = sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${firstSheetTitle}'!A:A`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            fecha_hora,
            nombre,
            correo,
            whatsapp,
            objetivo,
            disponibilidad,
            zona,
            plazo,
            inversion,
            utm_source,
            "LP", // Columna K
            utm_campaign,
            utm_content,
          ],
        ],
      },
    });

    res.status(200).json({ success: true, message: "Datos guardados en Google Sheets" });
  } catch (error: any) {
    console.error("Error al guardar en Sheets:", error);
    res.status(500).json({ success: false, error: String(error) });
  }
}
