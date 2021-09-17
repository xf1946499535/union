import axios from "@/utils/http";


export const querynewdetall  = (id) => {
    return axios.request({
        url: 'small4/shop/goods/detail',
        method: 'post',
        params: id
    })
}
