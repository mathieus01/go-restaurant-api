import { FoodModel } from '@/domain/models'

export interface LoadFoodsByRestaurantRepository {
  loadByRestaurant(restaurantId: number): Promise<FoodModel[]>
}
