import type { DepartmentListType } from './types'
import { http } from '@/utils/request'
import type { ResponseData } from '@/types/global'

export function getDepartmentListAPI() {
  return http<ResponseData<DepartmentListType[]>>({
    url: 'company/department',
  })
}
