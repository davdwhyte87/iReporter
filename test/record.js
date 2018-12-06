/* eslint-env mocha */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should=chai.should();
let ExampleRecordId=null;
let token=null;

describe('Tests for records ', () => {
    before((done) => {
        const user = {
            email: 'johnmmko32@gmail.com',
            password: '12345',
        };
        chai.request(app).post('/api/v1/auth/login').send(user)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            token=res.body.data[0].token;
            done();
        });
    });
    it('should create a red-flag record', (done) => {
        const record={
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).post('/api/v1/red-flag').send(record).set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('title');
            ExampleRecordId=res.body.data.id;
            done();
        });
    });
    it('should create an intervention record', (done) => {
        const record={
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).post('/api/v1/intervention').send(record).set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('title');
            ExampleRecordId=res.body.data.id;
            done();
        });
    });
    it('should not create a record if the title is too short', (done) => {
        const record={
            title: 'We!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).post('/api/v1/red-flag').send(record).set('token', token)
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.a('array');
            done();
        });
    });
    it('should not create a record if the user is not authorized to', (done) => {
        const record={
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).post('/api/v1/red-flag').send(record).set('token', token+99292)
        .end((err, res) => {
            res.should.have.status(401);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
    it('should get all the red-flag records in the database', (done) => {
        chai.request(app).get('/api/v1/red-flag').set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            done();
        });
    });

    it('should not get all the red-flag records in the database', (done) => {
        chai.request(app).get('/api/v1/red-flag').set('token', token+9090)
        .end((err, res) => {
            res.should.have.status(401);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
    it('should get a single record', (done) => {
        chai.request(app).get('/api/v1/red-flag/'+ExampleRecordId).set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            done();
        });
    });
    it('should not get a single record if the user is un authorized', (done) => {
        chai.request(app).get('/api/v1/red-flag/'+ExampleRecordId).set('token', token+9828)
        .end((err, res) => {
            res.should.have.status(401);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
    it('should not get a single record if it does not exists', (done) => {
        chai.request(app).get('/api/v1/red-flag/'+ExampleRecordId+99302).set('token', token)
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should update a record', (done) => {
        const record={
            title: 'Danie is actually buharri',
            location: '172.39 293.289',
            status: 3,
        };
        chai.request(app).patch('/api/v1/red-flag/'+ExampleRecordId).send(record).set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });

    it('should not update a record with unathorized user', (done) => {
        const record={
            title: 'Danie is actually buharri',
            location: '172.39 293.289',
            status: 3,
        };
        chai.request(app).patch('/api/v1/red-flag/'+ExampleRecordId).send(record).set('token', token+98283)
        .end((err, res) => {
            res.should.have.status(401);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
    it('should not update a record with a wrong id', (done) => {
        const record={
            title: 'Danie is actually buharri',
            location: '172.39 293.289',
            status: 3,
        };
        chai.request(app).patch('/api/v1/red-flag/'+ExampleRecordId+98989).send(record).set('token', token)
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
    it('should delete a record', (done) => {
        chai.request(app).del('/api/v1/red-flag/'+ExampleRecordId).set('token', token)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });
    it('should not delete a record with unauthorized user', (done) => {
        chai.request(app).del('/api/v1/red-flag/'+ExampleRecordId).set('token', token+2999)
        .end((err, res) => {
            res.should.have.status(401);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
});
