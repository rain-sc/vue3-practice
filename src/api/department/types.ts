export interface DepartmentListType extends DepartmentListBaseType {
  children?: DepartmentListBaseType[]
}

export interface DepartmentListBaseType {
  code: string
  createTime: string
  id: number
  introduce: string
  managerId: number
  managerName: string
  name: string
  pid: number
}
