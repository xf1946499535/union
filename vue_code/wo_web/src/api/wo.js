import h_axios from "@/utils/http"

//新建工单
export const newWo = (data) => {
    return h_axios.request({
        url: '/wo/addNewWO',
        method: 'post',
        data: data
    })
}

//获取工单列表
export const woList = (data) => {
  return h_axios.request({
      url: '/wo/quaryByInfo',
      method: 'post',
      data: data
  })
}