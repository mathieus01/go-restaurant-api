import { TypeModel } from '@/domain/models/type'

export interface LoadTypeRepository {
  loadByDescription(description: string): Promise<TypeModel>
}
