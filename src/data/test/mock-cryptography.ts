import { Encrypter } from '../protocols/cryptography/encrypter'
import { Hasher } from '../protocols/cryptography/hasher'
import { HashComparer } from '../protocols/cryptography/hasher-compare'

export const mockHashCompare = (): HashComparer => {
  class HashCompareStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashCompareStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: number): Promise<string> {
      return Promise.resolve('any_token')
    }
  }
  return new EncrypterStub()
}

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('any_hash')
    }
  }
  return new HasherStub()
}
