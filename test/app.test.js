const { describe, it } = require('node:test');
const request = require('supertest');

const app = require('../src/app');

describe('app', () => {
  it('responds with a not found message', () => {
    return request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});

describe('GET /', () => {
  it('responds with a json message', () => {
    return request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
      });
  });
});
