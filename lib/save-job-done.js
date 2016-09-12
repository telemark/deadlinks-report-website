'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  var fileName = config.DONE_DIRECTORY_PATH + '/' + item.id + '.json'

  console.log(item.id + ': save-job-done')
  fs.writeFileSync(fileName, JSON.stringify(item, null, 2))

  return callback(null, JSON.stringify(item))
})
