export interface HttpRequest{
  headers?: any
  params?: any
  body?: any
  accountId?: number
}

export interface HttpResponse{
  statusCode: number
  body: any
}
