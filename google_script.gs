// 1. Ve a tu documento de Google Sheets.
// 2. Haz clic en "Extensiones" > "Apps Script".
// 3. Borra cualquier código que haya allí y pega todo este código.
// 4. Guarda el proyecto (icono de disquete).
// 5. Haz clic en "Implementar" > "Nueva implementación".
// 6. Selecciona el tipo "Aplicación web".
// 7. En "Ejecutar como", selecciona "Yo".
// 8. En "Quién tiene acceso", selecciona "Cualquier persona".
// 9. Haz clic en "Implementar" y autoriza los permisos si te los pide.
// 10. Copia la URL de la aplicación web ("URL de ejecución") y pégala en js/main.js en la variable GOOGLE_SHEETS_ENDPOINT.

function doPost(e) {
  try {
    // Analizar los datos recibidos (el payload JSON)
    var data = JSON.parse(e.postData.contents);
    
    // Abrir la hoja de cálculo activa (la que está vinculada a este script)
    // Cambia 'Tabla_2' si el nombre de tu pestaña es diferente
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tabla_2"); 
    
    if (!sheet) {
      // Si no existe 'Tabla_2', intentamos usar la primera hoja
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }
    
    // Preparar la fila con los datos en el orden de las columnas de la tabla
    var rowData = [
      data.fecha_hora,          // Columna A: Fecha y Hora
      data.nombre,              // Columna B: Nombre y Apellidos
      data.correo,              // Columna C: Correo Electrónico
      data.whatsapp,            // Columna D: Número de WhatsApp
      data.objetivo,            // Columna E: 1. Objetivo Principal
      data.disponibilidad,      // Columna F: 2. Disponibilidad
      data.zona,                // Columna G: 3. Zona donde
      data.plazo,               // Columna H: 4. Plazo para estar
      data.inversion,           // Columna I: 5. ¿Estás dispuesto...
      data.utm_source,          // Columna J: Canal (UTM Source)
      data.utm_campaign,        // Columna K: Campaña (UTM Campaign)
      data.utm_content          // Columna L: Anuncio (UTM Content)
    ];
    
    // Insertar la fila al final de la hoja
    sheet.appendRow(rowData);
    
    // Devolver respuesta de éxito (necesario para la web)
    return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": data}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Manejo de errores
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
