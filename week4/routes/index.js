var express = require('express');
var router = express.Router();

module.exports = function(app) {
    /* GET home page. */
    app.get('/latest_data/:id', function(req, res, next) {
        const db = app.get('db');
        var id = Number(req.params.id);
        // Get the data from DB
        db.dntbvl04.weather.findOne(id)
            .then(function(result) {
                console.log(result);
                if (result) {
                    res.render('index', {
                        title: 'Our Express App with a database access example',
                        subtitle: 'our example of using EJS and DB',
                        entry: result
                    })
                } else {
                    res.send('Error');
                }
            })
            .catch(function(err){
                res.send('Error');
            })
    });
    return router;
};