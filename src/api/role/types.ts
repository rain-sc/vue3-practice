export interface RoleListBaseType {
  total: number
  rows: RoleItemType[]
}

export interface RoleItemType {
  id?: string
  name?: string
  description?: string
  state?: number
  permIds?: []
}

export interface RoleListParamsType {
  page: number
  pagesize: number
  total: number
}
