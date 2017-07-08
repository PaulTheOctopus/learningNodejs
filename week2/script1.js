var xhr = new XMLHttpRequest();
var method = "GET";
var url = "http://api.openweathermap.org/data/2.5/weather?q=Kiev,ua&appid=c0c6030143a04eff2a48acd37bd81dbb";

xhr.open(method, url, false);
xhr.send();

if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText );
} else {
  var res = xhr.responseText;
  console.log(res);
  var weather = JSON.parse(res);
  console.log("Country code: " + weather.sys.country + "\n"
    + "City: " + weather.name + "\n" +
    "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
    "Humidity: " + weather.main.humidity + "%\n\n");
}
