'use strict'

const fs = require('fs')
const config = require('./config')
const isJsonFile = file => file.indexOf('.json') > -1

function next () {
  const jobs = fs.readdirSync(config.JOBS_DIRECTORY_PATH).filter(isJsonFile).length
  if (jobs > 0) {
    console.log(jobs + ' jobs left to do')
    const linkChecker = require('./do-job')
    linkChecker({}, function (error, message) {
      if (error) {
        console.error(error)
      } else {
        console.log(message)
      }
    })
  } else {
    console.log('All jobs done')
  }
}

next()
