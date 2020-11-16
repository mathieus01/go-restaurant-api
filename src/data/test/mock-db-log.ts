import { LogErrorRepository } from '../protocols/db/log/log-error-repository'

export const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryrStub implements LogErrorRepository {
    async logError (stack: Error): Promise<void> {
      return Promise.resolve()
    }
  }
  return new LogErrorRepositoryrStub()
}
