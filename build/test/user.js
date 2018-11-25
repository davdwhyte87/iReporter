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

describe('try testing framework', function () {
    it('It should return', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1').end(function (err, res) {
            res.should.have.status(200);
            done();
        });
    });
});
//# sourceMappingURL=user.js.map