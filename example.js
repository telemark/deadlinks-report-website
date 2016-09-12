'use strict'

const linkChecker = require('./do-job')

linkChecker({}, function (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
