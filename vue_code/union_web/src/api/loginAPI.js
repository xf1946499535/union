import axios from "@/utils/http";


export const querynewdetall  = (query) => {
    return axios.request({
        url: 'small4/shop/goods/detail',
        method: 'get',
        params: query
    })
}

export const update  = (data) => {
  return axios.request({
      url: 'small4/shop/goods/detail',
      method: 'post',
      data: data
  })
}
