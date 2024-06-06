export interface RoleListBaseType {
  total: number
  rows: RoleItemType[]
}

export interface RoleItemType {
  id: string
  name: string
  description: string
}

export interface RoleListParamsType {
  page: number
  pagesize: number
}
