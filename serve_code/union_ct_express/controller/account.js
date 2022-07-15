var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users')
const account = {
  //获取账号注册申请列表
  /*
  pagenum 请求的页面
  reqnum 请求数量
   */
  async reapplist(req, res, next) {
    try {
      let data = req.query
      let sqlstr = `select accountApply.*,user.account from accountApply,user where isdeal=0 and user.userid=applyUserid limit ${(data.pagenum - 1)*data.reqnum},${data.reqnum}`
      let sqlres = await sqlQuery(sqlstr)
      //获取记录总数
      let sqlstr2 = `select count(1) from accountApply where isdeal=0`
      let totalnum = (await sqlQuery(sqlstr2))[0]['count(1)']
      res.json({
        code: 1,
        data: {
          list: sqlres,
          //记录总数
          totalnum: totalnum
        },
        message: '请求成功'
      })
    } catch (error) {
      next(error)
    }

  }
}
module.exports = account