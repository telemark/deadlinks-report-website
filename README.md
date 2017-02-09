[![Build Status](https://travis-ci.org/telemark/deadlinks-report-website.svg?branch=master)](https://travis-ci.org/telemark/deadlinks-report-website)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# deadlinks-report-website

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/deadlinks-report-website.svg)](https://greenkeeper.io/)

Use your sitemap.xml as base for checking all external links from your website.

## Installation

Clone or download the repo from GitHub

```sh
$ git clone git@github.com:telemark/deadlinks-report-website.git
```

## Setup

cd into directory and run the setup script to install all dependencies

```sh
$ npm run setup
```

## Usage

Setup the [config-file](config/index.js) with your environment.

Run the scripts

```sh
$ npm run collect-pages
```

```sh
$ npm run collect-links
```

```sh
$ npm run generate-jobs
```

```sh
$ npm run check-links
```

This will generate an .xlsx-file with all the links that failed.


```sh
$ npm run generate-report
```

To cleanup everything use

```sh
$ npm run cleanup
```



## License
[MIT](LICENSE)
