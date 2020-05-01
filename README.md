# PDF Generator

Build Status: [![CircleCI](https://circleci.com/gh/LBHackney-IT/pdfGenerator.svg?style=svg)](https://app.circleci.com/pipelines/github/LBHackney-IT/pdfGenerator)

This is a simple microservice that accepts html input and returns a PDF. It uses the serverless framework with Node.js and uses Chrome with Puppeteer to generate the PDF.

## How to use

Send a html document as a post to the endpoint and you'll get back a PDF
