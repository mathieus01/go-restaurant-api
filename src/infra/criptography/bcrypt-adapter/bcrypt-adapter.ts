import { HashComparer } from '@/data/protocols/cryptography/hasher-compare'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
