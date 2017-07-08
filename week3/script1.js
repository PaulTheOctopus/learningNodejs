var http = require('http');
var fs = require('fs');
var weather;

function getData(city, callback) {
  http.get("http://api.openweathermap.org/data/2.5/weather?q="+String(city)+"&appid=c0c6030143a04eff2a48acd37bd81dbb", (res) => {

  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      //console.log(parsedData);
      return callback(rawData);
    } catch (e) {
      console.error(e.message);
    }
  });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
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

function writeToFile(data) {
  fs.writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
}


getData("kiev", function(data) {
  processData(data, function(data) {
    writeToFile(data)
  })
});


