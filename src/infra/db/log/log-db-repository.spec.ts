import { Log } from '@/infra/models'
import { LogDbRepository } from './log-db-repository'

describe('LogDbRepository', () => {
  beforeEach(async (done) => {
    await Log.destroy({
      where: {}
    })
    done()
  })

  describe('logError()', () => {
    test('Should create an error log on success ', async () => {
      const sut = new LogDbRepository()
      await sut.logError('any_stack')
      const logs = await Log.findAll()
      expect(logs).toBeTruthy()
      expect(logs.length).toEqual(1)
    })
  })
})
