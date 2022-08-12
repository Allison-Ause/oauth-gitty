const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('github oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET should login or create User from github oauth callback', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'test_github_user',
      email: 'test@test.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  it('#DELETE should logout user by deleting cookie', async () => {
    const res = await request.agent(app).delete('/api/v1/github');
    expect(res.body.message).toBe('Successfully Logged Out!');
  });
  afterAll(() => {
    pool.end();
  });
});

// describe('posts routes', () => {
//   beforeEach(() => {
//     return setup(pool);
//   });

//   afterAll(() => {
//     pool.end();
//   });
// });
