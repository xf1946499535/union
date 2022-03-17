let mysql = require('mysql')

let options = {
    host: "47.108.230.246",
    //port:"3306",//可选，默认式3306
    user: "xiangfeng",
    password: "xiangfeng123123",
    database: "guloti"
}


let con = mysql.createConnection(options);

//建立连接
con.connect((err) => {
    //如果建立连接失败
    if (err) {
        console.log(err)
    } else {
        console.log('数据库连接成功')
    }
})

function sqlQuery(strSql, arr) {
    return new Promise(function (resolve, reject) {
        con.query(strSql, arr, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = sqlQuery;