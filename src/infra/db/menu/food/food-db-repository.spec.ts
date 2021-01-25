import { mockAddFoodParams, mockAddTypeParams } from '@/domain/test/mock-menu'
import Food from '@/infra/models/food-model'
import Type from '@/infra/models/type-model'
import { FoodDbRepository } from './food-db-repository'

describe('Food Db Repository', () => {
  beforeEach(async (done) => {
    await Food.destroy({
      where: {}
    })
    await Type.destroy({
      where: {}
    })
    done()
  })

  describe('add()', () => {
    test('Should add a food', async () => {
      const { food, price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const sut = new FoodDbRepository()
      const foodModel = await sut.add({ food, price, type: typeModel })
      expect(foodModel).toBeTruthy()
    })
  })

  describe('loadById()', () => {
    test('Should load a food by id', async () => {
      const { food, price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const foodModelFake = await Food.create({ food, price, type_id: typeModel.id })
      const sut = new FoodDbRepository()
      const foodModel = await sut.loadById(foodModelFake.id)
      expect(foodModel).toBeTruthy()
      expect(foodModelFake.id).toEqual(foodModel.id)
    })
  })

  describe('loadAllFoods()', () => {
    test('Should load all foods', async () => {
      const { price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      await Food.create({ food: 'any_food1', price, type_id: typeModel.id })
      await Food.create({ food: 'any_food2', price, type_id: typeModel.id })
      const sut = new FoodDbRepository()
      const foods = await sut.loadAllFoods()
      expect(foods).toBeTruthy()
      expect(foods.length).toEqual(2)
      expect(foods[0].food).toEqual('any_food1')
      expect(foods[1].food).toEqual('any_food2')
    })
  })
})
