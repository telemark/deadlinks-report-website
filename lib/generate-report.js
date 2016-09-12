'use strict'

const fs = require('fs')
const xlsx = require('tfk-json-to-xlsx')
const config = require('../config')
const isJsonFile = file => file.indexOf('.json') > -1
const jobs = fs.readdirSync(config.ERRORS_DIRECTORY_PATH).filter(isJsonFile)
const results = []

jobs.forEach(file => {
  const links = require(`../${config.ERRORS_DIRECTORY_PATH}/${file}`)
  links.forEach(link => {
    results.push(link)
  })
})

const fileName = `${config.REPORT_DIRECTORY_PATH}/${config.REPORT_FILE_PATH}`
xlsx.write(fileName, results, error => {
  if (error) {
    console.error(error)
  } else {
    console.log('Finished writing file')
  }
})
