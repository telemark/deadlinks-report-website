'use strict'

const config = require('./config')
const fs = require('fs')
const findLinksOnPage = require('./lib/find-links-on-page')

function handleLinks (error, data) {
  if (error) {
    console.error(error)
  } else {
    const fileName = `${config.REPORT_DIRECTORY_PATH}/links.json`
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2))
  }
}

function handlePages (pagesToCheck) {
  findLinksOnPage(pagesToCheck, handleLinks)
}

const pages = require('./reports/pages.json')
handlePages(pages)
