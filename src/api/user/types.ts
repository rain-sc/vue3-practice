export interface UserProfileType {
  userId: string
  mobile: string
  username: string
  roles: UserRolesType
  companyId: string
  company: string
}

export interface UserRolesType {
  menus: string[]
  points: string[]
  apis: string[]
}