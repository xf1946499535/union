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
    //用户余额验证
    /*
    根据不同商品表进行验证
        price:价格
        userid:购买人id
     */
    async balancecheck(price, userid) {
        var userres = await sqlQuery(`select * from user where id=${userid}`)
        return {
            check: price < userres[0].balance ? true : false
        }
    },
    //用户扣费
    /*
    money:交易额
    userid:用户id
     */
    async deduct(money, userid) {
        console.log(money);
        console.log(userid);
        var userres = await sqlQuery(`select * from user where id=${userid}`)
        sqlQuery(`update user set balance=${userres[0].balance-money} where id=${userid}`)
    },
    //用户到账
    /*
    money:交易额
    userid:用户id
     */
    async addduct(money, userid) {
        var userres = await sqlQuery(`select * from user where id=${userid}`)
        sqlQuery(`update user set balance=${userres[0].balance+money} where id=${userid}`)
    }
}

module.exports = modusers