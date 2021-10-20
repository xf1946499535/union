//http.js是需要token的请求拦截器
import axios from 'axios'
import {getCookie } from "@/utils/sso";
// 配置请求的基准URL地址
axios.defaults.baseURL = '/api'

//axios设置请求拦截器
axios.interceptors.request.use(config => {
    config.headers.token = getCookie("token") //设置响应头
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

//axios设置响应拦截器
axios.interceptors.response.use(response => {
  return response //拦截处理响应结果，直接返回需要的数据
}, err => {
  console.log(err)
  return Promise.reject(err)
})

export default axios