var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var mysql = require('mysql');
// var session = require('express-session');
// var SessionStore = require('express-mysql-session');
// var settings = require('./data/settings.js');
// var pool  = mysql.createPool(settings);

// var FileStore = require('session-file-store')(session);
var common = require('./lib/common.js')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
global.common = common;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', indexRouter);
app.use('/users', usersRouter);

// app.post('/users/test', (req, res) => {
//   console.log(req.body)
// })
// sessionStore = new SessionStore({
//     host: settings.host,
//     port: settings.port,
//     user: settings.user,
//     password: settings.password,
//     database: settings.database,
//     schema: {
//         tableName: 'session',
//         columnNames: {
//             session_id: 'id',
//             expires: 'expires',
//             data: 'data'
//         }
//     }
// })

//session中间件
// app.use(session({
//     name: 'identity',
//     secret: 'health', //对session id 相关的cookie 进行签名
//     store: new FileStore,
//     resave: false, //每次都重新保存
//     saveUninitialized: false, // 是否保存未初始化的会话
//     cookie: { maxAge: 1000 * 60 * 3 },
// }))


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
