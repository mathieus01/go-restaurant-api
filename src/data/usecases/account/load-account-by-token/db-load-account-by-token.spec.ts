import { Decrypter } from '@/data/protocols/cryptography'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { mockDecrypter, mockLoadAccountByTokenRepository } from '@/data/test'
import { mockAccountModel, throwError } from '@/domain/test'
import { DbLoadAccountByToken } from './db-load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepository: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadAccountByTokenRepository = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepository)

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepository
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values ', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadAccountByToken('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.loadAccountByToken('any_token', 'any_role')
    expect(account).toBeNull()
  })
  test('Should call LoadAccountByTokenRepository with correct values ', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepository, 'loadByToken')
    await sut.loadAccountByToken('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut()
    jest.spyOn(loadAccountByTokenRepository, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.loadAccountByToken('any_token', 'any_role')
    expect(account).toBeNull()
  })
  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.loadAccountByToken('any_token', 'any_role')
    expect(account).toEqual(mockAccountModel())
  })
  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError)
    const promise = sut.loadAccountByToken('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepository } = makeSut()
    jest.spyOn(loadAccountByTokenRepository, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.loadAccountByToken('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
