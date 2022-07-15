var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var usersRouter = require('./routes/users');
let accountRouter = require('./routes/account')



var bodyParser = require('body-parser');

//此处需要进行mysql连接操作，已安装mysql模块，，
var sqlQuery = require('./module/lcMysql')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/uc/users', usersRouter);
app.use('/uc/account', accountRouter)





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 记得注释最后一行的： module.exports = app;

var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3367); // 设定监听端口

//启动监听
var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});

//module.exports = app;//这是 4.x 默认的配置，分离了 app 模块,将它注释即可，上线时可以重新改回来