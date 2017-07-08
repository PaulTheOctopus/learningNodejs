function getWeather(city, callback){
    var xhr = new XMLHttpRequest();
    var method = "GET";
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a164f3ec180b85f5a0bbbcba58ed2406';
    
    xhr.open(method, url, true);
    xhr.send();
    
    xhr.onload = function() {
  if (xhr.readyState == 4) {
      callback(xhr.status, xhr.responseText);
  } else{
      return callback("Error" + this.status + "for city " + city);
    }
  }
}

function weatherOutput(error, data) {
  if(error == 200) {
    //console.info(error);
    var weather = JSON.parse(data);
    console.log("Country code: " + weather.sys.country + "\n"
    + "City: " + weather.name + "\n" +
    "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
    "Humidity: " + weather.main.humidity + "%\n\n");
  } else{
    console.log('error: ' + error);
  }
};

var q = async.queue(function (task, callback) {
    getWeather(task.city, weatherOutput);
}, 3);

q.push({city: 'kiev'});
q.push({city: 'london'});
q.push({city: 'new york'});
q.drain = function() {
    console.log('all items have been processed');
};

