import { TypeModel } from '@/domain/models'

export interface LoadTypeRepository {
  loadByDescription(description: string): Promise<TypeModel>
}
