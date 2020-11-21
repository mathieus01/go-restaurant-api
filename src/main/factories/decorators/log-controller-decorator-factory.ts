import { LogDbRepository } from '@/infra/db/log/log-db-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, new LogDbRepository())
}
