import n_axios from "@/utils/nor";
// import axios from "axios"


export const login = (data) => {
    return n_axios.request({
        url: '/admin/login',
        method: 'post',
        data: data
    })
}