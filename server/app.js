require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require("express-session");
const helmet = require("helmet");

var routes = require('./routes/index');

var app = express();
const cors = require("cors");

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const sess = {
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  unset: "destroy",
  cookie: {
    path: "/",
    httpOnly: true,
    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
  }
};
app.use(session(sess));

app.use('/api/v1', routes);

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

  res.status(err.status || 500).send(err.message);
});

module.exports = app;
