/* eslint-disable no-unused-vars */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();

describe('Tests for authentication', () => {
  it('should sign a user up', (done) => {
    const user = {
      firstname: 'John',
      email: 'johnmmko32@gmail.com',
      lastname: 'solomon',
      othernames: 'Lee',
      username: 'johnr45',
      phone: '0902939930',
      password: '12345',
    };
    chai.request(app).post('/api/v1/auth/signup').send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should not sign a user up with wrong data', (done) => {
    const user = {
      firstname: 'Jom',
      email: 'johnko32sk@gmail',
      lastname: 'solomon',
      phone: '0902939930',
    };
    chai.request(app).post('/api/v1/auth/signup').send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should log a user in', (done) => {
    const user = {
      email: 'johnmmko32@gmail.com',
      password: '12345',
    };
    chai.request(app).post('/api/v1/auth/login').send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should not log a user in with wrong email', (done) => {
    const user = {
      email: 'johnmmko328999@gmail.com',
      password: '12345',
    };
    chai.request(app).post('/api/v1/auth/login').send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not log a user in with wrong password', (done) => {
    const user = {
      email: 'johnmmko32@gmail.com',
      password: '12345jsnjns',
    };
    chai.request(app).post('/api/v1/auth/login').send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
