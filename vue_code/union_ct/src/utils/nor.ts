//nor.js是不需要token的请求拦截器
import axios from 'axios'
// 配置请求的基准URL地址
const request = axios.create({
    baseURL: 'http://localhost:3367'
})


//axios设置请求拦截器
request.interceptors.request.use(config => {
    return config
}, err => {
    console.log(err)
    return Promise.reject(err)
})

//axios设置响应拦截器
request.interceptors.response.use(response => {
    return response.data //拦截处理响应结果，直接返回需要的数据
}, err => {
    console.log(err)
    return Promise.reject(err)
})

export default request