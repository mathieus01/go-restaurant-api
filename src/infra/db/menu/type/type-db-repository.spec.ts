import { mockAddTypeParams } from '@/domain/test/mock-menu'
import Type from '@/infra/models/type-model'
import { TypeDbRepository } from './type-db-repository'

describe('Type Db Repository', () => {
  beforeAll(async (done) => {
    done()
  })

  beforeEach(async (done) => {
    await Type.destroy({
      where: {}
    })
    done()
  })

  describe('add()', () => {
    test('Should add a type', async () => {
      const sut = new TypeDbRepository()
      const typeModel = await sut.add(mockAddTypeParams())
      expect(typeModel).toBeTruthy()
      expect(typeModel.description).toEqual('ANY_DESCRIPTION')
    })
  })
  describe('loadByDescription()', () => {
    test('Should load a type by description', async () => {
      await Type.create({ description: 'any_description' })
      const sut = new TypeDbRepository()
      const typeModel = await sut.loadByDescription('any_description')
      expect(typeModel).toBeTruthy()
      expect(typeModel.description).toEqual('any_description')
    })
  })
})
