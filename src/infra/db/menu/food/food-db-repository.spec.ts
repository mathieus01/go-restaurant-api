import { FoodDbRepository } from './food-db-repository'
import { mockAccountModel, mockAddFoodParams, mockAddTypeParams } from '@/domain/test'
import { Account, Food, Type } from '@/infra/models'

describe('Food Db Repository', () => {
  beforeEach(async (done) => {
    await Account.destroy({
      where: {}
    })
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
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const { name, description, price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const sut = new FoodDbRepository()
      const foodModel = await sut.add({ name, description, price, type: typeModel, restaurantId: accountModel.id })
      expect(foodModel).toBeTruthy()
    })
  })

  describe('loadById()', () => {
    test('Should load a food by id', async () => {
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const { name, description, price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const foodModelFake = await Food.create({ name, description, price, type_id: typeModel.id, account_id: accountModel.id })
      const sut = new FoodDbRepository()
      const foodModel = await sut.loadById(foodModelFake.id)
      expect(foodModel).toBeTruthy()
      expect(foodModelFake.id).toEqual(foodModel.id)
    })
  })

  describe('loadByRestaurant()', () => {
    test('Should load all foods', async () => {
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const { price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      await Food.create({ name: 'any_food1', description: 'any_description', price, type_id: typeModel.id, account_id: accountModel.id })
      await Food.create({ name: 'any_food2', description: 'any_description', price, type_id: typeModel.id, account_id: accountModel.id })
      const sut = new FoodDbRepository()
      const foods = await sut.loadByRestaurant(accountModel.id)
      expect(foods).toBeTruthy()
      expect(foods.length).toEqual(2)
      expect(foods[0].name).toEqual('any_food1')
      expect(foods[1].name).toEqual('any_food2')
    })
  })

  describe('remove()', () => {
    test('Should remove food by id', async () => {
      const account = mockAccountModel()
      account.isRestaurant = true
      account.description = 'any_description'
      const accountModel = await Account.create(account)
      const { description, price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const foodModel = await Food.create({ name: 'any_food1', description, price, type_id: typeModel.id, account_id: accountModel.id })
      const sut = new FoodDbRepository()
      await sut.remove(foodModel.id)
      const foodRemoved = await sut.loadById(foodModel.id)
      expect(foodRemoved).toBeFalsy()
    })
  })
})
