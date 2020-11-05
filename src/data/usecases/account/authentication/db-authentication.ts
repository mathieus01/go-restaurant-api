import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async auth (authentication: AuthenticationParams): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
