function getWeather(callback, city){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a164f3ec180b85f5a0bbbcba58ed2406');
    xhr.send();

    xhr.onload = function() {
        if (this.status == 200) {
            var weather = JSON.parse(xhr.responseText);
            console.log("Country code: " + weather.sys.country + "\n"
            + "City: " + weather.name + "\n" +
            "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
            "Humidity: " + weather.main.humidity + "%\n\n");
            callback(null, city);
        } else {
            callback("Error" + this.status + "for city " + city);
        }
    };
    xhr.onerror = function() {
        console.log("Нет доступа в интернет");
        process.exit(-1);
    };
}

async.series([
    function(callback) {
        getWeather(callback, "kiev");
    },
    function(callback) {
        getWeather(callback, "london");
    },
    function(callback) {
        getWeather(callback, "new York");
    }
], function(error, results) {
    if(error)
        console.log(error);
    else
        console.log(results);
});
