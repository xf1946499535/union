import h_axios from "@/utils/http"

//根据token获取当前用户
export const getUserByToken = (query) => {
    return h_axios.request({
        url: 'small4/shop/goods/detail',
        method: 'get',
        params: query
    })
}