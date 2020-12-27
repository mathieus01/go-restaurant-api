import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Food from '@/infra/models/food-model'
import { FoodDbRepository } from './food-db-repository'

describe('Food Db Repository', () => {
  beforeEach(async (done) => {
    await Food.destroy({
      where: {}
    })
    done()
  })

  describe('add()', () => {
    test('Should add a food', async () => {
      const sut = new FoodDbRepository()
      const { food } = mockAddFoodParams()
      const foodId = await sut.add({ food })
      expect(foodId).toBeTruthy()
    })
  })

  describe('loadById()', () => {
    test('Should load a food by id', async () => {
      const { food } = mockAddFoodParams()
      const foodModelFake = await Food.create({ food })
      const sut = new FoodDbRepository()
      const foodModel = await sut.loadById(foodModelFake.id)
      expect(foodModel).toBeTruthy()
      expect(foodModelFake.id).toEqual(foodModel.id)
    })
  })
})
