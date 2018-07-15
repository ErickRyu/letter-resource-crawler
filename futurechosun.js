const cheerio = require('cheerio')
const moment = require('moment')
const fetch = require('./fetch.js')



var isDiffOneDays = function(date){
     return moment().diff(moment(date, 'YYYY.MM.DD'), 'days') == 1
}


var process = function (url) {
    var devs = [];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            //$('.grid').eq(0).remove(); // remove header row
            return $('.grid > div');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = {
                    date: $(this).find('.date').eq(0).text().trim(),
                    name: $(this).find('.title').eq(0).text().trim(),
                    excerpt: $(this).find('.excerpt > p').eq(1).text().trim(),
                    href: $(this).find('a').attr('href')
                };
                if(isDiffOneDays(dev.date))
                    devs.push(dev);
            });
        })
        .then(function () {
            console.log(devs)
        })
}


process('http://futurechosun.com/all')

