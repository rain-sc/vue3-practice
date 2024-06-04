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

export interface DepartmentHeadListType {
  id: string
  username: string
}

export interface AddDepartmentParamsType {
  code: string
  introduce: string
  managerId: string
  name: string
  pid: string
}
