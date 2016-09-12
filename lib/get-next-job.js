'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const isJsonFile = file => file.indexOf('.json') > -1

module.exports = miss.through((chunck, encoding, callback) => {
  const jobs = fs.readdirSync(config.JOBS_DIRECTORY_PATH).filter(isJsonFile)
  var item

  console.log('get-next-job')

  if (jobs.length > 0) {
    item = fs.readFileSync(config.JOBS_DIRECTORY_PATH + '/' + jobs[0])
    return callback(null, item.toString())
  } else {
    console.log('No jobs in queue')
    process.exit(0)
  }
})
