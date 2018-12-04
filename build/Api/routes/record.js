'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _record = require('../controllers/record');

var _Record = require('../models/Record');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recordRouter = _express2.default.Router();

recordRouter.post('/', (0, _record.validate)('create'), _record.create);
recordRouter.get('/', _record.getAll);
recordRouter.get('/:id', _record.getSingle);
recordRouter.patch('/:id', _record.updateRecord);
recordRouter.delete('/:id', _record.deleteRecord);

exports.default = recordRouter;
//# sourceMappingURL=record.js.map