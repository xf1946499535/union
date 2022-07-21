var express = require('express');
var router = express.Router();
var account = require('../controller/account')


/*账号注册申请列表*/
router.get('/reapplist', async function (req, res, next) {
  try {
    account.reapplist(req, res, next)
  } catch (error) {
    next(error)
  }
});

//管理员处理账号申请表
router.post('/dealrlist', async function (req, res, next) {
  try {
    account.dealrlist(req, res, next)
  } catch (error) {
    next(error)
  }
});

//获取账号注册申请列表的审批历史
router.get('/reapplistHistory', async function (req, res, next) {
  try {
    account.reapplistHistory(req, res, next)
  } catch (error) {
    next(error)
  }
});
module.exports = router;