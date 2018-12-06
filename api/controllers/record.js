import check from 'express-validator/check';
import { Record,
     DbRecord,
     createRecordDB,
     getAllRecordsDB,
     getSingleRecordDB,
     updateRecordsDB, deleteRecordDB } from '../models/Record';

const createId = () => {
    const id = Math.floor(Math.random()*90000000000) + 100000000000;
    return id;
};

const checkIfRedFlag = (req) => {
    const redFlag ='red-flag';
    const myPattern = new RegExp('(\\w*'+redFlag+'\\w*)', 'gi');
    const matches = String(req.originalUrl).match(myPattern);
    if (matches) {
        return true;
    }
    return false;
};
const create = (req, res) => {
    let type; // 0 for red flag 1 for intervention
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    const errors = check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(404).json({ status: 404, error: errors.array({ onlyFirstError: true }) });
    }
    if (checkIfRedFlag(req)) {
        type='red-flag';
    } else {
        type='intervention';
    }
    const record = Record;
    record.title = req.body.title;
    record.type = type;
    record.id = createId();
    record.comment = req.body.comment;
    record.created_on = new Date();
    record.created_by = req.userData.id;
    record.image = req.body.image;
    record.location = req.body.location;
    record.status = 'draft';
    DbRecord.push(record);
    createRecordDB(record).then((data) => {
        return res.status(200).json({ status: 200, data: record });
    })
    .catch((error) => {
        console.log(error);
        return res.status(404).json({ status: 404, error: 'An error occurred' });
    });
};

const getAll = (req, res) => {
    let type;
    if (checkIfRedFlag(req)) {
        type ='red-flag';
    } else {
        type ='intervention';
    }
    getAllRecordsDB([type]).then((data) => {
        return res.status(200).json({ status: 200, data: data.rows });
    })
    .catch((error) => {
        return res.status(404).json({ status: 404, error: 'An error occurred' });
    });
};

const getSingle = (req, res) => {
    const recordId = parseInt(req.params.id, 10);
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

const updateRecord = (req, res) => {
    let recordIndex;
    let originalRecord;
    const recordId=parseInt(req.params.id, 10);
    getSingleRecordDB([recordId]).then((data) => {
        if (data.rowCount===0) {
            return res.status(404).json({ status: 404, error: 'Record not found' });
        }
        originalRecord = data.rows[0];
        const updateRecordData = Record;
        updateRecordData.title = req.body.title || originalRecord.title;
        updateRecordData.type = req.body.type || originalRecord.type;
        updateRecordData.id = originalRecord.id;
        updateRecordData.comment = req.body.comment || originalRecord.comment;
        updateRecordData.created_on = originalRecord.created_on;
        updateRecordData.created_by = originalRecord.created_by;
        updateRecordData.image = req.body.image || originalRecord.image;
        updateRecordData.location = req.body.location || originalRecord.location;
        updateRecordData.status = req.body.status || originalRecord.status;
        updateRecordsDB(updateRecordData).then((result) => {
            return res.status(200).json({ status: 200, data: updateRecordData });
        })
        .catch((error) => {
            return res.status(404).json({ status: 404, error: 'An error occurred' });
        });
    });
};

const deleteRecord = (req, res) => {
    const recordId = parseInt(req.params.id, 10);
    deleteRecordDB([recordId]).then((data) => {
        return res.status(200).json({ status: 200, data: data.rows });
    })
    .catch((error) => {
        return res.status(404).json({ status: 404, error: 'An error occurred' });
    });
};

export { create, getAll, getSingle, updateRecord, deleteRecord };
