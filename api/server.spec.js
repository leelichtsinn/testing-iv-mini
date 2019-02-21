const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('the route handlers', () => {
  describe('get /', () => {
    it('responds with 200', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(200);
    });

    it('responds with json', async () => {
      const response = await request(server).get('/');

      expect(response.type).toMatch(/json/i);
    });

    it('send correct response object', async () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ api: 'up' });
    });
  });

  describe('get /hobbits', () => {
    it('responds with 200', async () => {
      const response = await request(server).get('/hobbits');

      expect(response.status).toBe(200);
    });

    it('responds with json', async () => {
      const response = await request(server).get('/hobbits');

      expect(response.type).toMatch(/json/i);
    });

    it('send correct response object', async () => {
      const response = await request(server).get('/hobbits');

      expect(response.body).toEqual([]);
    });
  });

  describe('post /hobbits', () => {

    afterEach(async () => {
      await db('hobbits').truncate();
    });

    it('responds with 201 when body is correct', async () => {
      const body = { name: 'bilbo' };
      const response = await request(server).post('/hobbits').send(body);

      expect(response.status).toBe(201);
    });

    it('responds with 400 when body is missing data', async () => {
      const body = {};
      const response = await request(server).post('/hobbits').send(body);

      expect(response.status).toBe(400);
    });

  });

});
