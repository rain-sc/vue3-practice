import type { LoginDataType, LoginResType } from './type'
import { http } from '@/utils/request'
import type { ResponseData } from '@/types/global'

export function loginAPI(data: LoginDataType) {
  return http<ResponseData<LoginResType>>({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}
