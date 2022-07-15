import naxios from '@/utils/nor'

//获取注册申请列表
export const reapplist = (reqnum: number = 10, pagenum: number = 1): any => {
  return naxios.request({
    url: '/uc/account/reapplist',
    method: 'get',
    params: {
      reqnum: reqnum,
      pagenum: pagenum
    }
  })
}