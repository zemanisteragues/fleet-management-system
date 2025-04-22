const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require('moment');

function createInvoice(invoice , taxDetails, dutySlips, path) {
  let doc = new PDFDocument({ size: "A4", margin: 40 });
  // generateHeader(doc);
  generateCustomerInformation(doc, invoice , taxDetails);
  generateInvoiceTable(doc, invoice, taxDetails, dutySlips);
  generateFooter(doc, taxDetails );

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

// function generateHeader(doc) {
//   doc
//     // .image("logo.png", 50, 45, { width: 50 })
//     .fillColor("#444444")
//     .fontSize(20)
//     .text("ACME Inc.", 110, 57)
//     .fontSize(10)
//     .text("ACME Inc.", 200, 50, { align: "right" })
//     .text("123 Main Street", 200, 65, { align: "right" })
//     .text("New York, NY, 10025", 200, 80, { align: "right" })
//     .moveDown();
// }

function generateCustomerInformation(doc, invoice , taxDetails) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)

    // Left Content
    .font("Helvetica-Bold")
    .text("Dream Cars Tours & Travels", 50, customerInformationTop)
    .font("Helvetica")
    .text("Jibagiri Path, Ashram Road,", 50, customerInformationTop + 15)
    .text("Near Ulubari Post Office Ulubari,", 50, customerInformationTop + 30)
    .text("Guwahati - 781007, Assam", 50, customerInformationTop + 45)
    // .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Phone: 9101 223 904", 50, customerInformationTop + 60)
    .text("Email: dreamcars1978@gmail.com", 50, customerInformationTop + 75)


    // Right Content
    
    .font("Helvetica-Bold")
    .text(`Invoice #${invoice?.invoiceNumber}`, 300, customerInformationTop)
    .font("Helvetica")
    .text(`Date: ${moment(invoice?.invoiceDate).format('YYYY-MM-DD HH:mm:ss')}`, 300, customerInformationTop + 15)
    .font("Helvetica-Bold")
    .text(`${invoice?.billedTo}`, 300, customerInformationTop + 30)
    .font("Helvetica")
    .text(`${invoice?.shippedTo}`, 300, customerInformationTop + 45)
    .text(`${invoice?.customerPhone}`, 300, customerInformationTop + 60)
    .moveDown();

  generateHr(doc, 300);
}

function generateInvoiceTable(doc, invoice , taxDetails, details) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "DATE",
    "FROM-TO",
    "VEHICLE",
    "TOTAL",
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < details?.length; i++) {
    const item = details[i];
    const position = invoiceTableTop + (i + 1) * 40;
    generateTableRow(
      doc,
      position,
      dateRow(doc, item?.dutyStartDateAndTime, item?.dutyEndDateAndTime),
      locationRow(doc, item?.startFrom, item?.endTo),
      // faresRow(doc, item , doc),
      vehicleRow(doc, item?.carType, item?.registrationNumber),
      item.subTotal,
    );

    // generateHr(doc, position + 20);
  }

  function faresRow(doc, item) {
    doc.font("Helvetica-Bold")
      .text(`Fare: ${doc?.basePrice || "-"}`, 300, 360)
      .text(`Total KM: ${doc?.dutyEndKm - doc.dutyStartKm || "-"}`, 300, 375)
      // .text(`Fuel/KM: ${doc?.fuelPerKM || "-"}`, 300, 385)
      .text(`Night Halt: ${doc?.nightHalt || "-"}`, 300, 395)
      .text(`Toll: ${doc?.tollTax || "-"}`, 300, 405)
  }

  function locationRow(doc, pick, drop) {
    doc.font("Helvetica-Bold")
      .text("Pick:", 200, 360)
      .text(`${pick || "-"}`)
      .text("Drop:", 200, 390)
      .text(`${drop || "-"}`)
  }

  function vehicleRow(doc, type, reg) {
    doc.font("Helvetica-Bold")
      .text("Vehicle Type :", 300, 360)
      .text(`${type || "-"}`)
      .text("Registration No :", 300, 390)
      .text(`${reg || "-"}`)
  }

  function dateRow(doc, start_date, release_date) {
      doc.font("Helvetica-Bold")
      .text("Start Date:", 50, 360)
      .text(`${ start_date &&  moment(start_date).format('YYYY-MM-DD HH:mm:ss')}`)
      .text("Release Date:", 50, 390)
      .text(`${ release_date &&  moment(release_date).format('YYYY-MM-DD HH:mm:ss')}`)
  }
  const subtotalPosition = invoiceTableTop + (i + 1) * 50;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(taxDetails.subTotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "IGST (5%)",
    "",
    formatCurrency(taxDetails.igst)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Grand Total",
    "",
    formatCurrency(taxDetails.grandTotal)
  );
  doc.font("Helvetica");
}

function generateFooter(doc , taxDetails) {
  doc
    .fontSize(10)
    .text(
      "Invoice was created on a computer and is valid without the signature and seal.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 200, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, typeof quantity == "number" ? y-10 : y , { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}


function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  // return "$" + (cents ? (cents / 100).toFixed(2) : 0);
  // return (cents ? (cents / 100).toFixed(8) : 0);
  return cents
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};