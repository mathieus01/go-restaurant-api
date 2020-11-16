export interface LogErrorRepository {
  logError(stack: Error): Promise<void>
}
