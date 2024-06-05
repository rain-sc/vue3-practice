export interface DepartmentListType extends DepartmentListBaseType {
  children?: DepartmentListBaseType[]
}

export interface DepartmentListBaseType {
  code?: string
  createTime?: string
  id?: string
  introduce?: string
  managerId?: string
  managerName?: string
  name?: string
  pid?: string
  username?: string
}
