export interface ResponseData<T> {
  success: boolean
  code: number
  data: T
  message: string
}

export interface AppSettings {
  title: string
  showSettings: boolean
  fixedHeader: boolean
  tagsView: boolean
  sidebarLogo: boolean
}
