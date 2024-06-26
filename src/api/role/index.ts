import type { RoleItemType, RoleListBaseType, RoleListParamsType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getRoleListAPI(params: RoleListParamsType) {
  return http<ResponseData<RoleListBaseType>>({
    url: 'sys/role',
    params,
  })
}

export function addRoleAPI(data: RoleItemType) {
  return http<ResponseData<RoleListBaseType>>({
    url: 'sys/role',
    method: 'POST',
    data,
  })
}

export function getCurrentRoleDetailAPI(data: RoleItemType) {
  return http<ResponseData<RoleItemType>>({
    url: `sys/role/${data.id}`,
  })
}

export function editCurrentRoleAPI(data: RoleItemType) {
  return http<ResponseData<RoleItemType>>({
    url: `sys/role/${data.id}`,
    method: 'PUT',
    data,
  })
}

export function deleteCurrentRoleAPI(data: RoleItemType) {
  return http<ResponseData<RoleItemType>>({
    url: `sys/role/${data.id}`,
    method: 'DELETE',
  })
}

export function assignPermissionAPI(data: RoleItemType) {
  return http({
    url: `sys/role/assignPrem`,
    method: 'PUT',
    data,
  })
}
