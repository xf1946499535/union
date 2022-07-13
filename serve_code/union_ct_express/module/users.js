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
        let str = `select * from user where userid=${userid}`
        let sqlres = await sqlQuery(str)
        let relpwd = sqlres[0].password
        return {
            check: relpwd == inpwd ? true : false
        }
    },
    //检查账户是否可用
    async accountenable(userid) {
        let str = `select enable from user where userid=${userid} and isdel=0`
        let sqlres = (await sqlQuery(str))[0]
        return {
            check: sqlres.enable == 1
        }
    }
}

module.exports = modusers