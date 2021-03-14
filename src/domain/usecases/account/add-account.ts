import { AccountModel } from '@/domain/models/account'

export interface AddAccountParams {
  name: string
  email: string
  password: string
  isRestaurant: boolean
  avatar?: string
  cover?: string
  type?: string
  description?: string
}

export interface AddAccount {
  add (account: AddAccountParams): Promise<AccountModel>
}
