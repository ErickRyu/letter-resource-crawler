#!/usr/bin/node
const isDiffOneDays = require('./isDiffOneDays')
const process = require('./process.js')

const DATE_FORMAT = {
  dash : 'YYYY-MM-DD',
  dot : 'YYYY.MM.DD',
}

var data = [
  {
    name : '이로운 넷',
    url : 'http://www.eroun.net/%EC%9D%B4%EB%A1%9C%EC%9A%B4%EB%84%B7%EC%9D%98-%EB%AA%A8%EB%93%A0-%EC%86%8C%EC%8B%9D%EB%93%A4',
    articleListSelector : '.listing > .column',
    func : function(devs){
      return function(){
        var dev = [
          $(this).find('a').text().trim(), //title
          $(this).find('a').attr('href'), //link
          $(this).find('time').attr('datetime'), //date
        ];
        if(isDiffOneDays(dev[2] , DATE_FORMAT['dash'])) 
          devs.push(dev);
      }
    }
  },
  {
    name : '더 나은 미래',
    url : 'http://futurechosun.com/all',
    articleListSelector : '.grid > div',
    func: function (devs) {
      return function(){
        var dev = [
          $(this).find('.title').eq(0).text().trim(), //title
          $(this).find('a').attr('href'), //link
          $(this).find('.date').eq(0).text().trim(), //date
        ];
        if(isDiffOneDays(dev[2], DATE_FORMAT['dot']))
          devs.push(dev);
      }
    }
  },
  {
    name : '한겨레 heri뉴스',
    url : 'http://heri.kr/heri',
    articleListSelector : 'tr',
    func: function (devs) {
      return function(){
        var dev = [
          $(this).find('a.title').text().trim(), //title
          'http://heri.kr/' + $(this).find('a').attr('href'), //link
          $(this).find('.date').text().trim(), //date
        ];
        if(isDiffOneDays(dev[2], DATE_FORMAT['dot']))
          devs.push(dev);
      }
    }
  },
  {
    name : '서울npo - npo 소식',
    url : 'http://www.seoulnpocenter.kr/bbs/board.php?bo_table=bbs_npo',
    articleListSelector : 'tr',
    func: function (devs) {
      return function(){
        var dev = [
          $(this).find('a').text().trim(), //title
          $(this).find('a').attr('href'), //link
          $(this).find('.date').text().trim(), //date
        ];
        if(isDiffOneDays(dev[2], DATE_FORMAT['dot']))
          devs.push(dev);
      }
    }
  },
  {
    name : '서울npo - 센터소식',
    url : 'http://www.seoulnpocenter.kr/bbs/board.php?bo_table=bbs_center',
    articleListSelector : 'tr',
    func: function (devs) {
      return function(){
        var dev = [
          $(this).find('a').text().trim(), //title
          $(this).find('a').attr('href'), //link
          $(this).find('.date').text().trim(), //date
        ];
        if(isDiffOneDays(dev[2], DATE_FORMAT['dot']))
          devs.push(dev);
      }
    }
  },
]


for(let i = 0; i < data.length; i++){
  process(data[i])
}
