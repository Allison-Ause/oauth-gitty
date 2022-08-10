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
      .get('/api/v1/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'test_github_user',
      email: 'test@test.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
