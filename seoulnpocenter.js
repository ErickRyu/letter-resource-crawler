const cheerio = require('cheerio')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')

const DATE_FORMAT = 'YYYY.MM.DD'


var process = function (url) {
    var devs = [];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            return $('tr');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = {
                    date: $(this).find('.date').text().trim(),
                    title: $(this).find('a').text().trim(),
                    href: $(this).find('a').attr('href'),
                };
                if(isDiffOneDays(dev.date , DATE_FORMAT))
                    devs.push(dev);
            });
        })
        .then(function () {
            console.log(devs)
        })
}


process('http://www.seoulnpocenter.kr/bbs/board.php?bo_table=bbs_npo')
process('http://www.seoulnpocenter.kr/bbs/board.php?bo_table=bbs_center')

