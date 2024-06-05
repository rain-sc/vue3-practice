import type {
  AddDepartmentParamsType,
  DepartmentHeadListType,
  DepartmentListBaseType,
  DepartmentListType,
} from './types'
import { http } from '@/utils/request'
import type { ResponseData } from '@/types/global'

export function getDepartmentListAPI() {
  return http<ResponseData<DepartmentListType[]>>({
    url: 'company/department',
  })
}

export function getDepartmentHeadListAPI() {
  return http<ResponseData<DepartmentHeadListType[]>>({
    url: 'sys/user/simple',
  })
}

export function addDepartmentAPI(data: AddDepartmentParamsType) {
  return http({
    url: 'company/department',
    method: 'POST',
    data,
  })
}

export function getCurrentDepartmentDetailAPI(id: string) {
  return http<ResponseData<DepartmentListBaseType>>({
    url: `company/department/${id}`,
  })
}
