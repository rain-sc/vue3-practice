import type { PermissionItemType, PermissionListBaseType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getPermissionListAPI() {
  return http<ResponseData<PermissionItemType[]>>({
    url: 'sys/permission',
  })
}
