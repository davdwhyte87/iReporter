import check from 'express-validator/check';
import { Record, DbRecord, createRecordDB, getAllRecordsDB, getSingleRecordDB, updateRecordsDB } from '../models/Record';

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
            ];
        }
        default: {
            return [];
        }
    }
};

const createId=() => {
    const id =Math.floor(Math.random()*90000000000) + 100000000000;
    return id;
};
const create=(req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    const errors=check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(404).json({ status: 404, error: errors.array({ onlyFirstError: true }) });
    }
    const record=Record;
    record.title=req.body.title;
    record.type=req.body.type;
    record.id= createId();
    record.comment= req.body.comment;
    record.created_on= new Date();
    record.created_by= req.body.created_by;
    record.image= req.body.image;
    record.location= req.body.location;
    record.status= 0;
    DbRecord.push(record);
    createRecordDB(record).then((data) => {
        return res.status(200).json({ status: 200, data: record });
    })
    .catch((error) => {
        return res.status(404).json({ status: 404, error: 'An error occurred' });
    });
};

const getAll=(req, res) => {
    getAllRecordsDB().then((data) => {
        return res.status(200).json({ status: 200, data: data.rows });
    })
    .catch((error) => {
        return res.status(404).json({ status: 404, error: 'An error occurred' });
    });
    // return res.status(200).json({ status: 200, data: DbRecord });
};

const getSingle=(req, res) => {
    const recordId=parseInt(req.params.id, 10);
    let RecordData;
    getSingleRecordDB([recordId]).then((data) => {
        if (data.rowCount===0) {
            return res.status(404).json({ status: 404, error: 'This record does not exist' });
        }
        return res.status(200).json({ status: 200, data: data.rows });
    })
    .catch((error) => {
        return res.status(404).json({ status: 404, error: 'An error occurred' });
    });
};

const updateRecord=(req, res) => {
    let recordIndex;
    let originalRecord;
    const recordId=parseInt(req.params.id, 10);
    getSingleRecordDB([recordId]).then((data) => {
        if (data.rowCount===0) {
            return res.status(404).json({ status: 404, error: 'Record not found' });
        }
        originalRecord=data.rows[0];
        const updateRecordData= Record;
        updateRecordData.title= req.body.title || originalRecord.title;
        updateRecordData.type= req.body.type || originalRecord.type;
        updateRecordData.id= originalRecord.id;
        updateRecordData.comment= req.body.comment || originalRecord.comment;
        updateRecordData.created_on= originalRecord.created_on;
        updateRecordData.created_by= originalRecord.created_by;
        updateRecordData.image= req.body.image || originalRecord.image;
        updateRecordData.location= req.body.location || originalRecord.location;
        updateRecordData.status= req.body.status || originalRecord.status;
        updateRecordsDB(updateRecordData).then((result) => {
            return res.status(200).json({ status: 200, data: data.rows });
        })
        .catch((error) => {
            return res.status(404).json({ status: 404, error: 'Record not found' });
        });
    });
};

const deleteRecord = (req, res) => {
    const recordId=parseInt(req.params.id, 10);
    let recordData;
    let originalRecordId;
    DbRecord.map((record, index) => {
        if (record.id===recordId) {
            recordData=record;
            originalRecordId=recordData.id;
            DbRecord.splice(index, 1);
            return res.status(200).json({ status: 200, data: [{ id: originalRecordId, message: 'Record deleted' }] });
        }
    });
    if (!recordData) {
        return res.status(404).json({ status: 404, error: 'Data not found' });
    }
    return res.status(404).json({ status: 404, error: 'An error occurred' });
};

export { validate, create, getAll, getSingle, updateRecord, deleteRecord };
