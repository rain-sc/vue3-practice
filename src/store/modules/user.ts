import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
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
          useStorage(TOKEN_KEY, response.data.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  return {
    login,
  }
})
