import { mockAddFoodParams } from '@/domain/test/mock-menu'
import Food from '@/infra/models/food-model'
import Size from '@/infra/models/size-model'
import Type from '@/infra/models/type-model'
import { SizeDbRepository } from './size-db-repository'

describe('Size Db Repository', () => {
  beforeEach(async (done) => {
    await Size.destroy({
      where: {}
    })
    done()
  })

  describe('add()', () => {
    test('Should add a size', async () => {
      const { type, food } = mockAddFoodParams()
      const { sizes, flavor } = type
      const { size } = sizes[0]
      const foodModel = await Food.create({ food })
      const typeModel = await Type.create({ flavor, food_id: foodModel.id })
      const sut = new SizeDbRepository()
      const sizeId = await sut.add({ size, price: 70.00, type_id: typeModel.id })
      expect(sizeId).toBeTruthy()
    })
  })
})
