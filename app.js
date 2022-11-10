var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cars = require("./models/cars");
require('dotenv').config(); 
const connectionString =  
process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  
{useNewUrlParser: true, 
useUnifiedTopology: true}); 

var db = mongoose.connection;	
//Bind connection to error event	
db.on('error', console.error.bind(console, 'MongoDB connection error:'));	
db.once("open", function () {	
  console.log("Connection to DB succeeded")	
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var carsRouter = require('./routes/cars');
var gridbuildRouter= require('./routes/gridbuild');
var selctorRouter= require('./routes/selector');
var resourceRouter= require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/gridbuild', gridbuildRouter);
app.use('/selector', selctorRouter);
app.use('/resource', resourceRouter);


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

async function recreateDB() {	
  // Delete everything  	
  await cars.deleteMany();	
  let instance1 = new	
  cars({Car_Company:"Lamborghini",Car_Model:"Aventador",Car_Cost:44400});	
  let instance2 = new	
  cars({Car_Company:"Rolls royce",Car_Model:"Ghost",Car_Cost:34300});	
  let instance3 = new	
  cars({Car_Company:"Audi",Car_Model:"Sadan",Car_Cost:5500});	
  instance1.save(function (err, doc) {	
    if (err) return console.error(err);	
    console.log("First Object saved")	
  });	
  instance2.save(function (err, doc) {	
    if (err) return console.error(err);	
    console.log("Secound Object saved")	
  });	
  instance3.save(function (err, doc) {	
    if (err) return console.error(err);	
    console.log("Third Object saved")	
  });	
}	
let reseed = true;	
if (reseed) { recreateDB(); }

module.exports = app;