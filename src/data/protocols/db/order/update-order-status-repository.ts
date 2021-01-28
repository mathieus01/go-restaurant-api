export interface UpdateOrderStatusRepository {
  updateOrderStatus(orderId: number, status: string): Promise<void>
}
