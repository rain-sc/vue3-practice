export interface ResponseData<T> {
  success: boolean
  code: number
  data: T
  message: string
}
