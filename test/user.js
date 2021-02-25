/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Assertion Style
chai.should();

chai.use(chaiHttp);

describe('User API', () => {
  // TEST GETTING ALL ROUTES
  describe('GET /api/v1/users', () => {
    it('It should GET all the users', (done) => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eq(3);
          done();
        });
    });

    it('It should NOT GET all the users', (done) => {
      chai
        .request(server)
        .get('/api/v1/user')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // Test the GET (by Id) route
  describe('GET /api/v1/users/:id', () => {
    it('It should GET a user by id', (done) => {
      const id = 1;
      chai
        .request(server)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('id').eq(1);
          res.body.should.have.property('name');
          res.body.should.have.property('old');
          done();
        });
    });

    it('It should NOT GET a user when unknown ID is given', (done) => {
      const id = 1070;
      chai
        .request(server)
        .get(`/api/v1/users/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eq('User does not not exist');
          done();
        });
    });
  });

  // POST ROUTE
  describe('POST /api/v1/users', () => {
    it('It should POST a new user', (done) => {
      const user = {
        name: 'Bulus',
        old: false
      };
      chai
        .request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eq('User created successfully');
          done();
        });
    });

    it('It should NOT POST a new user without a name', (done) => {
      const user = {
        old: false
      };
      chai
        .request(server)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Name of user not sent');
          done();
        });
    });
  });

  // PUT ROUTE
  describe('PUT /api/v1/users/:id', () => {
    it('It should PUT a user', (done) => {
      const taskId = 1;
      const user = {
        name: 'Bulus Marcus',
        old: false
      };
      chai
        .request(server)
        .put(`/api/v1/users/${taskId}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have
            .property('message')
            .eq('User updated successfully');
          done();
        });
    });
  });

  // DELETE ROUTE
});
