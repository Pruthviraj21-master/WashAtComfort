const CONFIG = {
  SHEET_ID: PropertiesService.getScriptProperties().getProperty("SHEET_ID"),
  SHARED_SECRET:
    PropertiesService.getScriptProperties().getProperty("SHARED_SECRET"),
  MAX_PHOTOS: 3,
};

const HEADERS = [
  "Timestamp",
  "Name",
  "Mobile",
  "Area",
  "Address",
  "Car",
  "Service",
  "Date",
  "Time",
  "Notes",
  "Photos Count",
  "Photo 1",
  "Photo 2",
  "Photo 3",
  "Photo URLs",
  "Source",
];

function doGet() {
  return jsonResponse({ ok: true, service: "WashAtComfort booking endpoint" });
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    validatePayload(payload);

    const sheet = getSubmissionSheet();
    const photoUrls = validatePhotoUrls(payload.photoUrls || []);
    const row = sheet.getLastRow() + 1;
    const values = [
      [
        safeCell(payload.timestamp),
        safeCell(payload.name),
        safeCell(payload.mobile),
        safeCell(payload.area),
        safeCell(payload.address),
        safeCell(payload.carType),
        safeCell(payload.serviceType),
        safeCell(payload.date),
        safeCell(payload.time),
        safeCell(payload.notes),
        photoUrls.length,
        "",
        "",
        "",
        safeCell(photoUrls.join("\n")),
        safeCell(payload.source),
      ],
    ];

    sheet.getRange(row, 1, 1, HEADERS.length).setValues(values);
    photoUrls.forEach(function (url, index) {
      sheet
        .getRange(row, 12 + index)
        .setFormula('=IMAGE("' + url.replace(/"/g, '""') + '")');
    });
    sheet.setRowHeight(row, 110);

    return jsonResponse({ ok: true, row: row, photos: photoUrls });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error.message || error) });
  }
}

function validatePayload(payload) {
  if (!CONFIG.SHEET_ID || !CONFIG.SHARED_SECRET) {
    throw new Error(
      "Configure SHEET_ID and SHARED_SECRET in Script Properties."
    );
  }
  if (payload.token !== CONFIG.SHARED_SECRET) {
    throw new Error("Invalid submission token.");
  }
  if (!payload.name || !payload.mobile || !payload.area || !payload.address) {
    throw new Error("Required booking details are missing.");
  }
  if (
    !Array.isArray(payload.photoUrls) ||
    payload.photoUrls.length > CONFIG.MAX_PHOTOS
  ) {
    throw new Error("Invalid photo count.");
  }
}

function validatePhotoUrls(photoUrls) {
  return photoUrls.map(function (url, index) {
    if (typeof url !== "string" || !/^https:\/\/res\.cloudinary\.com\//.test(url)) {
      throw new Error("Invalid photo URL " + (index + 1) + ".");
    }
    return url;
  });
}

function getSubmissionSheet() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const sheet = spreadsheet.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function safeCell(value) {
  const text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
