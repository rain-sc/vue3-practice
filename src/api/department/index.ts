import type {
  DepartmentListBaseType,
} from './types'
import { http } from '@/utils/request'
import type { ResponseData } from '@/types/global'

export function getDepartmentListAPI() {
  return http<ResponseData<DepartmentListBaseType[]>>({
    url: 'company/department',
  })
}

export function getDepartmentHeadListAPI() {
  return http<ResponseData<DepartmentListBaseType[]>>({
    url: 'sys/user/simple',
  })
}

export function addDepartmentAPI(data: DepartmentListBaseType) {
  return http({
    url: 'company/department',
    method: 'POST',
    data,
  })
}

export function getCurrentDepartmentDetailAPI(data: DepartmentListBaseType) {
  return http<ResponseData<DepartmentListBaseType>>({
    url: `company/department/${data.id}`,
  })
}

export function editCurrentDepartmentAPI(data: DepartmentListBaseType) {
  return http<ResponseData<DepartmentListBaseType>>({
    url: `company/department/${data.id}`,
    method: 'PUT',
    data,
  })
}

export function deleteCurrentDepartmentAPI(data: DepartmentListBaseType) {
  return http<ResponseData<DepartmentListBaseType>>({
    url: `company/department/${data.id}`,
    method: 'DELETE',
  })
}
