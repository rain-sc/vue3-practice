export interface EmployeeParamsType {
  page: number
  size: number
  departmentId?: number | null
  keyword?: string
}

export interface EmployeeListBaseType {
  total: number
  rows: EmployeeItemType[]
}

export interface EmployeeItemType {
  correctionTime?: string
  departmentName?: string
  formOfEmployment?: number | string
  id?: string
  mobile?: string
  password?: string
  staffPhoto?: string
  timeOfEntry?: string
  username?: string
  workNumber?: string
  companyId?: string
  companyName?: string
  roleIds?: string[]
  departmentId?: number
}
