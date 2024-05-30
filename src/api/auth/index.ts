import type { LoginDataType, LoginResType } from './type'
import { http } from '@/utils/request'
import type { ResponseData } from '@/types/global'

export function loginAPI(data: LoginDataType): Promise<ResponseData<LoginResType>> {
  return http({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}
