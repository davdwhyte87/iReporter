'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteRecord = exports.updateRecord = exports.getSingle = exports.getAll = exports.create = exports.validate = undefined;

var _check = require('express-validator/check');

var _check2 = _interopRequireDefault(_check);

var _Record = require('../models/Record');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = function validate(method) {
    switch (method) {
        case 'create':
            {
                return [_check2.default.body('title', 'a valid title is needed').exists(), _check2.default.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }), _check2.default.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }), _check2.default.body('type', 'You need to selected a type').exists().isString(), _check2.default.body('comment', 'You need to add a valid comment (At least 300 characters)').exists().isString().isLength({ min: 3 }), _check2.default.body('created_by', 'User Id is needed').exists().isInt(), _check2.default.body('status', 'A defualt status is required').exists().isString()];
            }
        case 'update':
            {
                return [_check2.default.body('title', 'a valid title is needed').exists(), _check2.default.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }), _check2.default.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }), _check2.default.body('type', 'You need to selected a type').exists().isString(), _check2.default.body('comment', 'You need to add a valid comment (At least 300 characters)').exists().isString().isLength({ min: 3 }), _check2.default.body('created_by', 'User Id is needed').exists().isInt(), _check2.default.body('status', 'A defualt status is required').exists().isString(), _check2.default.body('location', 'Location is not valid').isString()];
            }
        default:
            {
                return [];
            }
    }
};

var createId = function createId() {
    var id = Math.floor(Math.random() * 90000000000) + 100000000000;
    return id;
};
var create = function create(req, res) {
    var errorFormatter = function errorFormatter(_ref) {
        var location = _ref.location,
            msg = _ref.msg,
            param = _ref.param,
            value = _ref.value,
            nestedErrors = _ref.nestedErrors;

        return msg;
    };
    var errors = _check2.default.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(404).json({ status: 404, error: errors.array({ onlyFirstError: true }) });
    }
    var record = _Record.Record;
    record.title = req.body.title;
    record.type = req.body.type;
    record.id = createId();
    record.comment = req.body.comment;
    record.created_on = new Date();
    record.created_by = req.body.created_by;
    record.image = req.body.image;
    record.location = req.body.location;
    record.status = req.body.status;
    _Record.DbRecord.push(record);
    return res.status(200).json({ status: 200, data: record });
};

var getAll = function getAll(req, res) {
    return res.status(200).json({ status: 200, data: _Record.DbRecord });
};

var getSingle = function getSingle(req, res) {
    var RecordId = parseInt(req.params.id, 10);
    var RecordData = void 0;
    _Record.DbRecord.map(function (record) {
        if (record.id === RecordId) {
            RecordData = record;
            return res.status(200).json({ status: 200, data: record });
        }
    });
    if (!RecordData) {
        return res.status(404).json({ status: 404, error: 'Data not found' });
    }
    return res.status(404).json({ status: 404, error: 'An error occurred' });
};

var updateRecord = function updateRecord(req, res) {
    var recordIndex = void 0;
    var originalRecord = void 0;
    var RecordId = parseInt(req.params.id, 10);
    _Record.DbRecord.map(function (record, index) {
        if (record.id === RecordId) {
            originalRecord = record;
            recordIndex = index;
        }
    });
    if (!originalRecord) {
        return res.status(404).json({ status: 404, error: 'Record not found' });
    }
    var updateRecordData = _Record.Record;
    updateRecordData.title = req.body.title || originalRecord.title;
    updateRecordData.type = req.body.type || originalRecord.type;
    updateRecordData.id = originalRecord.id;
    updateRecordData.comment = req.body.comment || originalRecord.comment;
    updateRecordData.created_on = originalRecord.created_on;
    updateRecordData.created_by = originalRecord.created_by;
    updateRecordData.image = req.body.image || originalRecord.image;
    updateRecordData.location = req.body.location || originalRecord.location;
    updateRecordData.status = req.body.status || originalRecord.status;
    _Record.DbRecord.splice(recordIndex, 1, updateRecordData);

    return res.status(200).json({ status: 200, data: [{ id: updateRecordData.id, message: 'Updated Record' }] });
};

var deleteRecord = function deleteRecord(req, res) {
    var recordId = parseInt(req.params.id, 10);
    var recordData = void 0;
    var originalRecordId = void 0;
    _Record.DbRecord.map(function (record, index) {
        if (record.id === recordId) {
            recordData = record;
            originalRecordId = recordData.id;
            _Record.DbRecord.splice(index, 1);
            return res.status(200).json({ status: 200, data: [{ id: originalRecordId, message: 'Record deleted' }] });
        }
    });
    if (!recordData) {
        return res.status(404).json({ status: 404, error: 'Data not found' });
    }
    return res.status(404).json({ status: 404, error: 'An error occurred' });
};

exports.validate = validate;
exports.create = create;
exports.getAll = getAll;
exports.getSingle = getSingle;
exports.updateRecord = updateRecord;
exports.deleteRecord = deleteRecord;
//# sourceMappingURL=record.js.map