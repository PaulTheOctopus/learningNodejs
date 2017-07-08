var api = require('./api');
var each = require('async-each');

cities = ['kiev', 'london', 'new york'];
each(cities, api.getWeather, function(error) {
  if (error) {
  	console.error(error);
  	return;
  }else {
  	console.log('finish');
  }
});

