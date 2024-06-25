export interface DashboardListType {
  contractSignTotal: number
  employeeTotal: number
  interfaceAccessTotal: number
  providentFund: ProvidentFundItem
  regularEmployeeTotal: number
  socialInsurance: SocialInsuranceItem
  toBeConfirmed: number
  toBeDismissed: number
  toBeEmployed: number
}
export interface ProvidentFundItem {
  category: string
  categoryType: string
  declarationTotal: number
  declaredTotal: number
  declaringTotal: number
  xAxis: string[]
  yAxis: number[]
}
export interface SocialInsuranceItem {
  category: string
  categoryType: string
  declarationTotal: number
  declaredTotal: number
  declaringTotal: number
  toDeclareTotal: number
}
