var createError = require('../node_modules/http-errors');
var express = require('../node_modules/express');
var path = require('path');
var cookieParser = require('../node_modules/cookie-parser');
var logger = require('../node_modules/morgan');

var app = express();

var indexRouter = require('../routes/userQueries');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
