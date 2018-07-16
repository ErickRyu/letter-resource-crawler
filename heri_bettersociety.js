const cheerio = require('cheerio')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')

const DATE_FORMAT = 'YYYY.MM.DD'


var process = function (url) {
    var devs = [];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            //$('.grid').eq(0).remove(); // remove header row
            return $('tr');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = {
                    date: $(this).find('.date').text().trim(),
                    title: $(this).find('a.title').text().trim(),
                    href: $(this).find('a').attr('href'),
                    summary: $(this).find('.summary').text().trim(),
                };
                if(isDiffOneDays(dev.date , DATE_FORMAT))
                    devs.push(dev);
            });
        })
        .then(function () {
            console.log(devs)
        })
}


process('http://heri.kr/bettersociety')

