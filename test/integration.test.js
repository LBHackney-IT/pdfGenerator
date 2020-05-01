const fs = require('fs');
const fetch = require('node-fetch');
const headers = {
  pdf: 'application/pdf',
  html: 'text/html'
};

const testUrl = process.env.TEST_URL;
if (!testUrl) throw 'You must set the TEST_URL environment variable';

const fileList = type => fs.readdirSync(`./test/${type}`);
const htmlFiles = fileList('html');

const readFixture = (type, name) =>
  fs.readFileSync(`./test/${type}/${name}`).toString('binary');

const convertFile = async (inType, outType, name) => {
  const body = readFixture(inType, name);
  return await fetch(testUrl, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': headers[inType],
      Accept: headers[outType]
    }
  }).then(res => res.arrayBuffer());
};

describe('Converting RTF to HTML', () => {
  for (let htmlFile of htmlFiles) {
    const pdfFile = htmlFile.replace('.html', '.pdf');
    it(`renders file ${htmlFile} to ${pdfFile}`, async function() {
      const convertedFile = await convertFile('html', 'pdf', htmlFile);
      const expectedFile = readFixture('pdf', pdfFile);
      expect(!!Buffer.compare(Buffer.from(convertedFile), Buffer.from(expectedFile))).toBe(true);
    });
  }
});
