'use strict'

const miss = require('mississippi')
const urlStatusCode = require('url-status-code')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  console.log(item.id + ': check-status')
  urlStatusCode(item.link, function (error, data) {
    if (error) {
      console.error(error)
      item.statusCode = JSON.stringify(error)
    } else {
      item.statusCode = data
    }
    console.log(item.id + ': status checked')
    return callback(null, JSON.stringify(item))
  })
})
