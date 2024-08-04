var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRouter = require('./routes/index');
var customerRouter = require('./routes/customer');
var hotelsRouter = require('./routes/hotels');
var pricesRouter = require('./routes/prices');
var paymentRouter = require('./routes/payment');
const bookingRouter = require('./routes/booking');

var app = express();

var cors = require('cors');
app.use(cors());
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customerRouter);
app.use('/hotels', hotelsRouter);
app.use('/prices', pricesRouter);
app.use('/payment', paymentRouter);
app.use('/booking', bookingRouter);
//const port = 3000;
//app.listen(port, () => console.log(`Server is running on ${port}`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
