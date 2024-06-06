import type { RoleListBaseType, RoleListParamsType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getRoleListAPI(params: RoleListParamsType) {
  return http<ResponseData<RoleListBaseType>>({
    url: 'sys/role',
    params,
  })
}
