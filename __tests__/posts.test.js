const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');
const agent = request.agent(app);

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET allows authenticated user to view all posts', async () => {
    await agent.get('/api/v1/github/callback?code=42'); //.redirects(1);
    const res = await agent.get('/api/v1/posts');

    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      content: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
