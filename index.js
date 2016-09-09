'use strict'

const config = require('./config')
const protocol = /https/.test(config.SITEMAP_URL) ? 'https' : 'http'
const fs = require('fs')
const http = require(protocol)
const xlsx = require('tfk-json-to-xlsx')
const smtaStream = require('sitemap-to-array').stream
const findLinksOnPage = require('./lib/find-links-on-page')
const checkLinksStatus = require('./lib/check-links-status')
var pages = []

function writeResults (error, results) {
  if (error) {
    console.error(error)
  } else {
    if (results.length > 0) {
      const fileName = `${config.REPORT_DIRECTORY_PATH}/${config.REPORT_FILE_PATH}`
      xlsx.write(fileName, results, error => {
        if (error) {
          console.error(error)
        } else {
          console.log('Finished writing file')
        }
      })
    } else {
      console.log('No broken links to report')
    }
  }
}

function handleLinks (error, data) {
  if (error) {
    console.error(error)
  } else {
    const fileName = `${config.REPORT_DIRECTORY_PATH}/links.json`
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2))
    checkLinksStatus(data, writeResults)
  }
}

function handlePages (pagesToCheck) {
  findLinksOnPage(pagesToCheck, handleLinks)
}

smtaStream.on('data', data => {
  const json = JSON.parse(data.toString())
  pages.push(json.loc)
})

smtaStream.on('end', () => {
  console.log('Finished collecting pages')
  handlePages(pages)
})

http.get(config.SITEMAP_URL, response => {
  response
    .pipe(smtaStream)
})
