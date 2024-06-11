import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken } from './auth'
import { useUserStoreHook } from '@/store/modules/user'
import router from '@/router'

function logout() {
  useUserStoreHook().resetToken()
  router.push('/login')
}

const service = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: 'https://heimahr.itheima.net',
  timeout: 10000,
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
    const { code, success } = error.response.data
    if (code === 10002 && !success) {
      ElMessageBox.confirm('當前頁面已失效，請重新登入', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        logout()
      })
    }
    else {
      ElMessage.error('系统出错')
    }
    return Promise.reject(error)
  },
)

export { service as http }
