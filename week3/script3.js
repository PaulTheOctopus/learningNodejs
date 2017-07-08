var fs = require('fs');
var rp = require('request-promise');



function getData(city, callback) {
	rp("http://api.openweathermap.org/data/2.5/weather?q="
	+String(city)
	+"&appid=c0c6030143a04eff2a48acd37bd81dbb")
    .then(function (response) {
        return callback(response);
    })
    .catch(function (err) {
        console.error(err);
        return;
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
 
/*function writeToFile(data) {
	fs.writeFile('message2.txt', data, (err) => {
		if (err) throw err;
		console.log('The file has been saved!');
	});
}*/

function saveToFile(data) {
    var wstream = fs.createWriteStream('message3.txt');
    wstream.write(data);
    wstream.end();
}



getData("kiev", function(data) {
  processData(data, function(data) {
    saveToFile(data)
  })
});


