/*jshint esversion: 6 */
// Dependecies requires
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

// Routes requires
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var signupRouter = require('./routes/signup');
var CrearPizzaMainRouter = require('./routes/CrearPizzaMain');
var CrearUnSaborFinal = require('./routes/CrearUnSaborFinal');
var Bebida = require('./routes/Bebida');
var CrearPrimeraMitad = require('./routes/CrearPrimeraMitad');
var CrearSegundaMitad = require('./routes/CrearSegundaMitad');
var DosSaboresFinal = require('./routes/DosSaboresFinal');
var Ensalada = require('./routes/Ensalada');
var PizzaEspecialMain = require('./routes/PizzaEspecialMain');
var PrimeraMitad = require('./routes/PrimeraMitad');
var SegundaMitad = require('./routes/SegundaMitad');
var UnSaborFinal = require('./routes/UnSaborFinal');
var Mantenimiento = require('./routes/Mantenimiento');

var app = express();

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/login/auth', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/signup', signupRouter);
app.use('/CrearPizzaMain', CrearPizzaMainRouter);
app.use('/CrearUnSaborFinal', CrearUnSaborFinal);
app.use('/Bebida', Bebida);
app.use('/CrearPrimeraMitad', CrearPrimeraMitad);
app.use('/CrearSegundaMitad', CrearSegundaMitad);
app.use('/DosSaboresFinal', DosSaboresFinal);
app.use('/Ensalada', Ensalada);
app.use('/PizzaEspecialMain', PizzaEspecialMain);
app.use('/PrimeraMitad', PrimeraMitad);
app.use('/SegundaMitad', SegundaMitad);
app.use('/UnSaborFinal', UnSaborFinal);
app.use('/Mantenimiento', Mantenimiento);

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

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
