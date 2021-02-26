/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

// This test the registration of users
// Please note: For user1 use details that are nurrently in the database
describe('AUTH ROUTES', () => {
  describe('POST /api/v1/auth/register', () => {
    const user1 = {
      name: 'Test',
      email: 'test@gmail.com',
      password: 'test'
    };

    const user2 = {
      ...user1,
      referralCode: 4099
    };

    it('It should register a user', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/register')
        .send(user1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(true);
          res.body.should.have.property('message');
          res.body.should.have.property('userCredit');
          res.body.should.have.property('token');
          done();
        });
    });

    it('It should return error on wrong referral code', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/register')
        .send(user2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(false);
          res.body.should.have.property('message');
          done();
        });
    });
  });

  // This test logging a user in
  // Please note in correctDetail, use a detail in the database
  describe('POST /api/v1/auth/login', () => {
    const correctDetail = {
      email: 'john@gmail.com',
      password: 'john'
    };

    const wrongDetail = {
      email: 'jiga@gmail.com',
      password: 'huska'
    };

    it('It should log a user in when the right credentials is received', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(correctDetail)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(true);
          res.body.should.have.property('message');
          res.body.should.have.property('token');
          done();
        });
    });

    it('It should NOT log a user in when the wrong credentials is received', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(wrongDetail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(false);
          res.body.should.have.property('message');
          done();
        });
    });
  });
});
