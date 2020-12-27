import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import Log from '@/infra/models/log-model'

export class LogDbRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    await Log.create({ stack, date: new Date() })
  }
}
