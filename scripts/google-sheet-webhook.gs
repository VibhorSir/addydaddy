/**
 * Google Apps Script — Web App that appends contact-form submissions to a
 * Google Sheet. This is the "contact form -> Google Sheet" transport until
 * the site is upgraded to a CRM or email service.
 *
 * Setup (about 2 minutes):
 *   1. Create a Google Sheet (e.g. "AdyDaddy Leads").
 *   2. In that sheet: Extensions → Apps Script, delete the boilerplate and
 *      paste this entire file.
 *   3. Deploy → New deployment → type "Web app".
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4. Copy the Web app URL (ends in `/exec`) and set it as the
 *      GOOGLE_SHEET_WEBHOOK_URL environment variable in AWS Amplify
 *      (Hosting → Environment variables).
 */

var SHEET_NAME = "Sheet1"; // rename if your tab is different

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(SHEET_NAME);

    // Write a header row on the very first submission.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At",
        "Name",
        "Company",
        "Email",
        "Monthly Ad Budget",
        "Message",
      ]);
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.company || "",
      data.email || "",
      data.budget || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
