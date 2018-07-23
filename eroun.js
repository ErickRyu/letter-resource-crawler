#!/usr/bin/node
const isDiffOneDays = require('./isDiffOneDays')
const process = require('./process.js')

const DATE_FORMAT = 'YYYY-MM-DD'

const name = '이로운 넷'
const url = 'http://www.eroun.net/%EC%9D%B4%EB%A1%9C%EC%9A%B4%EB%84%B7%EC%9D%98-%EB%AA%A8%EB%93%A0-%EC%86%8C%EC%8B%9D%EB%93%A4'
const articleListSelector = '.listing > .column'


function findAndAppendElems(devs){
  return function(){
    var dev = [
        $(this).find('a').text().trim(), //title
        $(this).find('a').attr('href'), //link
        $(this).find('time').attr('datetime'), //date
    ];
    if(isDiffOneDays(dev[2] , DATE_FORMAT))
        devs.push(dev);
  }
}


process(name, url, articleListSelector, findAndAppendElems)
