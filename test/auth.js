/* eslint-disable no-unused-vars */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
let token = null;
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
        res.should.have.status(201);
        res.should.be.a('object');
        res.body.should.have.property('data');
        const [data] = res.body.data;
        ({ token } = data);
        done();
      });
  });
  it('should update a user data', (done) => {
    const user = {
      firstname: 'John',
      email: 'johnmmko32@gmail.com',
      lastname: 'solomon',
      othernames: 'Lee',
      username: 'johnr00',
      phone: '0902939930',
      password: '12345',
    };
    chai.request(app).patch('/api/v1/auth/me').send(user).set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should sign the admin up', (done) => {
    const admin = {
      firstname: 'iRepoterMan',
      email: 'adminIreporter@gmail.com',
      lastname: 'solomon',
      othernames: 'KL',
      username: 'adminMan',
      phone: '0902939930',
      password: '12345',
    };
    chai.request(app).post('/api/v1/auth/signup').send(admin)
      .end((err, res) => {
        res.should.have.status(201);
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
