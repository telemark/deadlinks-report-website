'use strict'

const pageLinks = require('pagelinks')
const isExternalUrl = item => item.href.startsWith('http')


module.exports = (pagesToCheck, callback) => {
  var links = []
  var list = JSON.parse(JSON.stringify(pagesToCheck))

  const next = () => {
    if (list.length > 0) {
      const page = list.pop()
      if (page) {
        console.log(list.length + ' pages remaining.')
        pageLinks({uri: page}, (error, data) => {
          if (error) {
            console.error(error)
          } else {
            const urls = data.filter(isExternalUrl)
            urls.forEach(item => {
              links.push({
                url: page,
                link: item.href
              })
            })
          }
          next()
        })
      } else {
        next()
      }
    } else {
      console.log('Finished collecting links')
      callback(null, links)
    }
  }
  next()
}
