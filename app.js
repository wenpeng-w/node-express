var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


app.get('/index', indexRouter);
app.get('/users', usersRouter);

app.listen(process.env.PORT || '3000', '192.168.90.122')