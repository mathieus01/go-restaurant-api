import { LogErrorRepository } from '@/data/protocols/db'
import { Log } from '@/infra/models'

export class LogDbRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    await Log.create({ stack, date: new Date() })
  }
}
