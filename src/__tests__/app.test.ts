import supertest from 'supertest';

import app, { endpointOperatorMap } from '../app';

const operationKeys = Object.keys(endpointOperatorMap);

it.each(operationKeys)('requires the input for %s', async (operation) => {
  const response = await supertest(app).post(`/${operation}`);
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('"input" is required');
});

it.each(['test', true, 1, null])(
  'requires the input to be an array for input: %s',
  async (input) => {
    const response = await supertest(app).post(`/add`).send({ input });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('"input" must be an array');
  },
);

it('requires the array to contain numbers only', async () => {
  const response = await supertest(app)
    .post(`/add`)
    .send({ input: [1, 'test', 4] });
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('"input[1]" must be a number');
});

it('gives an error for empty input array', async () => {
  const response = await supertest(app).post(`/add`).send({ input: [] });
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('"input" does not contain 1 required value(s)');
});

it.each(operationKeys)('returns 404 for get method for endpoint %s', async () => {
  const response = await supertest(app).get(`/add`);
  expect(response.status).toBe(404);
});

it.each([
  ['add', [1, 2, 3], 6],
  ['subtract', [1, 2, 3], -4],
  ['multiply', [2, 2, 3], 12],
  ['divide', [100, 2, 5], 10],
])('calculates the numbers correctly', async (operation, input, expected) => {
  const response = await supertest(app).post(`/${operation}`).send({ input });
  expect(response.status).toBe(200);
  expect(response.body.sum).toBe(expected);
});
