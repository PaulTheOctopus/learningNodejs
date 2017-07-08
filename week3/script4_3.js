var api = require('./api');
var eachSeries = require('async-each-series');

cities = ['kiev', 'london', 'new york'];
eachSeries(cities, function (el, next) {
    api.getWeather(el, next);
}, function (err) {
    console.log('finished');
});