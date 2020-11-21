import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import Knex from 'knex'
import { DbHelper } from '../helpers/db-helper'

export class LogDbRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const db: Knex = DbHelper.getConnection()
    await db('logs').insert({
      stack,
      date: new Date()
    })
  }
}
