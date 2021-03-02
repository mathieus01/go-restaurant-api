import app from '@/main/config/app'
import { mockAddFoodParams, mockAddFoodRequestParams, mockAddTypeParams } from '@/domain/test'
import { Account, Food, Type } from '@/infra/models'
import request from 'supertest'

describe('Login Route', () => {
  afterAll(async done => {
    done()
  })

  beforeEach(async (done) => {
    await Food.destroy({
      where: {}
    })
    await Account.destroy({
      where: {}
    })
    done()
  })

  describe('POST /restaurants/:restaurantId/menu', () => {
    test('Should return 200 on add Food', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })
      await request(app)
        .post(`/api/restaurants/${id}/menu`)
        .send(mockAddFoodRequestParams())
        .expect(200)
    })
  })

  describe('GET /restaurants/:restaurantId/menu', () => {
    test('Should return 200 on get list of FOOD', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })

      const { price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      await Food.create({ food: 'any_food1', price, type_id: typeModel.id, account_id: id })
      await Food.create({ food: 'any_food2', price, type_id: typeModel.id, account_id: id })
      await Food.create({ food: 'any_food3', price, type_id: typeModel.id, account_id: id })

      await request(app)
        .get(`/api/restaurants/${id}/menu`)
        .expect(200)
    })
  })
  describe('DELETE /menu', () => {
    test('Should return 204 on remove a FOOD', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })
      const { price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const food = await Food.create({ food: 'any_food1', price, type_id: typeModel.id, account_id: id })

      await request(app)
        .delete(`/api/menu/${food.id}`)
        .expect(204)
    })
  })
  describe('GET /menu', () => {
    test('Should return 200 on get a food by id', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })

      const { price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const food = await Food.create({ food: 'any_food1', price, type_id: typeModel.id, account_id: id })

      await request(app)
        .get(`/api/menu/${food.id}`)
        .expect(200)
    })
  })
})
