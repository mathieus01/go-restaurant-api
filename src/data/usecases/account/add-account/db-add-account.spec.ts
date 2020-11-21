import { Hasher } from '@/data/protocols/cryptography/hasher'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { mockHasher } from '@/data/test/mock-cryptography'
import { mockAddAccountRepository, mockLoadAccountByEmailRepository } from '@/data/test/mock-db-account'
import { mockAccountModel, mockAddAccountModel } from '@/domain/test/mock-account'
import { throwError } from '@/domain/test/test-helpers'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hasher: Hasher
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hasher = mockHasher()
  const sut = new DbAddAccount(addAccountRepositoryStub, loadAccountByEmailRepositoryStub, hasher)
  return {
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
    hasher
  }
}

describe('DbAddAccount', () => {
  test('Should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const addAccountParams = mockAddAccountModel()
    await sut.add(addAccountParams)
    expect(loadByEmailSpy).toHaveBeenLastCalledWith('any_email@mail.com')
  })
  test('Sut should return null if LoadAccountByEmailRepository found an account', async () => {
    const { sut } = makeSut()
    const addAccountParams = mockAddAccountModel()
    const account = await sut.add(addAccountParams)
    expect(account).toBeFalsy()
  })
  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountModel())
    await expect(promise).rejects.toThrow()
  })
  test('Should call Hasher with correct password', async () => {
    const { sut, hasher, loadAccountByEmailRepositoryStub } = makeSut()
    const addAccountParams = mockAddAccountModel()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const hashSpy = jest.spyOn(hasher, 'hash')
    await sut.add(addAccountParams)
    expect(hashSpy).toHaveBeenCalledWith(addAccountParams.password)
  })
  test('Should throw if Hasher throws', async () => {
    const { sut, hasher, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    jest.spyOn(hasher, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountModel())
    await expect(promise).rejects.toThrow()
  })
  test('Should call AddAccountRepository with correct value', async () => {
    const { sut, addAccountRepositoryStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountModel())
    expect(addSpy).toHaveBeenLastCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_hash'
    })
  })
  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountModel())
    await expect(promise).rejects.toThrow()
  })
  test('Should return an account on success', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.add(mockAddAccountModel())
    expect(account).toEqual(mockAccountModel())
  })
})
