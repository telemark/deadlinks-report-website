'use strict'

const config = require('./config')
const protocol = /https/.test(config.SITEMAP_URL) ? 'https' : 'http'
const fs = require('fs')
const http = require(protocol)
var pages = []

const smtaStream = require('sitemap-to-array').stream
smtaStream.on('data', data => {
  const json = JSON.parse(data.toString())
  pages.push(json.loc)
})

smtaStream.on('end', () => {
  console.log('Finished collecting pages')
  const fileName = `${config.REPORT_DIRECTORY_PATH}/pages.json`
  fs.writeFileSync(fileName, JSON.stringify(pages, null, 2))
})

http.get(config.SITEMAP_URL, response => {
  response
    .pipe(smtaStream)
})
