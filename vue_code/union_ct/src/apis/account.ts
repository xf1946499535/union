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
//注册申请列表审批

export const dealrlist = (deallist, dealres, dealuserid): any => {
  return naxios.request({
    url: '/uc/account/dealrlist',
    method: 'post',
    data: {
      deallist: deallist,
      dealres: dealres,
      dealuserid: dealuserid
    }
  })
}