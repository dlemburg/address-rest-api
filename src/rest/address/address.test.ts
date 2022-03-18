import request from 'supertest';
import { startServer } from '../../server';

let app;

beforeAll(async () => {
  app = await startServer();
});

afterAll((done) => {
  done();
});

describe('[cache.test.ts] suite', () => {
  test('GET /addresses should return the cached values', async () => {
    const result = await request(app).get(`/addresses`).expect(200);

    expect(result.body.data.length).toBe(8);
  });

  test('GET /addresses/:addr should return a found value', async () => {
    const search = '500 S State St';
    const result = await request(app).get(`/addresses/${search}`).expect(200);

    expect(result.body.data.line1).toBe(search);
  });

  test('GET /addresses/:addr should not return a found value if exact match not found', async () => {
    const search = '500 S State St.';
    const result = await request(app).get(`/addresses/${search}`).expect(200);

    expect(result.body.data).toBe(undefined);
  });

  test('POST /addresses should create a new address record', async () => {
    const result = await request(app)
      .post(`/addresses`)
      .send({
        line1: 'zzzzzz street',
        city: 'Modesto',
        state: 'CA',
        zip: '33339',
      })
      .expect(200);

    expect(result.body.data.length).toBe(9);
  });

  test('DELETE /addresses should delete specified record', async () => {
    const addr = '1600 Holloway Ave Suite 10 San Francisco CA 94132';
    const result = await request(app).delete(`/addresses/${addr}`).expect(200);

    expect(result.body.data).toBe(1);
  });
});
