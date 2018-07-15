const cheerio = require('cheerio')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')

const DATE_FORMAT = 'YYYY-MM-DD'


var process = function (url) {
    var devs = [];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            //$('.grid').eq(0).remove(); // remove header row
            return $('.listing > .column');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = {
                    date: $(this).find('time').attr('datetime'),
                    title: $(this).find('a').text().trim(),
                    href: $(this).find('a').attr('href')
                };
                if(isDiffOneDays(dev.date , DATE_FORMAT))
                    devs.push(dev);
            });
        })
        .then(function () {
            console.log(devs)
        })
}


process('http://www.eroun.net/%EC%9D%B4%EB%A1%9C%EC%9A%B4%EB%84%B7%EC%9D%98-%EB%AA%A8%EB%93%A0-%EC%86%8C%EC%8B%9D%EB%93%A4')

