import app from '@/main/config/app'
import { mockAddFoodParams, mockAddTypeParams, mockAddAccountModel, mockAddOrderParams } from '@/domain/test'
import { Account, Food, Order, Type } from '@/infra/models'
import request from 'supertest'

describe('Order Route', () => {
  afterAll(async done => {
    done()
  })

  beforeEach(async (done) => {
    await Food.destroy({
      where: {}
    })
    done()
  })

  describe('POST /orders', () => {
    test('should add a order ', async () => {
      const { food, price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const foodModel = await Food.create({ food, price, type_id: typeModel.id })
      const account = await Account.create(mockAddAccountModel())

      const httpRequest = {
        food_id: foodModel.id,
        observation: 'any_observation',
        date: new Date(),
        address: 'any_address',
        account_id: account.id,
        status: 'INICIAL'
      }

      await request(app)
        .post('/api/orders')
        .send(httpRequest)
        .expect(200)
    })
  })

  describe('GET /orders/user/:userId', () => {
    test('should return a list of orders by user', async () => {
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ food: 'any_food1', price: 30, type_id: typeModel.id })
      const account = await Account.create(mockAddAccountModel())
      const { address, observation, date } = mockAddOrderParams()
      await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })
      await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })

      await request(app)
        .post(`/api/orders/users/${account.id}`)
        .expect(200)
    })
  })
  describe('PUT /orders/:orderId/status', () => {
    test('should return a list of orders by user', async () => {
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ food: 'any_food1', price: 30, type_id: typeModel.id })
      const account = await Account.create(mockAddAccountModel())
      const { address, observation, date } = mockAddOrderParams()
      const order = await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })

      await request(app)
        .put(`/api/orders/${order.id}/status`)
        .send({
          status: 'CONCLUIDO'
        })
        .expect(204)
    })
  })
})
