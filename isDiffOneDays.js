const moment = require('moment')

module.exports = function(date, format){
     return moment().diff(moment(date, format), 'days') == 1
}
