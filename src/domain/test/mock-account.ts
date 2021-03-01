import { AccountModel } from '@/domain/models'
import { AuthenticationParams } from '@/domain/usecases'

export const mockAddAccountModel = (): AccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  isRestaurant: false
})

export const mockAccountModel = (): AccountModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  isRestaurant: false,
  address: 'any_address'
})

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
