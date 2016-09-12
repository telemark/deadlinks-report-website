'use strict'

module.exports = {
  REPORT_DIRECTORY_PATH: process.env.REPORT_DIRECTORY_PATH || 'reports',
  REPORT_FILE_PATH: process.env.REPORT_FILE_PATH || 'deadlinks-report_01.xlsx',
  JOBS_DIRECTORY_PATH: process.env.JOBS_DIRECTORY_PATH || 'jobs',
  ERRORS_DIRECTORY_PATH: process.env.ERRORS_DIRECTORY_PATH || 'errors',
  DONE_DIRECTORY_PATH: process.env.DONE_DIRECTORY_PATH || 'done',
  SITEMAP_URL: process.env.SITEMAP_URL || 'http://www.telemark.no/sitemap.xml',
  GOOD_STATUSES_LIST: process.env.GOOD_STATUSES_LIST || [200, 301, 302, 303]
}
