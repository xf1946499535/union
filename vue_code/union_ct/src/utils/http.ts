//http.js是需要登录的请求拦截器
import axios from 'axios'

// 配置请求的基准URL地址

const request = axios.create({
  baseURL: 'http://localhost:3367'
})

//axios设置请求拦截器
request.interceptors.request.use(config => {
  // config.headers.token = getCookie("token") //设置响应头
  if (sessionStorage.getItem('myid')) {
    return Promise.reject({
      code: 0,
      message: '请先完成登录'
    })
  } else {
    return config
  }
}, err => {
  console.log(err)
  return Promise.reject(err)
})

//axios设置响应拦截器
request.interceptors.response.use(response => {
  if (response.data.code != 1) {
    return Promise.reject(response.data)
  } else {
    return response.data //拦截处理响应结果，直接返回需要的数据
  }
}, err => {
  console.log(err)
  return Promise.reject(err)
})

export default request