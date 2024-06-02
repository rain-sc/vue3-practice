import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import TOKEN_KEY from '@/enums/CaheEnum'
import { useUserStoreHook } from '@/store/modules/user'
import router from '@/router'

function logout() {
  useUserStoreHook().resetToken()
  window.location.reload()
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useStorage(TOKEN_KEY, '')
    if (accessToken.value)
      config.headers.Authorization = `Bearer ${accessToken.value}`
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
      ElMessageBox.confirm(`You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout'`, {
        confirmButtonText: 'Re-Login',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
      router.push('/login')
      logout()
    }
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export { service as http }
