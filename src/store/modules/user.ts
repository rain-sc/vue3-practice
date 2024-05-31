import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { LoginDataType } from '@/api/auth/types'
import { loginAPI } from '@/api/auth'
import { getToken, setToken } from '@/utils/auth'
import { getUserProfileAPI } from '@/api/user'
import store from '@/store'

interface User {
  token: string
  username: string
  roles: string[]
}
export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    token: getToken() || '',
    username: '',
    roles: [],
  })

  async function login(loginData: LoginDataType) {
    const res = await loginAPI(loginData)
    const resData = res.data
    const { data, message } = resData
    try {
      if (data) {
        setToken(data)
        user.value.token = data
        ElMessage.success(message)
      }
      else {
        ElMessage.error(message)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  async function getUserProfile() {
    try {
      const res = await getUserProfileAPI()
      user.value.username = res.data.data.username
    }
    catch (error) {
      console.error(error)
    }
  }

  async function resetToken() {
    setToken('')
  }
  return {
    login,
    user,
    getUserProfile,
    resetToken,
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
