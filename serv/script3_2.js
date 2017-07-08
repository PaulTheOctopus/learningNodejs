var cb;
function getWeather(city) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();   
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+String(city)+"&appid=c0c6030143a04eff2a48acd37bd81dbb");

    xhr.onload = function() {

      if (this.status == 200) {
        resolve(this.responseText);
        let weather = JSON.parse(this.responseText);
        console.log("Country code: " + weather.sys.country + "\n"
        + "City: " + weather.name + "\n" +
        "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
        "Humidity: " + weather.main.humidity + "%\n\n");
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

  });

}

getWeather("kiev")
  .then(function() {
    return getWeather("london");
  })
  .then(function() {
    return getWeather("new york");
  })
