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
        var str = "select * from user where account=?"
        var user = (await sqlQuery(str, [req.body.account]))[0]
        if (user && user.password == req.body.password) {
            res.json({
                code: 1,
                data: {
                    userid: user.id
                },
                message: "登陆成功",
            })
        } else {
            res.json({
                code: 0,
                message: "登录失败，请检查账户密码是否正确",
            })
        }
    },
    //获取用户信息
    /*
    userid 用户id
     */
    async getuser(req, res, next) {
        try {
            var str = 'select * from user'
            var term = ` where id=${req.query.userid}`
            var sqlres = await sqlQuery(str + term)
            sqlres[0].password = '******'
            res.json({
                code: 1,
                message: "查询成功",
                data: sqlres[0]
            })
        } catch (error) {
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