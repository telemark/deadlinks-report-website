'use strict'

const linkChecker = require('./do-jobs')

linkChecker({}, function (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
