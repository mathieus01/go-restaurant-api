export interface RemoveFoodRepository {
  remove(foodId: number): Promise<void>
}
