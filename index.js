'use strict'

const http = require('http')
const xlsx = require('tfk-json-to-xlsx')
const pageLinks = require('pagelinks')
const urlStatusCode = require('url-status-code')
const smtaStream = require('sitemap-to-array').stream
const config = require('./config')
var links = []
var pages = []
var results = []

function findLinksOnPages (pages) {
  var list = JSON.parse(JSON.stringify(pages))

  function next () {
    if (list.length > 0) {
      const page = list.pop()
      if (page) {
        console.log(list.length + ' pages remaining.')
        pageLinks(page, (error, data) => {
          if (error) {
            console.error(error)
          } else {
            data.forEach(item => {
              links.push({
                url: page,
                link: item.href
              })
            })
          }
        })
      } else {
        next()
      }
    } else {
      console.log('Finished collecting links')
      checkLinkStatus(links)
    }
  }
  next()
}

function checkLinkStatus (pages) {
  var list = JSON.parse(JSON.stringify(pages))

  function next () {
    if (list.length > 0) {
      const page = list.pop()
      if (page) {
        console.log(list.length + ' pages remaining.')
        xrayPage(page, function (error, data) {
          if (error) {
            console.error(error)
          } else {
            var pageData = repackContent(data)
            pageData.url = page
            pageData.lix = lix(pageData.content)
            measures.push({
              url: pageData.url,
              title: pageData.title,
              lix: pageData.lix
            })
            next()
          }
        })
      } else {
        next()
      }
    } else {
      console.log('Finished measuring')
      xlsx.write(config.REPORT_FILE_PATH, measures, function (error) {
        if (error) {
          console.error(error)
        } else {
          console.log('Finished writing file')
        }
      })
    }
  }

  next()
}

smtaStream.on('data', data => {
  const json = JSON.parse(data.toString())
  pages.push(json.loc)
})

smtaStream.on('end', () => {
  console.log('Finished collecting pages')
  findLinksOnPages(pages)
})

http.get(config.SITEMAP_URL, response => {
  response
    .pipe(smtaStream)
})
