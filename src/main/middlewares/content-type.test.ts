import request from 'supertest'
import app from '../config/app'

describe('Content-Type middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/)
  })

  test('should return xml when forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
