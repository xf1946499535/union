import n_axios from "@/utils/nor";
// import axios from "axios"

export const querynewdetall = (query) => {
    return axios.request({
        url: 'small4/shop/goods/detail',
        method: 'get',
        params: query
    })
}

export const login = (data) => {
    return n_axios.request({
        url: '/union/login',
        method: 'post',
        data: data
    })
}