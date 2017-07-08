var express = require('express');
var router = express.Router();
var getWeather = require('../customModules/getWeather');


module.exports = function(app) {
    // GET /
    router.get('/:city', function(req, res, next) {
        var city = req.params.city;
        getWeather.getWeather(city,function callback(data){
            if (data) {

                var date = new Date();
                const db = app.get('db');

                db.dntbvl04.weather.insert({date: date, city: city, data: data})
                    .then(function(result) {
                        res.send("successful insert to DB");
                    });
            } else {
                console.log("error");
            }
        });

    });

    return router;
};
