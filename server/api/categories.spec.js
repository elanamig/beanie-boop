/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Category = db.model('category');

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/categories/', () => {
    const name = 'Test Category';

    beforeEach(() => {
      return Category.create({
        name,
      });
    });

    it('GET /api/categories', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal(name);
        });
    });

    it('GET /api/categories/:categoryId', () => {
      return request(app)
        .get('/api/categories/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.be.equal(name);
        });
    });
  }); // end describe('/api/categories')
}); // end describe('Category routes')