import type { PermissionItemType, PermissionListBaseType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getPermissionListAPI() {
  return http<ResponseData<PermissionItemType[]>>({
    url: 'sys/permission',
  })
}

export function addPermissionAPI(data: PermissionItemType) {
  return http({
    url: 'sys/permission',
    method: 'POST',
    data,
  })
}

export function deleteCurrentPermissionAPI(data: PermissionItemType) {
  return http({
    url: `sys/permission/${data.id}`,
    method: 'DELETE',
  })
}
