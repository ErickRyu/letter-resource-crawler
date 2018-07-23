const cheerio = require('cheerio')
const append = require('../google_sheet_uploader/index.js')
const fetch = require('./fetch.js')

module.exports = function (name, url, articleListSelector, cb) {
  var devs = [
    [''],
    [name],
  ];
  fetch(url)
    .then(function (body) {
      $ = cheerio.load(body);
      return $(articleListSelector);
    })
    .then(function (rows) {
      rows.each(cb(devs));
    })
    .then(function () {
      devs.push([''])
      console.log(devs)
      append(devs)
    })
}
