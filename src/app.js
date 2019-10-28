var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var error = new Error("No existe la ruta especificada");
  error.status = 404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  if (err.status) {
    res.sendStatus(err.status);
  } else {
    res.sendStatus(500);
  }
});

module.exports = app;
