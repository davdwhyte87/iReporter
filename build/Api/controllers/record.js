'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = exports.validate = undefined;

var _check = require('express-validator/check');

var _check2 = _interopRequireDefault(_check);

var _Record = require('../models/Record');

var _Record2 = _interopRequireDefault(_Record);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// temporary in memory storage
var Records = [];
var validate = function validate(method) {
    switch (method) {
        case 'create':
            {
                return [_check2.default.body('title', 'a valid title is needed').exists(), _check2.default.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }), _check2.default.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }), _check2.default.body('type', 'You need to selected a type').exists().isString(), _check2.default.body('comment', 'You need to add a valid comment (At least 300 characters)').exists().isString().isLength({ min: 300 }), _check2.default.body('created_by', 'User Id is needed').exists().isInt(), _check2.default.body('status', 'A defualt status is required').exists().isString()];
            }
        default:
            {
                return [];
            }
    }
};

CreateId = function CreateId() {};
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
    var record = _Record2.default;
    record.title = req.body.title;
    record.type = req.body.type;
    record.id = CreateId();
    record.comment = req.body.comment;
    record.created_on = new Date();
    record.created_by = req.body.created_by;
    record.image = req.body.image;
    record.location = req.body.location;
    record.status = req.body.status;
    return res.status(200).json({ status: 200, data: [x] });
};

exports.validate = validate;
exports.create = create;
//# sourceMappingURL=record.js.map