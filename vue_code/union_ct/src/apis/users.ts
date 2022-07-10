import naxios from '@/utils/nor'

//登录
export const login = (account: string, password: string): any => {
  return naxios.request({
    url: '/uc/users/login',
    method: 'post',
    data: {
      account: account,
      password: password
    }
  })
}
//获取单个用户基本信息
export const getuser = (userid: number): any => {
  return naxios.request({
    url: '/uc/users/getuser',
    method: 'get',
    params: {
      userid: userid,
    }
  })
}

