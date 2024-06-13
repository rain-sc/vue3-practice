export interface PermissionListBaseType {
  data: PermissionItemType[]
}

export interface PermissionItemType {
  code?: string
  description?: string
  enVisible?: string
  id?: number
  name?: string
  pid?: string | number
  type?: string | number
}
