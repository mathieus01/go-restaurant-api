import app from '@/main/config/app'
import { mockAddFoodParams, mockAddTypeParams, mockAddAccountModel, mockAddOrderParams } from '@/domain/test'
import { Account, Food, Order, Type } from '@/infra/models'
import MockDate from 'mockdate'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

const makeAccessToken = async (): Promise<string> => {
  const { id } = await Account.create({
    name: 'any_name_token',
    email: 'any_email_token@mail.com',
    password: 'any_password_token',
    isRestaurant: false
  })

  const token = sign({ id }, env.jwtSecret)
  await Account.update({ token }, { where: { id } })
  return token
}

describe('Order Route', () => {
  afterAll(async done => {
    MockDate.reset()
    done()
  })

  beforeEach(async (done) => {
    MockDate.set(new Date())
    await Food.destroy({
      where: {}
    })
    done()
  })

  describe('POST /orders', () => {
    test('should add a order ', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })
      const { name, description, price } = mockAddFoodParams()
      const typeModel = await Type.create(mockAddTypeParams())
      const account = await Account.create(mockAddAccountModel())
      const foodModel = await Food.create({ name, description, price, type_id: typeModel.id, account_id: id })

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
        .set('x-access-token', await makeAccessToken())
        .send(httpRequest)
        .expect(200)
    })
  })

  describe('GET /orders/user/:userId', () => {
    test('should return a list of orders by user', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ name: 'any_food1', description: 'any_description', price: 30, type_id: typeModel.id, account_id: id })
      const account = await Account.create(mockAddAccountModel())
      const { address, observation, date } = mockAddOrderParams()
      await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })
      await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })

      await request(app)
        .post(`/api/orders/users/${account.id}`)
        .set('x-access-token', await makeAccessToken())
        .expect(200)
    })
  })
  describe('PUT /orders/:orderId/status', () => {
    test('should return a list of orders by user', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ name: 'any_food1', description: 'any_description', price: 30, type_id: typeModel.id, account_id: id })
      const account = await Account.create(mockAddAccountModel())
      const { address, observation, date } = mockAddOrderParams()
      const order = await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })

      await request(app)
        .put(`/api/orders/${order.id}/status`)
        .set('x-access-token', await makeAccessToken())
        .send({
          status: 'CONCLUIDO'
        })
        .expect(204)
    })
  })
  describe('GET /orders/:orderId', () => {
    test('should return a order by id', async () => {
      const { id } = await Account.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        isRestaurant: true
      })
      const typeModel = await Type.create({ description: 'any_description' })
      const foodModel = await Food.create({ name: 'any_food1', description: 'any_description', price: 30, type_id: typeModel.id, account_id: id })
      const account = await Account.create(mockAddAccountModel())
      const { address, observation, date } = mockAddOrderParams()
      const order = await Order.create({ status: 'RECEBIDO', address, observation, date, account_id: account.id, food_id: foodModel.id })

      await request(app)
        .get(`/api/orders/${order.id}`)
        .set('x-access-token', await makeAccessToken())
        .expect(200)
    })
  })
})
