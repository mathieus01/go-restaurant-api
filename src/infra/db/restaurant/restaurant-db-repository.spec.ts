import { mockAccountModel } from '@/domain/test/mock-account'
import Account from '@/infra/models/account-model'
import { RestaurantDbRepository } from './restaurant-db-repository'

describe('RestaurantDbRepository', () => {
  beforeEach(async (done) => {
    await Account.destroy({
      where: {}
    })
    done()
  })

  test('Should load all restaurants', async () => {
    const account = mockAccountModel()
    account.isRestaurant = true
    account.description = 'any_description'
    await Account.create(account)
    const sut = new RestaurantDbRepository()
    const restaurants = await sut.loadAll()
    expect(restaurants.length).toEqual(1)
    expect(restaurants[0].name).toEqual(account.name)
    expect(restaurants[0].description).toEqual(account.description)
    expect(restaurants[0].address).toEqual(account.address)
  })
})
