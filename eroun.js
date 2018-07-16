#!/usr/bin/node
const cheerio = require('cheerio')
const fetch = require('./fetch.js')
const isDiffOneDays = require('./isDiffOneDays')
const append = require('../googleAlertCrawler/index.js')

const DATE_FORMAT = 'YYYY-MM-DD'


var process = function (url) {
    var devs = [
        [''],
        ['이로운 넷'],
        ['title', 'date', 'link']
    ];
    fetch(url)
        .then(function (body) {
            $ = cheerio.load(body);
            //$('.grid').eq(0).remove(); // remove header row
            return $('.listing > .column');
        })
        .then(function (rows) {
            rows.each(function () {
                var dev = [
                    $(this).find('a').text().trim(), //title
                    $(this).find('time').attr('datetime'), //date
                    $(this).find('a').attr('href') //link
                ];
                if(isDiffOneDays(dev[1] , DATE_FORMAT))
                    devs.push(dev);
            });
        })
        .then(function () {
            devs.push([''])
            console.log(devs)
            append(devs)
        })
}


process('http://www.eroun.net/%EC%9D%B4%EB%A1%9C%EC%9A%B4%EB%84%B7%EC%9D%98-%EB%AA%A8%EB%93%A0-%EC%86%8C%EC%8B%9D%EB%93%A4')

