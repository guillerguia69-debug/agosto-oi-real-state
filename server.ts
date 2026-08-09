import express from "express";
import path from "path";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config({ override: true });

const app = express();
const PORT = 3000;

app.use(express.json());

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// API route to submit form data
app.post("/api/submit", async (req, res) => {
  try {
    const payload = req.body;

    const credentials = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    };
    
    console.log("Using client email:", credentials.client_email);
    console.log("Spreadsheet ID:", process.env.GOOGLE_SPREADSHEET_ID);

    if (!credentials.client_email || !credentials.private_key) {
      console.warn("Missing Google Service Account credentials. Skipping Sheets API call.");
      return res.json({ success: true, message: "Datos recibidos (Sheets desactivado por falta de credenciales)" });
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });
    
    // Obtener información del spreadsheet para sacar el nombre de la primera hoja
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    });
    
    const firstSheetTitle = sheetInfo.data.sheets?.[0]?.properties?.title || "Sheet1";
    
    // Preparar la fila con los datos en el orden de las columnas de la tabla
    const rowData = [
      payload.fecha_hora || "",
      payload.nombre || "",
      payload.correo || "",
      payload.whatsapp ? String(payload.whatsapp).replace(/\+/g, "") : "",
      payload.objetivo || "",
      payload.disponibilidad || "",
      payload.zona || "",
      payload.plazo || "",
      payload.inversion || "",
      payload.utm_source || "",
      payload.utm_campaign || "",
      payload.utm_content || "",
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: `${firstSheetTitle}!A:A`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowData],
      },
    });

    res.json({ success: true, message: "Datos guardados en Google Sheets" });
  } catch (error: any) {
    console.error("Error saving to Google Sheets:", error);
    if (String(error).includes("permission")) {
      return res.status(403).json({ success: false, error: "La cuenta de servicio no tiene permiso para editar el Google Sheet. Por favor, compártelo con el correo de la cuenta de servicio." });
    }
    res.status(500).json({ success: false, error: String(error) });
  }
});

import fs from "fs";

async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, "index.html"));

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
