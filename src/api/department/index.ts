import type { DepartmentType } from './types'
import { http } from '@/utils/request'
import type { ResponseData } from '@/types/global'

export function getDepartmentList() {
  return http<ResponseData<DepartmentType>>({
    url: 'company/department',
  })
}
