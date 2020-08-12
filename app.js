const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const i18n = require('i18n');
const { cookieName } = require('config');

const indexRouter = require('./routes/index');

const app = express();

if (!process.env.IMGUR_CLIENT_ID) {
  console.error('"IMGUR_CLIENT_ID" is not set.');
  throw new Error('"IMGUR_CLIENT_ID" is not set error.');
}

i18n.configure({
  locales: ['en', 'ja'],
  cookie: cookieName,
  directory: __dirname + '/locales',
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);

app.use('/', indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
