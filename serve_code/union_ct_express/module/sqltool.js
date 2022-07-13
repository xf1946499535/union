var sqlQuery = require('./lcMysql')

const sqltool = {
    /*
        表格查重
        table:表名  columnName列名，columnval列名值
        重复则返回true，否则返回false
    */
    async cnki(table, columnName, columnval) {
        var str = `select * from ${table} where ${columnName} = '${columnval}'`
        var res = await sqlQuery(str)
        return res.length > 0 ? true : false
    }
}
module.exports = sqltool