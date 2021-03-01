import { LoadRestaurantsRepository } from '@/data/protocols/db/restaurant/load-restaurants-repository'
import { AccountModel } from '@/domain/models/account'
import { RestaurantModel } from '@/domain/models/restaurant'
import Account from '@/infra/models/account-model'

export class RestaurantDbRepository implements LoadRestaurantsRepository {
  async loadAll (): Promise<RestaurantModel[]> {
    const accounts = await Account.findAll({
      where: {
        isRestaurant: true
      }
    })
    return this.accountsToRestaurants(accounts)
  }

  private accountToRestaurant (account: AccountModel): RestaurantModel {
    return {
      id: account.id,
      name: account.name,
      address: account.address,
      description: account.description
    }
  }

  private accountsToRestaurants (accounts: AccountModel[]): RestaurantModel[] {
    return accounts.map(account => this.accountToRestaurant(account))
  }
}
