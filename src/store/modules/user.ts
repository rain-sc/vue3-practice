import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import type { LoginDataType } from '@/api/auth/type'
import { loginAPI } from '@/api/auth'
import TOKEN_KEY from '@/enums/CaheEnum'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    token: '',
  })

  function login(data: LoginDataType) {
    return new Promise<void>((resolve, reject) => {
      loginAPI(data)
        .then((response) => {
          const { data } = response.data
          useStorage(TOKEN_KEY, data)
          user.value.token = data
          ElMessage.success('Login successful')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  return {
    login,
    user,
  }
})
