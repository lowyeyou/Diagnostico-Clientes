// ============================================
//  DIAGNÓSTICO CLIENTES — Google Apps Script
//  Pega este código en Apps Script de tu Sheet
// ============================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Encabezados (solo se crean una vez)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha",
        "Nombre",
        "Marca / Negocio",
        "Teléfono",
        "Correo",
        "Ciudad",
        "Redes Sociales",
        "Tipo de Venta",
        "Descripción del Negocio",
        "Tiempo Operando",
        "Ingresos Constantes",
        "Rango de Ingresos",
        "¿Qué le falta?",
        "Principal Frustración",
        "¿Invirtió antes?",
        "¿Qué no funcionó?",
        "Servicio que necesita",
        "Velocidad de Decisión",
        "Qué valora más",
        "¿Qué es buena inversión?",
        "Objetivo en 6 meses",
        "Presupuesto",
        "Nivel de Compromiso",
        "¿Quiere análisis personalizado?",
        "🎯 Clasificación Automática"
      ]);

      // Estilo de encabezados
      const headerRange = sheet.getRange(1, 1, 1, 25);
      headerRange.setBackground("#0a0a0a");
      headerRange.setFontColor("#e8ff47");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Clasificación automática
    const servicio = data.servicio || "";
    const falta = data.falta || "";
    const combined = (servicio + " " + falta).toLowerCase();
    let clasificacion = "Consultoría Integral";

    if (/marketing|venta|visibilidad|lead|campa/.test(combined)) {
      clasificacion = "📊 Marketing Digital";
    } else if (/foto|video|imagen|redes|contenido|visual/.test(combined)) {
      clasificacion = "🎥 Fotografía & Video";
    } else if (/evento|activaci|lanzamiento|experiencia/.test(combined)) {
      clasificacion = "🎪 Eventos & Activaciones";
    } else if (/brand/.test(combined)) {
      clasificacion = "✨ Branding";
    }

    // Insertar fila
    sheet.appendRow([
      new Date().toLocaleString("es-MX"),
      data.nombre || "",
      data.marca || "",
      data.telefono || "",
      data.correo || "",
      data.ciudad || "",
      data.redes || "",
      data.tipo_venta || "",
      data.descripcion || "",
      data.tiempo || "",
      data.ingresos_constantes || "",
      data.ingresos_rango || "",
      data.falta || "",
      data.frustracion || "",
      data.inversion_previa || "",
      data.no_funciono || "",
      data.servicio || "",
      data.decision || "",
      data.valor || "",
      data.buena_inversion || "",
      data.objetivo_6m || "",
      data.presupuesto || "",
      data.compromiso || "",
      data.analisis || "",
      clasificacion
    ]);

    // Color según clasificación
    const lastRow = sheet.getLastRow();
    const classCell = sheet.getRange(lastRow, 25);
    if (clasificacion.includes("Marketing"))    classCell.setBackground("#1a2e00").setFontColor("#e8ff47");
    else if (clasificacion.includes("Foto"))    classCell.setBackground("#2e1800").setFontColor("#ff6b35");
    else if (clasificacion.includes("Evento"))  classCell.setBackground("#001a2e").setFontColor("#47d4ff");
    else if (clasificacion.includes("Brand"))   classCell.setBackground("#1a0a2e").setFontColor("#c47eff");

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
