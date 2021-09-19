import h_axios from "@/utils/http"

//新建工单
export const newWo = (data) => {
    return h_axios.request({
        url: '/wo/addNewWO',
        method: 'post',
        data: data
    })
}