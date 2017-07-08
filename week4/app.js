const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const massive      = require('massive');


// Initialize the [app]
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure middle-ware
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Initialize the database object
massive({
    host: 'www.solwey.com',
    port: 5432,
    database: 'futurekr',
    user: 'futurekr',
    password: '123456',
    ssl: true
}).then( function(db) {
    console.log("connected PG DB");
    app.set('db', db);
});

// Attach routers
var index = require('./routes/index')(app);
var myAPI = require('./routes/api')(app);



app.use('/', index);
app.use('/api/getWeather', myAPI);



// Setup the static folder
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
