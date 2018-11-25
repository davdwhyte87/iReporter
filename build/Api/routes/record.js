'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _record = require('../controllers/record');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordRouter = _express2.default.Router();

RecordRouter.post('/', (0, _record.validate)('create'), _record.create);

exports.default = RecordRouter;
//# sourceMappingURL=record.js.map