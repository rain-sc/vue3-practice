import type { EmployeeListBaseType, EmployeeParamsType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getEmployeeListAPI(params: EmployeeParamsType) {
  return http<ResponseData<EmployeeListBaseType>>({
    url: 'sys/user',
    params,
  })
}
