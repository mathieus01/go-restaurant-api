import { LoadRestaurantsRepository } from '@/data/protocols/db'
import { AccountModel, RestaurantModel } from '@/domain/models'
import { Account } from '@/infra/models'

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
