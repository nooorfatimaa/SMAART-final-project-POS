var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require("cors");
var passport = require("passport")
var config = require('./config')
var authenticate = require('./authenticate')


mongoose.connect('mongodb+srv://noooor:noor12345@cluster0.euyw8.mongodb.net/smaartDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true },() =>{console.log("connected")});

// var adminRouter = require('./app_server/routes/admin');

var userRouter = require('./app_server/routes/users');
var customerRouter = require('./app_server/routes/customer');
var cartRouter = require('./app_server/routes/cart');
var cashierRouter = require('./app_server/routes/cashier');
var categoryRouter = require('./app_server/routes/category');
var orderRouter = require('./app_server/routes/order');
var productRouter = require('./app_server/routes/product');
var salesRouter = require('./app_server/routes/sales');
var qrRouter = require('./app_server/routes/qrhandler');
var stripeRouter = require('./app_server/controllers/StripeHandler')

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'jade');

app.use(passport.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// app.use('/admin', adminRouter);
app.use('/qrimagesFolder', express.static(path.join(__dirname,"/uploads")))
app.use('/user', userRouter);
app.use('/customers', customerRouter);
app.use('/carts', cartRouter);
app.use('/cashiers', cashierRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/sales', salesRouter);
app.use('/qrcode', qrRouter);
app.use('/stripe', stripeRouter);


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
