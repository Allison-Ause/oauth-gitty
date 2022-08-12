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
    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.get('/api/v1/posts');

    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      content: expect.any(String),
      user_id: expect.any(String),
    });
  });
  it('#POST allows authenticated users to create posts linked to their id', async () => {
    const testPost = {
      title: 'Wild Geese',
      content:
        'Whoever you are, no matter how lonely, the world offers itself to your imagination.',
    };

    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.post('/api/v1/posts').send(testPost);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Wild Geese',
      content:
        'Whoever you are, no matter how lonely, the world offers itself to your imagination.',
      user_id: expect.any(String),
    });
    expect(res.body.user_id).toBe('3');
  });
  afterAll(() => {
    pool.end();
  });
});
