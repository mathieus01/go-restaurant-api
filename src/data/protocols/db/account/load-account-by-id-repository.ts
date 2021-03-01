import { AccountModel } from '@/domain/models'

export interface LoadAccountByIdRepository {
  loadById(id: number): Promise<AccountModel>
}
