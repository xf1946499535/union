//http.js是普通请求拦截器
import axios from 'axios'
// 配置请求的基准URL地址
axios.defaults.baseURL = 'https://api.it120.cc'

//axios设置请求拦截器
axios.interceptors.request.use(config => {
  if (localStorage.getItem['token']) {
    config.headers.token = localStorage.getItem['token'] //设置响应头
  }
    return config
}, err => {
    console.log(err)
    return Promise.reject(err)
})

//axios设置响应拦截器
axios.interceptors.response.use(response => {
    return response.data //拦截处理响应结果，直接返回需要的数据
}, err => {
    console.log(err)
    return Promise.reject(err)
})

export default axios
