'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _record = require('./api/routes/record');

var _record2 = _interopRequireDefault(_record);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// application routes import

app.use((0, _expressValidator2.default)());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
// initialize database
var apiv = '/api/v1';
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(apiv + '/record', _record2.default);
app.get('/api/v1', function (req, res) {
    res.status(200).send('Hey this is the iReporter API version 1');
});
app.use('*', function (req, res) {
    return res.status(404).send({
        status: 404,
        error: 'This route does not exist. You may navigate to the home route at api/v1'
    });
});
app.use((0, _morgan2.default)('dev'));
exports.default = app;
//# sourceMappingURL=app.js.map