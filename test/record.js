import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const should=chai.should();
let ExampleRecordId=null;

describe('Tests for records ', () => {
    it('should create a record', (done) => {
        let record={
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).post('/api/v1/record').send(record)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('title');
            ExampleRecordId=res.body.data.id;
            done();
        });
    });
    it('should not create a record if the data is missing', (done) => {
        let record={
            title: 'We need water in apata!',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            status: 'under-investigation',
        };
        chai.request(app).post('/api/v1/record').send(record)
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.a('array');
            done();
        });
    });
    it('should not create a record if the title is too short', (done) => {
        let record={
            title: 'We!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).post('/api/v1/record').send(record)
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.a('array');
            done();
        });
    });

    it('should get all the records in the database', (done) => {
        chai.request(app).get('/api/v1/record')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            done();
        });
    });

    it('should get a single record', (done) => {
        chai.request(app).get('/api/v1/record/'+ExampleRecordId)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            done();
        });
    });
    it('should not get a single record if it does not exists', (done) => {
        chai.request(app).get('/api/v1/record/'+ExampleRecordId+99302)
        .end((err, res) => {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
    // testing update functionalty
    it('should update a record', (done) => {
        let record={
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).patch('/api/v1/record/'+ExampleRecordId).send(record)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });

    it('should not update a record if the id is wrong', (done) => {
        let record={
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation',
        };
        chai.request(app).patch('/api/v1/record/'+ExampleRecordId+9322).send(record)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should update a record (just title and status and add location', (done) => {
        let record={
            title: 'We need water in apata!',
            location: '172.39, 293.289',
            status: 'under-investigation',
        };
        chai.request(app).patch('/api/v1/record/'+ExampleRecordId).send(record)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });
    // tests for deleting record
    it('should delete a record', (done) => {
        chai.request(app).del('/api/v1/record/'+ExampleRecordId)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });

    it('should not delete a record if the id is wrong', (done) => {
        chai.request(app).del('/api/v1/record/'+ExampleRecordId+93838)
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
});
