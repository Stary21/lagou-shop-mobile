import axios from 'axios'

import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api'
})
request.interceptors.request.use(config => {
  const { user } = store.state
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

request.interceptors.response.use(config => {
  if (config.data.status === 410000) {
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return config
})

export default request
