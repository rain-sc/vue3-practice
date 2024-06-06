export interface EmployeeParamsType {
  page: number
  size: number
}

export interface EmployeeListBaseType {
  total: number
  rows: EmployeeItemType[]
}

export interface EmployeeItemType {
  correctionTime: string
  departmentName: string
  formOfEmployment: number
  id: string
  mobile: string
  password: string
  staffPhoto: string
  timeOfEntry: string
  username: string
  workNumber: string
}
