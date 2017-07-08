var rp = require('request-promise');
var express = require('express');
var massive = require('massive');

function getWeather(city, callback) {
        if (!city) {
            console.log("error: no data");
        } else {

            if(city) {
                rp("http://api.openweathermap.org/data/2.5/weather?q="
                    + String(city)
                    + "&appid=c0c6030143a04eff2a48acd37bd81dbb")
                    .then(function (response) {
                        console.log(response);
                        return callback(response);
                    })
                    .catch(function (err) {
                        console.error(err);
                        return;
                    });
            }else {
                res.send("Error:" + res);
            }
        }
}

module.exports = {
        getWeather: getWeather
};





