const cheerio = require('cheerio')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')
const append = require('../google_sheet_uploader/index.js')

const DATE_FORMAT = 'YYYY.MM.DD'


var process = function (url) {
    var devs = [
        [''],
        ['서울npo - 센터소식'],
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
                    $(this).find('a').text().trim(), //title
                    $(this).find('.date').text().trim(), //date
                    $(this).find('a').attr('href'), //link
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

process('http://www.seoulnpocenter.kr/bbs/board.php?bo_table=bbs_center')
