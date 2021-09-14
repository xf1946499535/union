var createError = require('http-errors');
var express = require('express');
var path = require('path');
//跨域资源请求
const cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {
  ftruncate
} = require('fs');

//此处需要进行mysql连接操作，已安装mysql模块，，
var sqlQuery = require('./module/lcMysql')



var app = express();
//跨域资源请求
app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/******************
 * ***********
 * 
 * *************
 * ****************************
 * *******************
 * **********************
 */


//axio所需的api接口
//查询所有用户
app.get('/api/userlist', async function (req, res) {
  let sqlStr = "select * from user"
  let result = await sqlQuery(sqlStr)
  res.json(Array.from(result))
})

//axio，根据用户名返回用户信息
app.get('/api/userbyname', async function (data, res) {
  let sqlStr = "select * from user where username=?"
  let result = await sqlQuery(sqlStr, [data.query.username])
  res.json(Array.from(result)[0])
})

//axio,更新用户点赞数
app.get('/api/pointcount', function (data, res) {
  let sqlStr = "update user set pointcount=? where username=?"
  let result = sqlQuery(sqlStr, [data.query.pointcount, data.query.username])
})
//axio,更新用户个人页面信息
app.get('/api/updateusermsg', function (data, res) {
  let sqlStr = "update user set birthday=?,hobby=?,homeaddress=?,workaddress=?,myword=? where username=?"
  let result = sqlQuery(sqlStr, [data.query.birthday, data.query.hobby, data.query.homeaddress, data.query.workaddress, data.query.myword, data.query.username])
})
/**获取所有说说 */
app.get('/api/getAllSay', async function (req, res) {
  let sqlStr = "select * from saysay"
  let result = await sqlQuery(sqlStr)
  res.json(Array.from(result))
})

//发表说说
app.get('/api/sendSay', function (data, res) {
  let strSql1 = 'insert into saysay (`sayer`,`content`,`sendtime`,`headerimg`) values (?,?,?,?)'
  sqlQuery(strSql1, [data.query.sayer, data.query.content, data.query.sendtime, data.query.headerimg])
})

//获取歌曲列表
app.get('/api/allmusic', async function (req, res) {
  let sqlStr = "select * from music"
  let result = await sqlQuery(sqlStr)
  res.json(Array.from(result))
})

/******************
 * ***********
 * 
 * *************
 * ****************************
 * *******************
 * **********************
 */

app.use('/', indexRouter);
app.use('/users', usersRouter);

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




module.exports = app;