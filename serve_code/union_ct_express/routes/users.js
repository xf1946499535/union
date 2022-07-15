var express = require('express');
var router = express.Router();
var users = require('../controller/users')

/* GET users listing. */
/*用户注册*/
router.post('/register', async function (req, res, next) {
  try {
    users.register(req, res, next)
  } catch (error) {
    next(error)
  }
});

/*用户登录*/
router.post('/login', async function (req, res, next) {
  try {
    users.login(req, res, next)
  } catch (error) {
    next(error)
  }
});
/*获取单个用户基本信息 */
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
/*修改头像 */
router.post('/editUserheader', upload.any(), async function (req, res, next) {
  try {
    users.editUserheader(req, res, next)
  } catch (error) {
    next(error)
  }
});

module.exports = router;