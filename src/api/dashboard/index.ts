import type { DashboardListType } from './types'
import type { ResponseData } from '@/types/global'
import { http } from '@/utils/request'

export function getDashboardListAPI() {
  return http<ResponseData<DashboardListType>>({
    url: 'home/data',
  })
}
