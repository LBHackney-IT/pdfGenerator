"use strict";
const chromium = require("chrome-aws-lambda");

const pdfOptions = {
  printBackground: true,
  format: "A4",
  margin: {
    top: "0mm",
    right: "0mm",
    bottom: "0mm",
    left: "0mm",
  },
};

const launchBrowser = async () => {
  return await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
  });
};

const convertDoc = async (doc) => {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.setContent(doc);
  const pdf = await page.pdf(pdfOptions);
  await browser.close();
  return pdf;
};

module.exports.convert = async (event) => {
  const body = event.isBase64Encoded
    ? new Buffer(event.body, "base64").toString()
    : event.body;
  const pdf = await convertDoc(body);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/pdf" },
    body: pdf.toString("base64"),
    isBase64Encoded: true,
  };
};
