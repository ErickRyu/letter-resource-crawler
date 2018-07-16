const cheerio = require('cheerio')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')
const append = require('../googleAlertCrawler/index.js')

const DATE_FORMAT = 'YYYY.MM.DD'
const BASE_URL = 'http://heri.kr/'


var process = function (url) {
    var devs = [
        [''],
        ['한겨레 heri뉴스'],
        ['title', 'date', 'link']
    ];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            return $('tr');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = [
                    $(this).find('a.title').text().trim(), //title
                    $(this).find('.date').text().trim(), //date
                    BASE_URL + $(this).find('a').attr('href'), //link
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


process(BASE_URL + 'heri')

