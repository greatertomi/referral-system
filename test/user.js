/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = require('should');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('User API', () => {
  // GET ROUTE
  describe('GET /api/v1/auth/users', () => {
    it('It should GET all the tasks', (done) => {
      chai
        .request(server)
        .get('api/v1/auth/users')
        .end((err, res) => {
          console.log(res);
          should(res).should.have.status(200);
          // res.body.should.be.a('array');
          // res.body.length.should.be.eq(3);
          done();
        });
    });
  });
  // POST ROUTE

  // PUT ROUTE

  // DELETE ROUTE
});
