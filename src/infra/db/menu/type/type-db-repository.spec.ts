import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Food from '@/infra/models/food-model'
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
    test('Should add a food', async () => {
      const { type, food } = mockAddFoodParams()
      const { flavor } = type
      const foodModel = await Food.create({ food })
      const sut = new TypeDbRepository()
      const typeId = await sut.add({ flavor, food_id: foodModel.id })
      expect(typeId).toBeTruthy()
    })
  })
})
