const linkChecker = require('./do-job')

linkChecker({}, function (error, message) {
  console.log('Ready to check link')
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
