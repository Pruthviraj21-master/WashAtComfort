const CONFIG = {
  SHEET_ID: PropertiesService.getScriptProperties().getProperty("SHEET_ID"),
  DRIVE_FOLDER_ID:
    PropertiesService.getScriptProperties().getProperty("DRIVE_FOLDER_ID"),
  SHARED_SECRET:
    PropertiesService.getScriptProperties().getProperty("SHARED_SECRET"),
  MAX_PHOTOS: 3,
  MAX_IMAGE_BYTES: 8 * 1024 * 1024,
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
    const photoResult = savePhotos(payload.photos || []);
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
        photoResult.urls.length,
        "",
        "",
        "",
        safeCell(photoResult.urls.join("\n")),
        safeCell(payload.source),
      ],
    ];

    sheet.getRange(row, 1, 1, HEADERS.length).setValues(values);
    photoResult.urls.forEach(function (url, index) {
      sheet
        .getRange(row, 12 + index)
        .setFormula('=IMAGE("' + url.replace(/"/g, '""') + '")');
    });
    sheet.setRowHeight(row, 110);

    return jsonResponse({ ok: true, row: row, photos: photoResult.urls });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error.message || error) });
  }
}

function validatePayload(payload) {
  if (!CONFIG.SHEET_ID || !CONFIG.DRIVE_FOLDER_ID || !CONFIG.SHARED_SECRET) {
    throw new Error(
      "Configure SHEET_ID, DRIVE_FOLDER_ID, and SHARED_SECRET in Script Properties."
    );
  }
  if (payload.token !== CONFIG.SHARED_SECRET) {
    throw new Error("Invalid submission token.");
  }
  if (!payload.name || !payload.mobile || !payload.area || !payload.address) {
    throw new Error("Required booking details are missing.");
  }
  if (
    !Array.isArray(payload.photos) ||
    payload.photos.length > CONFIG.MAX_PHOTOS
  ) {
    throw new Error("Invalid photo count.");
  }
}

function savePhotos(photos) {
  const folder = DriveApp.getFolderById(CONFIG.DRIVE_FOLDER_ID);
  const urls = [];

  photos.forEach(function (photo, index) {
    if (
      !photo ||
      !photo.data ||
      !/^image\/(jpeg|png|webp)$/.test(photo.mimeType)
    ) {
      throw new Error("Invalid image " + (index + 1) + ".");
    }

    const bytes = Utilities.base64Decode(photo.data);
    if (bytes.length > CONFIG.MAX_IMAGE_BYTES) {
      throw new Error("Image " + (index + 1) + " is too large.");
    }

    const extension =
      photo.mimeType === "image/png"
        ? "png"
        : photo.mimeType === "image/webp"
        ? "webp"
        : "jpg";
    const fileName =
      "WashAtComfort-" +
      new Date().getTime() +
      "-" +
      (index + 1) +
      "." +
      extension;
    const file = folder.createFile(
      Utilities.newBlob(bytes, photo.mimeType, fileName)
    );
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    urls.push("https://drive.google.com/uc?export=view&id=" + file.getId());
  });

  return { urls: urls };
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
