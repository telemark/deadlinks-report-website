
'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  const fileName = config.JOBS_DIRECTORY_PATH + '/' + item.id + '.json'

  console.log(item.id + ': cleanup-job')

  fs.unlinkSync(fileName)

  return callback(null, JSON.stringify(item))
})
