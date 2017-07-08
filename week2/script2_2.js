function getWeather(city, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+String(city)+"&appid=c0c6030143a04eff2a48acd37bd81dbb");
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    return callback(xhr.status, xhr.responseText);
  }
}



getWeather("Kiev", function (error, data) {
  if (error != 200) {
    alert( "error message" + ': ' + error);
  } else {
    var weather = JSON.parse(data);
    console.log("Country code: " + weather.sys.country + "\n"
    + "City: " + weather.name + "\n" +
    "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
    "Humidity: " + weather.main.humidity + "%\n\n");
  }
});
getWeather("London", function (error, data) {
  if (error != 200) {
    alert( "error message" + ': ' + error);
  } else {
    var weather = JSON.parse(data);
    console.log("Country code: " + weather.sys.country + "\n"
    + "City: " + weather.name + "\n" +
    "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
    "Humidity: " + weather.main.humidity + "%\n\n");
  }
});
getWeather("New York", function (error, data) {
  if (error != 200) {
    alert( "error message" + ': ' + error);
  } else {
    var weather = JSON.parse(data);
    console.log("Country code: " + weather.sys.country + "\n"
    + "City: " + weather.name + "\n" +
    "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
    "Humidity: " + weather.main.humidity + "%\n\n");
  }
});
