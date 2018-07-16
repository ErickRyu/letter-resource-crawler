const cheerio = require('cheerio')
const moment = require('moment')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')
const append = require('../googleAlertCrawler/index.js')

const DATE_FORMAT = 'YYYY.MM.DD'

var process = function (url) {
    var devs = [
        [''],
        ['더나은 미래'],
        ['title', 'date', 'summary', 'link']
    ];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            //$('.grid').eq(0).remove(); // remove header row
            return $('.grid > div');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = [
                    $(this).find('.title').eq(0).text().trim(), //title
                    $(this).find('.date').eq(0).text().trim(), //date
                    $(this).find('.excerpt > p').eq(1).text().trim(), //summary
                    $(this).find('a').attr('href') //link
                ];
                if(isDiffOneDays(dev[1], DATE_FORMAT))
                    devs.push(dev);
            });
        })
        .then(function () {
            devs.push([''])
            console.log(devs)
            append(devs)
        })
}


process('http://futurechosun.com/all')

