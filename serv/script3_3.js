var cb;
function getWeather(city) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    var method = "GET";
    var url = "http://api.openweathermap.org/data/2.5/weather?q="+String(city)+"&appid=c0c6030143a04eff2a48acd37bd81dbb";
    
    xhr.open(method, url, true); //true for async | false for sync
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.responseText);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();

    cb = function(weather) {
      console.log("Country code: " + weather.sys.country + "\n"
      + "City: " + weather.name + "\n" +
      "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
      "Humidity: " + weather.main.humidity + "%\n\n");
    }

  });

}

let cities = [
  "kiev",
  "london",
  "new york"
];

Promise.all(cities.map(getWeather))
  .then(results => {

    for (var i = 0; i < cities.length; i++){
      //console.log(results[i]);
      let weather = JSON.parse(results[i]);
      cb(weather);
    }
    
  });





