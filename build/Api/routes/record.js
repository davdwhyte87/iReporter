'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _record = require('../controllers/record');

var _Record = require('../models/Record');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RecordRouter = _express2.default.Router();

RecordRouter.post('/', (0, _record.validate)('create'), _record.create);
RecordRouter.get('/', _record.GetAll);
RecordRouter.get('/:id', _record.GetSingle);
RecordRouter.patch('/:id', _record.UpdateRecord);
exports.default = RecordRouter;
//# sourceMappingURL=record.js.map