const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/orders/', () => {

    beforeEach(() => {
      return Order.create();
    });

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
        });
    });

    it('GET /api/orders/:id', () => {
      return request(app)
        .get('/api/orders/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.equal(1);
        });
    });



    it('POST /api/orders/', () => {
      return request(app)
        .post('/api/orders')
        .send({})
        .then(function(res) {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.equal(2);
        });
    });

    // it('PUT /api/orders/:orderId', () => {
    //   return request(app)
    //     .put('/api/orders/1')
    //     .send({ description: 'new description' })
    //     .then(function(res) {
    //       expect(res.statusCode).to.be.equal(201);
    //       expect(res.body[0].description).to.be.equal('new description');
    //       return Order.findById(1);
    //     })
    //     .then(function(res) {
    //       expect(res.name).to.be.equal('Test Order');
    //       expect(res.description).to.be.equal('new description');
    //     });
    // });

    // it('DELETE /api/orders/:orderId', () => {
    //   return request(app)
    //     .put('/api/orders/1')
    //     .send({ description: 'new description' })
    //     .then(function(res) {
    //       expect(res.statusCode).to.be.equal(201);
    //       expect(res.body[0].description).to.be.equal('new description');
    //       return Order.findById(1);
    //     })
    //     .then(function(res) {
    //       expect(res.name).to.be.equal('Test Order');
    //       expect(res.description).to.be.equal('new description');
    //     });
    // });
  }); // end describe('/api/orders')
});