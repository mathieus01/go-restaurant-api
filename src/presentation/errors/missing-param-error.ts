export class MissingParamError extends Error {
  constructor (paramError: string) {
    super(`Missing Param: ${paramError}`)
    this.name = 'MissingParamError'
  }
}
