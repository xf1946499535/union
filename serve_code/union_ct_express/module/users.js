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
    },
    //账号删除
    /*
    useridlist 账户id数组
     */
    async delAccount(useridlist) {
        let str = `update user set isdel=1 where userid in (${useridlist.join(',')})`
        let sqlres = await sqlQuery(str)
    },
    //账户启用/停用
    /*
    useridlist 账户id数组
     */
    async enableAccount(useridlist, isenable) {
        let str = `update user set enable=${isenable} where userid in (${useridlist.join(',')})`
        let sqlres = await sqlQuery(str)
    },
    //用户账号查重
    /*
    要求在isdel=0的情况下不能用户重复，无论用户是否启用
     */
    async accountcnik(account) {
        let sqlres = (await sqlQuery(`select userid from user where account='${account}' and isdel=0`))
        return sqlres.length > 0 ? true : false
    }
}

module.exports = modusers