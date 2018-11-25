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
        case 'update': {
            return [
                check.body('title', 'a valid title is needed').exists(),
                check.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }),
                check.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }),
                check.body('type', 'You need to selected a type').exists().isString(),
                check.body('comment', 'You need to add a valid comment (At least 300 characters)')
                .exists().isString().isLength({ min: 3 }),
                check.body('created_by', 'User Id is needed').exists().isInt(),
                check.body('status', 'A defualt status is required').exists().isString(),
                check.body('location', 'Location is not valid').isString(),
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
        console.log(errors.array(true));
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

const GetSingle=(req, res) => {
    const RecordId=parseInt(req.params.id, 10);
    let RecordData;
    DbRecord.map((record) => {
        if (record.id===RecordId) {
            RecordData=record;
            return res.status(200).json({ status: 200, data: record });
        }
    });
    if (!RecordData) {
        return res.status(404).json({ status: 404, error: 'Data not found' });
    }
    return res.status(404).json({ status: 404, error: 'An error occurred' });
};

const UpdateRecord=(req, res) => {
    let RecordIndex;
    let OriginalRecord;
    const RecordId=parseInt(req.params.id, 10);
    DbRecord.map((record, index) => {
        if (record.id===RecordId) {
            OriginalRecord=record;
            RecordIndex=index;
        }
    });
    if (!OriginalRecord) {
        return res.status(404).json({ status: 404, error: 'Record not found' });
    }
    let UpdateRecordData=Record;
    UpdateRecordData.title=req.body.title || OriginalRecord.title;
    UpdateRecordData.type=req.body.type || OriginalRecord.type;
    UpdateRecordData.id= OriginalRecord.id;
    UpdateRecordData.comment= req.body.comment || OriginalRecord.comment;
    UpdateRecordData.created_on= OriginalRecord.created_on;
    UpdateRecordData.created_by= OriginalRecord.created_by;
    UpdateRecordData.image= req.body.image || OriginalRecord.image;
    UpdateRecordData.location= req.body.location || OriginalRecord.location;
    UpdateRecordData.status= req.body.status || OriginalRecord.status;
    DbRecord.splice(RecordIndex, 1, UpdateRecordData);

    return res.status(200).json({ status: 200, data: [{ id: UpdateRecordData.id, message: 'Updated Record' }] });
};

const Delete=(req, res) => {
    const RecordId=parseInt(req.params.id, 10);
    let RecordData;
    let ID;
    DbRecord.map((record, index) => {
        if (record.id===RecordId) {
            RecordData=record;
            ID=RecordData.id;
            DbRecord.splice(index, 1);
            return res.status(200).json({ status: 200, data: [{ id: ID, message: 'Record deleted' }] });
        }
    });
    if (!RecordData) {
        return res.status(404).json({ status: 404, error: 'Data not found' });
    }
    return res.status(404).json({ status: 404, error: 'An error occurred' });
};

export { validate, create, GetAll, GetSingle, UpdateRecord, Delete };
