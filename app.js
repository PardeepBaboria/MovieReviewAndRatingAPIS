var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var movieRouter = require('./routes/movieRoute');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routers
app.use('/movie', movieRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ status: "fail", message: `Can't find ${req.method} ${req.originalUrl} on this server!` })
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ status: "error", message: err.message })
});

module.exports = app;
