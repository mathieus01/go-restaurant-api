import { FoodModel } from '@/domain/models/food'

export interface LoadFoodsByRestaurant {
  load(restaurantId: number): Promise<FoodModel[]>
}
