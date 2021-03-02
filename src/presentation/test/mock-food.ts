import { FoodModel } from '@/domain/models/food'
import { mockFoodModel } from '@/domain/test/mock-menu'
import { AddFood, AddFoodRequestParams } from '@/domain/usecases/menu/add-food'
import { LoadFoodById } from '@/domain/usecases/menu/load-food-by-id'
import { LoadFoodsByRestaurant } from '@/domain/usecases/menu/load-foods-by-restaurant'
import { RemoveFood } from '@/domain/usecases/menu/remove-food'

export const mockAddFood = (): AddFood => {
  class AddFoodStub implements AddFood {
    async add (addfoodParams: AddFoodRequestParams): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new AddFoodStub()
}

export const mockLoadFoodsByRestaurant = (): LoadFoodsByRestaurant => {
  class LoadFoodsByRestaurantStub implements LoadFoodsByRestaurant {
    async load (): Promise<FoodModel[]> {
      return Promise.resolve([mockFoodModel()])
    }
  }
  return new LoadFoodsByRestaurantStub()
}

export const mockRemoveFood = (): RemoveFood => {
  class RemoveFoodStub implements RemoveFood {
    async remove (foodId: number): Promise<void> {
    }
  }
  return new RemoveFoodStub()
}
export const mockLoadFoodById = (): LoadFoodById => {
  class LoadFoodByIdStub implements LoadFoodById {
    async loadById (foodId: number): Promise<FoodModel> {
      return Promise.resolve(mockFoodModel())
    }
  }
  return new LoadFoodByIdStub()
}
