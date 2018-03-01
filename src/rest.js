import Vue from 'vue'
import axios from 'axios'

export const emitter = new Vue()

axios.defaults.headers.common.token = global.localStorage.getItem('token') || ''

const generateRest = () => {
  const baseURL = '/api'
  const ajax = axios.create({
    baseURL
  })

  return ['get', 'post', 'put', 'delete', 'patch'].reduce((result, method) => {
    result[method] = (...args) => {
      const promise = ajax[method](...args)
        .then(res => {
          const data = res.data
          if (!data.success) {
            emitter.$emit('ajaxError', data)
            throw new Error(data.message)
          }
          return data
        })
        .catch(error => {
          const res = error.response
          // 未登陆
          if (res.status === 401) {
            emitter.$emit('loginError', res.data)
            throw new Error(res.data.message)
          }
        })
      return promise
    }
    return result
  }, {})
}

const rest = generateRest()

export const getToken = () => {
  return global.localStorage.getItem('token')
}

export const setToken = t => {
  axios.defaults.headers.common.token = t
  global.localStorage.setItem('token', t)
}

export default rest
