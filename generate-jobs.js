'use strict'

const fs = require('fs')
const uuid = require('uuid')
const config = require('./config')
const links = require('./reports/links.json')

links.forEach(link => {
  const id = uuid.v4()
  const fileName = `${config.JOBS_DIRECTORY_PATH}/${id}.json`
  link.id = id
  fs.writeFileSync(fileName, JSON.stringify(link, null, 2))
  console.log(`${fileName} written`)
})
