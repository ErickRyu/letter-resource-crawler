#!/usr/bin/node
const isDiffOneDays = require('./isDiffOneDays')
const process = require('./process.js')

const DATE_FORMAT = 'YYYY.MM.DD'
const BASE_URL = 'http://heri.kr/'


const name = '한겨레 heri뉴스'
const url = BASE_URL + 'heri'
const articleListSelector = 'tr'


function findAndAppendElems(devs) {
  return function(){
    var dev = [
      $(this).find('a.title').text().trim(), //title
      $(this).find('.date').text().trim(), //date
      BASE_URL + $(this).find('a').attr('href'), //link
    ];
    if(isDiffOneDays(dev[1], DATE_FORMAT))
      devs.push(dev);
  }
}

process(name, url, articleListSelector, findAndAppendElems)

