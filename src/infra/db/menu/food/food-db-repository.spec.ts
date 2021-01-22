import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Food from '@/infra/models/food-model'
import Size from '@/infra/models/size-model'
import Type from '@/infra/models/type-model'
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

  describe('loadFoodByFoodTypeAndSizeIds()', () => {
    test('Should load a food by food, type and size ids', async () => {
      const food1 = await Food.create({ food: 'any_food1' })
      const food2 = await Food.create({ food: 'any_food2' })
      const type1 = await Type.create({ flavor: 'any_flavor1', food_id: food1.id })
      const type2 = await Type.create({ flavor: 'any_flavor2', food_id: food2.id })
      await Size.create({ size: 'any_size1', price: 70, type_id: type1.id })
      const size2 = await Size.create({ size: 'any_size2', price: 80, type_id: type2.id })
      const sut = new FoodDbRepository()
      const food = await sut.loadFoodByFoodTypeAndSizeIds(size2.id)
      expect(food).toBeTruthy()
      expect(food.food).toEqual(food2.food)
      expect(food.id).toEqual(food2.id)
    })
  })

  describe('loadAllFoods()', () => {
    test('Should load all foods', async () => {
      await Food.create({ food: 'any_food1' })
      await Food.create({ food: 'any_food2' })
      const sut = new FoodDbRepository()
      const foods = await sut.loadAllFoods()
      expect(foods).toBeTruthy()
      expect(foods.length).toEqual(2)
      expect(foods[0].food).toEqual('any_food1')
      expect(foods[1].food).toEqual('any_food2')
    })
  })
})
