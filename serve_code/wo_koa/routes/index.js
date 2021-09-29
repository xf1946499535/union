const router = require('koa-router')()
var sqlQuery = require('../module/lcMysql')
router.get('/', async (ctx, next) => {
  // ctx.body = 'koa2 string' 
   let sqlstr = "select fafafa from fafafa"

  try {
    ctx.body=await sqlQuery(sqlstr, [])
  } catch (error) {
    throw error
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
