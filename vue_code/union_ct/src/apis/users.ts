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
//提交注册申请
export const register = (account: string, password: string, name: string): any => {
  return naxios.request({
    url: '/uc/users/register',
    method: 'post',
    data: {
      account: account,
      password: password,
      name: name
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

