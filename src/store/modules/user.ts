import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { LoginDataType } from '@/api/auth/type'
import { loginAPI } from '@/api/auth'
import { getToken, setToken } from '@/utils/auth'

interface User {
  token: string
}
export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    token: getToken() || '',
  })

  async function login(loginData: LoginDataType) {
    const res = await loginAPI(loginData)
    const resData = res.data
    const { data, message } = resData
    if (data) {
      setToken(data)
      user.value.token = data
      ElMessage.success(message)
    }
    else {
      ElMessage.error(message)
    }
  }
  return {
    login,
    user,
  }
})
