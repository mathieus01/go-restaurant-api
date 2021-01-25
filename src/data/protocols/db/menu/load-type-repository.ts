import { TypeModel } from '@/domain/models/types'

export interface LoadTypeRepository {
  loadByDescription(description: string): Promise<TypeModel>
}
