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
var upload = multer({
    dest: 'upload_tmp/'
});
const users = {
    async getuser(req, res, next) {
        try {
            var str = 'select * from user'
            var term = ` where id=${req.query.id}`
            var sqlres = await sqlQuery(str + term)
            sqlres[0].password = '******'
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },

    //上传文件公用接口
    async editUserheader(req, res, next) {
        console.log(1);
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