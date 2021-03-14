export interface AccountModel {
  id?: number
  name: string
  email: string
  password: string
  isRestaurant: boolean
  description?: string
  address?: string
  token?: string

  avatar?: string
  cover?: string
  type?: string
}
