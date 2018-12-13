'use strict'

const md5 = require('md5')
const pageLinks = require('pagelinks')
const isExternalUrl = item => item.href && item.href.startsWith('http')

module.exports = (pagesToCheck, callback) => {
  var links = {}
  var list = JSON.parse(JSON.stringify(pagesToCheck))
  const next = () => {
    if (list.length > 0) {
      const page = list.pop()
      if (page) {
        console.log(list.length + ' pages remaining.')
        pageLinks({ uri: page }, (error, data) => {
          if (error) {
            console.error(error)
          } else {
            const urls = data.filter(isExternalUrl)
            urls.forEach(item => {
              const hrefId = md5(item.href)
              if (links[hrefId]) {
                links[hrefId].urls.push(page)
              } else {
                links[hrefId] = {
                  link: item.href,
                  urls: [page]
                }
              }
            })
          }
          next()
        })
      } else {
        next()
      }
    } else {
      console.log('Finished collecting links')
      const repackedLinks = []
      Object.keys(links).forEach(id => {
        repackedLinks.push(links[id])
      })
      callback(null, repackedLinks)
    }
  }
  next()
}
