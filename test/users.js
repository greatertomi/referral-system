/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

// Test get all users route
describe('USERS ROUTES', () => {
  describe('GET /api/v1/users', () => {
    it('It should GET all the users', (done) => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.not.have.property('password');
          done();
        });
    });
  });

  // Test the GET (by Id) route
  // Please note that the Id specified here must be in the database
  describe('GET /api/v1/users/:id', () => {
    it('It should GET a user by id', (done) => {
      const id = 2;
      chai
        .request(server)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('userId');
          res.body.should.have.property('name');
          res.body.should.not.have.property('password');
          done();
        });
    });

    it('It should NOT GET a user when unknown ID is given', (done) => {
      const id = 10070;
      chai
        .request(server)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          done();
        });
    });
  });

  // This test creating a new referral code
  // Please use /api/v1/auth/login to generate an auth token for test
  describe('PUT /api/v1/users/referralCode', () => {
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE2MTQzMzg0NjEsImV4cCI6MTYxNDM1NjQ2MX0.wxA2akJkIhP4OI1Qg3lNRhAbI9O7u_-DXWiw2-2GJGQ';
    it('It should update the referral code of a user', (done) => {
      chai
        .request(server)
        .put('/api/v1/users/referralCode')
        .set('x-access-token', authToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(true);
          res.body.should.have.property('message');
          res.body.should.have.property('referralCode');
          done();
        });
    });
  });
});
