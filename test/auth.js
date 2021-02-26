/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('AUTH ROUTE', () => {
  describe('POST /api/v1/auth/register', () => {
    const user1 = {
      name: 'Broadland Mob',
      email: 'broadland1@gmail.com',
      password: 'broadland1'
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
          res.body.should.have.property('referralCode');
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
});
