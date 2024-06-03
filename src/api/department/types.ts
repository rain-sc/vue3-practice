export interface DepartmentType {
  companyId: string
  companyName: string
  companyManage: string
  depts: DepartmentListType[]
}

export interface DepartmentListType {
  code: string
  createTime: string
  id: string
  introduce: string
  manager: string
  name: string
  pid: string
}
