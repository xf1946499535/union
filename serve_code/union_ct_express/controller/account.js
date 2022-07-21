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
  },

  //处理注册申请表
  /*
  deallist 进行处理的申请列表
  dealres 处理结果 布尔值
  dealuserid 处理人userid
   */
  async dealrlist(req, res, next) {
    let time = new Date()
    let data = req.body
    let applyidlist = req.body.deallist.map(item => {
      return item.accountApplyid
    })
    let applyuseridlist = req.body.deallist.map(item => {
      return item.applyUserid
    })
    data.dealres = data.dealres ? 1 : 0 //转化为1和0
    let dealuser = (await sqlQuery(`select * from user where userid=${data.dealuserid}`))[0]
    let sqlstr = `UPDATE accountApply set dealDate='${time.toLocaleString()}',
    dealUsername='${dealuser.name}',dealuserid =${data.dealuserid},isdeal=1,dealRes=${data.dealres}
     WHERE accountApplyid in (${applyidlist.join(',')})`
    let sqlres = await sqlQuery(sqlstr)

    //根据审批结果删除用户表中的账户
    if (!data.dealres) {
      modusers.delAccount(applyuseridlist)
    } else {
      modusers.enableAccount(applyuseridlist, 1)
    }

    res.json({
      code: 1,
      data: sqlstr,
      message: '处理成功'
    })
  },

  //获取账号注册申请列表的审批历史
  /*
  pagenum 请求的页面
  reqnum 请求数量
   */
  async reapplistHistory(req, res, next) {
    try {
      let data = req.query
      let sqlstr = `select accountApply.*,user.account from accountApply,user where isdeal=1 and user.userid=applyUserid order by accountApply.accountApplyid desc limit ${(data.pagenum - 1)*data.reqnum},${data.reqnum}`
      let sqlres = await sqlQuery(sqlstr)
      //获取记录总数
      let sqlstr2 = `select count(1) from accountApply where isdeal=1`
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
  },
}
module.exports = account