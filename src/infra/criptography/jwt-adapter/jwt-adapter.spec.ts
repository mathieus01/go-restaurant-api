import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    test('Should call jwt sign with correct value', async () => {
      const sut = new JwtAdapter('any_secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(1)
      expect(signSpy).toHaveBeenLastCalledWith({ id: 1 }, 'any_secret')
    })
    test('Should return a access token on success', async () => {
      const sut = new JwtAdapter('any_secret')
      const accessToken = await sut.encrypt(1)
      expect(accessToken).toEqual('any_token')
    })
    test('Should throw if jwt sign throws', async () => {
      const sut = new JwtAdapter('any_secret')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt(1)
      await expect(promise).rejects.toThrow()
    })
  })
})
