import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './auth'
import { useUserStoreHook } from '@/store/modules/user'
import router from '@/router'

function logout() {
  useUserStoreHook().resetToken()
  router.push('/login')
  window.location.reload()
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getToken()
    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: any) => {
    if (error.response.status === 401) {
      ElMessage({
        message: error.response.data.message,
        type: 'error',
        duration: 5 * 1000,
      })
      logout()
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export { service as http }
