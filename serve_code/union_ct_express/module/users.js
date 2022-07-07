const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
const modusers = {
    //密码验证
    /*
    userid:需要验证的用户id
    inpwd:需要检验的密码
    */
    async pwdcheck(userid, inpwd) {
        var str = `select * from user where id=${userid}`
        var sqlres = await sqlQuery(str)
        var relpwd = sqlres[0].password
        return {
            check: relpwd == inpwd ? true : false
        }
    },
}

module.exports = modusers