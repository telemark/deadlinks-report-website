'use strict'

const urlStatusCode = require('url-status-code')
const config = require('../config')
const goodStatuses = config.GOOD_STATUSES_LIST
const isBadStatus = item => goodStatuses.indexOf(item.statusCode) === -1

module.exports = (linksToCheck, callback) => {
  var results = []
  var list = JSON.parse(JSON.stringify(linksToCheck))

  const next = () => {
    if (list.length > 0) {
      const item = list.pop()
      if (item) {
        console.log(list.length + ' links remaining.')
        urlStatusCode(item.link, function (error, data) {
          if (error) {
            console.error(error)
          } else {
            item.statusCode = data
            results.push(item)
          }
          next()
        })
      } else {
        next()
      }
    } else {
      console.log('Finished linkchecking')
      const filteredResults = results.filter(isBadStatus)
      return callback(null, filteredResults)
    }
  }
  next()
}
