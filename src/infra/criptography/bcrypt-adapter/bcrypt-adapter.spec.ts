import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

describe('Bcrypt Adapter', () => {
  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = new BcryptAdapter()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenLastCalledWith('any_value', 'any_hash')
    })
    test('should return true when compare succeeds', async () => {
      const sut = new BcryptAdapter()
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(true)
    })
    test('should return false when compare succeeds', async () => {
      const sut = new BcryptAdapter()
      jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.resolve(false))
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBe(false)
    })
  })
})
