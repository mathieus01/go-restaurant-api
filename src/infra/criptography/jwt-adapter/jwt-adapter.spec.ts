import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  },

  async verify (): Promise<string> {
    return Promise.resolve('any_value')
  }
}))

const makeSut = (): JwtAdapter => (
  new JwtAdapter('any_secret')
)

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    test('Should call jwt sign with correct value', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(1)
      expect(signSpy).toHaveBeenLastCalledWith({ id: 1 }, 'any_secret')
    })
    test('Should return a access token on success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt(1)
      expect(accessToken).toEqual('any_token')
    })
    test('Should throw if jwt sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt(1)
      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenLastCalledWith('any_token', 'any_secret')
    })
    test('Should a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('any_token')
      expect(value).toBe('any_value')
    })
    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.decrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
