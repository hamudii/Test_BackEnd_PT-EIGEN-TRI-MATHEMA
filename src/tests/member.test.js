const request = require('supertest');
const app = require('../../server'); // Adjust according to your path setup

describe('Member API', () => {
  it('should get all members', async () => {
    const res = await request(app).get('/members');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('length');
  });
});
