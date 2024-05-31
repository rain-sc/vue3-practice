import type { UserProfileType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getUserProfileAPI() {
  return http<ResponseData<UserProfileType>>({
    url: '/sys/profile',
  })
}
