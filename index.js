'use strict'

const http = require('http')
const xlsx = require('tfk-json-to-xlsx')
const smtaStream = require('sitemap-to-array').stream
const config = require('./config')
const findLinksOnPage = require('./lib/find-links-on-page')
const checkLinksStatus = require('./lib/check-links-status')
var pages = []

const writeResults = (error, results) => {
  if (error) {
    console.error(error)
  } else {
    xlsx.write(config.REPORT_FILE_PATH, results, error => {
      if (error) {
        console.error(error)
      } else {
        console.log('Finished writing file')
      }
    })
  }
}

const handleLinks = (error, data) => {
  if (error) {
    console.error(error)
  } else {
    checkLinksStatus(data, writeResults)
  }
}

const handlePages = pagesToCheck => {
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
