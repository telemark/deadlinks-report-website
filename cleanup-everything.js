'use strict'

const fs = require('fs')
const config = require('./config')
const isDeletableFile = file => file.indexOf('.json') > -1 || file.indexOf('.xlsx') > -1

function cleanDirectory (directory) {
  const files = fs.readdirSync(directory).filter(isDeletableFile)

  files.forEach((file) => {
    const fileName = `${directory}/${file}`
    fs.unlink(fileName)
  })

  console.log(`${directory} is clean`)
}

cleanDirectory(config.DONE_DIRECTORY_PATH)

cleanDirectory(config.ERRORS_DIRECTORY_PATH)

cleanDirectory(config.JOBS_DIRECTORY_PATH)

cleanDirectory(config.REPORT_DIRECTORY_PATH)
