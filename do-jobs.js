'use strict'

const fs = require('fs')
const exec = require('child_process').execFile
const config = require('./config')

function next () {
  const isJsonFile = file => file.indexOf('.json') > -1
  const jobs = fs.readdirSync(config.JOBS_DIRECTORY_PATH).filter(isJsonFile).length
  if (jobs > 0) {
    console.log(jobs + ' jobs left to do')
    exec('node', ['example.js'], (error, stdout, stderr) => {
      if (error) {
        console.error(error)
      } else {
        console.log(stdout)
        console.log(stderr)
      }
      next()
    })
  } else {
    console.log('All jobs done')
  }
}

next()
