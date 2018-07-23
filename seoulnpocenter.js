#!/usr/bin/node
const isDiffOneDays = require('./isDiffOneDays')
const process = require('./process.js')

const DATE_FORMAT = 'YYYY.MM.DD'


const name = '서울npo - npo 소식'
const url = 'http://www.seoulnpocenter.kr/bbs/board.php?bo_table=bbs_npo'
const articleListSelector = 'tr'

function findAndAppendElems(devs) {
  return function(){
    var dev = [
      $(this).find('a').text().trim(), //title
      $(this).find('.date').text().trim(), //date
      $(this).find('a').attr('href'), //link
    ];
    if(isDiffOneDays(dev[1], DATE_FORMAT))
      devs.push(dev);
  }
}


process(name, url, articleListSelector, findAndAppendElems)
