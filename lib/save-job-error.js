'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const goodStatuses = config.GOOD_STATUSES_LIST
const isBadStatus = item => goodStatuses.indexOf(item.statusCode) === -1

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  var results = []

  item.urls.forEach(url => {
    results.push({
      url: url,
      link: item.link,
      statusCode: item.statusCode
    })
  })

  const bads = results.filter(isBadStatus)

  if (bads.length > 0) {
    const fileName = config.ERRORS_DIRECTORY_PATH + '/' + item.id + '.json'
    fs.writeFileSync(fileName, JSON.stringify(results, null, 2))
    console.log(item.id + ': save-job-error')
  } else {
    console.log(item.id + ': no errors')
  }

  return callback(null, JSON.stringify(item))
})
