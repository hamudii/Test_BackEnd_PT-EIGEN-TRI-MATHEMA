const request = require('supertest');
const app = require('../../server'); // Adjust according to your path setup

describe('Book API', () => {
  it('should get all books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('length');
  });
});
