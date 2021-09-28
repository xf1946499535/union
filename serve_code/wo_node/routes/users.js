var express = require('express');
var router = express.Router();
//此处需要进行mysql连接操作，已安装mysql模块，，
var sqlQuery = require('../module/lcMysql')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('我是users页');
});

module.exports = router;
