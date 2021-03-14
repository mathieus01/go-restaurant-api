import { AccountModel } from '@/domain/models'

export interface LoadAccountByToken {
  loadAccountByToken (accessToken: string): Promise<AccountModel>
}
