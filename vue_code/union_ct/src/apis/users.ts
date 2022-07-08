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

