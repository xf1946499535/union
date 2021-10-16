import h_axios from "@/utils/http"
////获取项目列表
export const allProject = (data) => {
  return h_axios.request({
      url: '/project/selectAll',
      method: 'post',
      data:data
  })
}