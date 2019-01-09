/* eslint-disable no-unused-vars */
/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
let ExampleRecordId = null;
let token = null;
let adminToken = null;
describe('Tests for records ', () => {
  it('should login a user', (done) => {
    const user = {
      email: 'johnmmko32@gmail.com',
      password: '12345',
    };
    chai.request(app).post('/api/v1/auth/login').send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        const [data] = res.body.data;
        ({ token } = data);
        done();
      });
  });
  it('should login an admin', (done) => {
    const admin = {
      email: 'adminIreporter@gmail.com',
      password: '12345',
    };
    chai.request(app).post('/api/v1/auth/login').send(admin)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        const [data] = res.body.data;
        adminToken = data.token;
        done();
      });
  });
  it('should create a red-flag record', (done) => {
    const record = {
      title: 'We need water in apata!',
      type: 'intervention ',
      comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
      created_by: 4,
      status: 'under-investigation',
    };
    chai.request(app).post('/api/v1/red-flags').send(record).set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        res.body.should.have.property('data');
        ExampleRecordId = res.body.data.id;
        done();
      });
  });
  it('should create an intervention record', (done) => {
    const record = {
      title: 'We need water in apata!',
      type: 'intervention ',
      comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
      created_by: 4,
      status: 'under-investigation',
    };
    chai.request(app).post('/api/v1/interventions').send(record).set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        res.body.should.have.property('data');
        ExampleRecordId = res.body.data[0].id;
        done();
      });
  });
  it('should not create a record if the title is too short', (done) => {
    const record = {
      title: 'We!',
      type: 'intervention ',
      comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
      created_by: 4,
      status: 'under-investigation',
    };
    chai.request(app).post('/api/v1/red-flags').send(record).set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('array');
        done();
      });
  });
  it('should not create a record if the user is not authorized to', (done) => {
    const record = {
      title: 'We need water in apata!',
      type: 'intervention ',
      comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
      created_by: 4,
      status: 'under-investigation',
    };
    chai.request(app).post('/api/v1/red-flags').send(record).set('token', token + 99292)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should get all the red-flag records in the database', (done) => {
    chai.request(app).get('/api/v1/red-flags').set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('should get all the records that belongs to a user', (done) => {
    chai.request(app).get('/api/v1/red-flags/me').set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('should not get all the red-flag records in the database', (done) => {
    chai.request(app).get('/api/v1/red-flags').set('token', token + 9090)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should get a single record', (done) => {
    chai.request(app).get('/api/v1/red-flags/' + ExampleRecordId).set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        done();
      });
  });
  it('should not get a single record if the user is un authorized', (done) => {
    chai.request(app).get('/api/v1/red-flags/' + ExampleRecordId).set('token', token + 9828)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not get a single record if it does not exists', (done) => {
    chai.request(app).get('/api/v1/red-flags/' + ExampleRecordId + 99302).set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('should update a record location', (done) => {
    const record = {
      title: 'Danie is actually buharri',
      location: '6.5764895 , 3.3880003999999997',
      status: 3,
    };
    chai.request(app).patch('/api/v1/red-flags/' + ExampleRecordId + '/location').send(record).set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should update a record image', (done) => {
    const record = {
      image: `
      data:image/jpeg;base64,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`,
    };
    chai.request(app).patch('/api/v1/red-flags/' + ExampleRecordId + '/addImage').send(record).set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should not update a record with unathorized user', (done) => {
    const record = {
      title: 'Danie is actually buharri',
      location: '6.5764895 , 3.3880003999999997',
      status: 3,
    };
    chai.request(app).patch('/api/v1/red-flags/' + ExampleRecordId + '/location').send(record).set('token', token + 98283)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not update a record with a wrong id', (done) => {
    const record = {
      title: 'Danie is actually buharri',
      location: '6.5764895 , 3.3880003999999997',
      status: 3,
    };
    chai.request(app).patch('/api/v1/red-flags/' + ExampleRecordId + 98989 + '/location').send(record).set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('should not update a record status without admin permission', (done) => {
    const update = { status: 'rejected' };
    chai.request(app).patch('/api/v1/red-flags/' + ExampleRecordId + '/status')
      .send(update)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        done();
      });
  });
  it('should delete a record', (done) => {
    chai.request(app).del('/api/v1/red-flags/' + ExampleRecordId).set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });
  it('should not delete a record with unauthorized user', (done) => {
    chai.request(app).del('/api/v1/red-flags/' + ExampleRecordId).set('token', token + 2999)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
