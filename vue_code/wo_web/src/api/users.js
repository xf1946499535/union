import h_axios from "@/utils/http"

//根据token获取当前用户
export const getUserByToken = (query) => {
    return h_axios.request({
        url: '/admin/getinfoByToken',
        method: 'get',
        params: query
    })
}

////获取用户列表
export const getUserList = (data) => {
  return h_axios.request({
      url: '/admin/getAllInfoOfAdmin',
      method: 'post',
      data: data
  })
}