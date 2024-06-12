import type { EmployeeListBaseType, EmployeeParamsType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getEmployeeListAPI(params: EmployeeParamsType) {
  return http<ResponseData<EmployeeListBaseType>>({
    url: 'sys/user',
    params,
  })
}

export function exportEmployeeListAPI() {
  return http({
    url: 'sys/user/export',
    responseType: 'blob',
  })
}

export function importEmployeeTemplateAPI() {
  return http({
    url: 'sys/user/import/template',
    responseType: 'blob',
  })
}

export function importEmployeeListAPI(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return http({
    url: 'sys/user/import',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function deleteCurrentEmployeeAPI(id: number) {
  return http({
    url: `sys/user/${id}`,
    method: 'DELETE',
  })
}
