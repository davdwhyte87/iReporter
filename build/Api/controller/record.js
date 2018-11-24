'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = exports.validate = undefined;

var _check = require('express-validator/check');

var _check2 = _interopRequireDefault(_check);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = function validate(method) {
    switch (method) {
        case 'create':
            {
                return [_check2.default.body('title', 'a valid title is needed').exists().isLength({ min: 5 }), _check2.default.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }), _check2.default.body('type', 'You need to selected a type').exists()];
            }
        default:
            {
                return [];
            }
    }
};
var create = function create(req, res) {
    var x = 'k';
    return res.status(200).json({ status: 200, data: [x] });
};
exports.validate = validate;
exports.create = create;
//# sourceMappingURL=record.js.map