var fs = require('fs');
var request = require('request');

function getData(city,callback) {

	request("http://api.openweathermap.org/data/2.5/weather?q="
			+String(city)
			+"&appid=c0c6030143a04eff2a48acd37bd81dbb", function (error, response, body) {
  	if (error) {
	    console.error(error.message);
	    // consume response data to free up memory
	    return;
  	}

  	if(response.statusCode !== 200) {
  		console.error(response && response.statusCode);
  		return;
  	}else {
  		console.log(response.statusCode);
  		return callback(body);
  	}
 
});

}

function processData(data, callback) {
  if (!data) {
          console.log( "error message" + ': data not found');
        } else {
          //console.log(data);
          var weather = JSON.parse(data);
          weather = ("Country code: " + weather.sys.country + "\n"
          + "City: " + weather.name + "\n" +
          "Temperature: " + (weather.main.temp - 273).toFixed(1) + " celsius\n" +
          "Humidity: " + weather.main.humidity + "%\n\n");
          return callback(weather);
        }
}

function saveToFile(data) {
    fs.open('message2.txt', 'a', undefined, function(err, fd) {
        if (err) {
          console.error("open error!");
          throw err;
        }
        fs.write(fd, data, 0, data.length, null, function(err, written) {
            if (err) {
              console.error("write error!");
              throw err;
            }
            fs.close(fd, function(err) {
                if (err) {
                  console.error("close error!");
                  throw err;
                }
            });
        });
    });
}

getData("kiev", function(data) {
  processData(data, function(data) {
    saveToFile(data)
  })
});