import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
    // const res = response.data

    // if (res.code !== 20000) {
    //   ElMessage({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000,
    //   })
    //   return Promise.reject(new Error(res.message || 'Error'))
    // }
    // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   ElMessageBox.confirm(`You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout'`, {
    //     confirmButtonText: 'Re-Login',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning',
    //   }).then(() => {

    //   })
    // }
    // return Promise.reject(new Error(res.message || 'Error'))
  },
  (error: any) => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export { service as http }
