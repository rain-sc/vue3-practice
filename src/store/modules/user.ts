import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { LoginDataType } from '@/api/auth/types'
import { loginAPI } from '@/api/auth'
import { getToken, setToken } from '@/utils/auth'
import { getUserProfileAPI } from '@/api/user'
import store from '@/store'
import type { UserProfileType } from '@/api/user/types'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken() || '')
  const userProfile = ref<UserProfileType>({
    userId: '',
    mobile: '',
    username: '',
    roles: {
      menus: [],
      points: [],
      apis: [],
    },
    companyId: '',
    company: '',
    staffPhoto: '',
  })

  async function login(loginData: LoginDataType) {
    const res = await loginAPI(loginData)
    const resData = res.data
    const { data, message } = resData
    try {
      if (data) {
        setToken(data)
        token.value = data
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
      Object.assign(userProfile.value, res.data.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function resetToken() {
    setToken('')
  }

  async function logout() {
    // 清除token
    resetToken()
    // 跳转到登录页
    location.reload()
  }
  return {
    login,
    token,
    getUserProfile,
    resetToken,
    userProfile,
    logout,
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
