import check from 'express-validator/check';
import { Record, DbRecord } from '../models/Record';

const validate=(method) => {
    switch (method) {
        case 'create': {
            return [
                check.body('title', 'a valid title is needed').exists(),
                check.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }),
                check.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }),
                check.body('type', 'You need to selected a type').exists().isString(),
                check.body('comment', 'You need to add a valid comment (At least 300 characters)')
                .exists().isString().isLength({ min: 3 }),
                check.body('created_by', 'User Id is needed').exists().isInt(),
                check.body('status', 'A defualt status is required').exists().isString(),
            ];
        }
        default: {
            return [];
        }
    }
};

const CreateId=() => {
    let id =Math.floor(Math.random()*90000000000) + 100000000000;
    return id;
};
const create=(req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    let errors=check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(404).json({ status: 404, error: errors.array({ onlyFirstError: true }) });
    }
    let record=Record;
    record.title=req.body.title;
    record.type=req.body.type;
    record.id= CreateId();
    record.comment= req.body.comment;
    record.created_on= new Date();
    record.created_by= req.body.created_by;
    record.image= req.body.image;
    record.location= req.body.location;
    record.status= req.body.status;
    DbRecord.push(record);
    return res.status(200).json({ status: 200, data: record });
};

const GetAll=(req, res) => {
    return res.status(200).json({ status: 200, data: DbRecord });
};

export { validate, create, GetAll };
