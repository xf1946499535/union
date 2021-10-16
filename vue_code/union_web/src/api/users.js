import h_axios from "@/utils/http"

//根据token获取当前用户
export const getUserByToken = (data) => {
    return h_axios.request({
        url: '/admin/getinfoByToken',
        method: 'post',
        data: data
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