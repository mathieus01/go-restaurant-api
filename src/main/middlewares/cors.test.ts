import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  afterAll(async done => {
    done()
  })

  beforeEach(async (done) => {
    done()
  })
  test('Should enable CORS', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
