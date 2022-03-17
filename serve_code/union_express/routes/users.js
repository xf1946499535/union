const {
  json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var users = require('../controller/users')

/* GET users listing. */
/*用户注册*/
router.post('/register', async function (req, res, next) {
  try {
    //查重
    if (await sqltool.cnki('user', 'account', req.body.account)) {
      res.json({
        code: 20001,
        message: "该账号已被注册",
      })
    } else {
      var str = 'insert into user(account,password,name) values(?,?,?);'
      await sqlQuery(str, [req.body.account, req.body.password, req.body.name])
      res.json({
        code: 20000,
        message: "注册成功",
      })
    }
  } catch (error) {
    next(error)
  }
});

/*用户登录*/
router.post('/login', async function (req, res, next) {
  var str = "select * from user where account=?"
  var user = (await sqlQuery(str, [req.body.account]))[0]
  if (user && user.password == req.body.password) {
    res.json({
      code: 20000,
      data: {
        userid: user.id
      },
      message: "登陆成功",
    })
  } else {
    res.json({
      code: 20001,
      data: {
        userid: null
      },
      message: "登录失败",
    })
  }
});

router.get('/getuser', async function (req, res, next) {
  try {
    users.getuser(req, res, next)
  } catch (error) {
    next(error)
  }
});
var multer = require('multer');

var upload = multer({
  dest: 'upload_tmp/'
});
/*上传文件公用接口 */
router.post('/upload', upload.any(), async function (req, res, next) {
  try {
    users.upload(req, res, next)
  } catch (error) {
    next(error)
  }
});

module.exports = router;