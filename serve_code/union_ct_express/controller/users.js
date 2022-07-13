const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var modusers = require('../module/users')
var upload = multer({
    dest: 'upload_tmp/'
});
const users = {
    //登录
    async login(req, res, next) {
        var str = "select * from user where account=? and isdel=0"
        var user = (await sqlQuery(str, [req.body.account]))[0]
        //检查密码与用户名
        if (!user || user.password != req.body.password) {
            res.json({
                code: 0,
                message: "登录失败，请检查账户密码是否正确",
            })
            return false
        }
        //检查账户是否可用
        if (user.enable != 1) {
            res.json({
                code: 0,
                message: "登录失败，账户存在但未启用",
            })
            return false
        }

        res.json({
            code: 1,
            data: {
                userid: user.userid
            },
            message: "登录成功",
        })

    },
    //账户注册
    async register(req, res, next) {
        const date = new Date()
        //查重
        if (await sqltool.cnki('user', 'account', req.body.account)) {
            res.json({
                code: 0,
                message: "该账号已被注册",
            })
            return false
        }
        //插入用户表数据
        var sqlstr = 'insert into user(account,password,name) values(?,?,?)'
        let insertRes = await sqlQuery(sqlstr, [req.body.account, req.body.password, req.body.name])
        //插入注册申请表数据
        var sqlstr2 = 'insert into accountApply(applyUserid,applyUsername,applyDate) values(?,?,?)'
        await sqlQuery(sqlstr2, [insertRes.insertId, req.body.name, date.toLocaleString()])
        res.json({
            code: 1,
            message: "注册完成,请等待管理员审核",
        })
    },
    //获取用户基本信息
    /*
    userid 用户id
     */
    async getuser(req, res, next) {
        try {
            var str = 'select user.*,post.*,dep.* from user,post,dep'
            var term = ` where user.userid=${req.query.userid} and user.postid=post.postid and dep.depid=post.depid`
            var sqlres = await sqlQuery(str + term)
            sqlres[0].password = '******'
            res.json({
                code: 1,
                message: "查询成功",
                data: sqlres[0]
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    //修改头像
    async editUserheader(req, res, next) {
        try {
            console.log(req.files[0]); // 上传的文件信息
            var des_file = "./upload/" + req.files[0].originalname;
            fs.readFile(req.files[0].path, function (err, data) {
                fs.writeFile(des_file, data, function (err) {
                    if (err) {
                        console.log(err);
                        fs.unlinkSync(req.files[0].path);
                    } else {
                        response = {
                            message: 'File uploaded successfully',
                            filename: req.files[0].originalname
                        };
                        console.log(response);
                        fs.unlinkSync(req.files[0].path);
                        res.end(JSON.stringify(response));
                    }
                });
            });
        } catch (error) {
            next(error)
        }
    }
}
module.exports = users