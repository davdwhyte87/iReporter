'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var should = _chai2.default.should();
var ExampleRecordId = null;

describe('Tests for records ', function () {
    it('should create a record', function (done) {
        var record = {
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation'
        };
        _chai2.default.request(_app2.default).post('/api/v1/record').send(record).end(function (err, res) {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('title');
            ExampleRecordId = res.body.data.id;
            done();
        });
    });
    it('should not create a record if the data is missing', function (done) {
        var record = {
            title: 'We need water in apata!',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            status: 'under-investigation'
        };
        _chai2.default.request(_app2.default).post('/api/v1/record').send(record).end(function (err, res) {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.a('array');
            done();
        });
    });
    it('should not create a record if the title is too short', function (done) {
        var record = {
            title: 'We!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation'
        };
        _chai2.default.request(_app2.default).post('/api/v1/record').send(record).end(function (err, res) {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.be.a('array');
            done();
        });
    });

    it('should get all the records in the database', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/record').end(function (err, res) {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            done();
        });
    });

    it('should get a single record', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/record/' + ExampleRecordId).end(function (err, res) {
            res.should.have.status(200);
            res.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            done();
        });
    });
    it('should not get a single record if it does not exists', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/record/' + ExampleRecordId + 99302).end(function (err, res) {
            res.should.have.status(404);
            res.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
    // testing update functionalty
    it('should update a record', function (done) {
        var record = {
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation'
        };
        _chai2.default.request(_app2.default).patch('/api/v1/record/' + ExampleRecordId).send(record).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });

    it('should not update a record if the id is wrong', function (done) {
        var record = {
            title: 'We need water in apata!',
            type: 'intervention ',
            comment: 'tsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad ktsgshh sjhkaj hkaj hkah ka hdkja sdhkja dhkja dhka dhkaj jkadjad k',
            created_by: 4,
            status: 'under-investigation'
        };
        _chai2.default.request(_app2.default).patch('/api/v1/record/' + ExampleRecordId + 9322).send(record).end(function (err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });

    it('should update a record (just title and status and add location', function (done) {
        var record = {
            title: 'We need water in apata!',
            location: '172.39, 293.289',
            status: 'under-investigation'
        };
        _chai2.default.request(_app2.default).patch('/api/v1/record/' + ExampleRecordId).send(record).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });
    // tests for deleting record
    it('should delete a record', function (done) {
        _chai2.default.request(_app2.default).del('/api/v1/record/' + ExampleRecordId).end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
        });
    });

    it('should not delete a record if the id is wrong', function (done) {
        _chai2.default.request(_app2.default).del('/api/v1/record/' + ExampleRecordId + 93838).end(function (err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
        });
    });
});
//# sourceMappingURL=record.js.map