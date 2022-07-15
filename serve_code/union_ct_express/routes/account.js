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

module.exports = router;