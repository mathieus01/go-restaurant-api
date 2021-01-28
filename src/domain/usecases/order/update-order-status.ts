export interface UpdateOrderStatus {
  updateOrderStatus(orderId: number, status: string): Promise<void>
}
