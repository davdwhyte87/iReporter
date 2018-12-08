import check from 'express-validator/check';
import sgMail from '@sendgrid/mail';
import config from 'config';
import { Record,
     DbRecord,
     createRecordDB,
     getAllRecordsDB,
     getSingleRecordDB,
     updateRecordsDB, deleteRecordDB } from '../models/Record';
import { User, createUserDB, getSingleUserDB, getSingleUserByIdDB } from '../models/User';
import createId from '../helpers/generator';

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
    let successMessage;
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    const errors = check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, error: errors.array({ onlyFirstError: true }) });
    }
    if (checkIfRedFlag(req)) {
        type ='red-flag';
        successMessage = 'Created red-flag record';
    } else {
        type ='intervention';
        successMessage = 'created intervention record';
    }
    const record = Record;
    record.title = req.body.title;
    record.type = type;
    record.id = createId();
    record.comment = req.body.comment;
    record.createdOn = new Date();
    record.createdBy = req.userData.id;
    record.image = req.body.image;
    record.location = req.body.location;
    record.status = 'draft';
    DbRecord.push(record);
    createRecordDB(record).then((data) => {
        return res.status(200).json({
            status: 200,
            data: [{ id: record.id, message: successMessage }],
         });
    })
    .catch((error) => {
        console.log(error);
        return res.status(400).json({ status: 400, error: 'An error occurred' });
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
        return res.status(400).json({ status: 400, error: 'An error occurred' });
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
        return res.status(400).json({ status: 400, error: 'An error occurred' });
    });
};

const checkActionComment = (req) => {
    const data ='comment';
    const myPattern = new RegExp('(\\w*\\w*'+data+')', 'gi');
    const matches = String(req.originalUrl).match(myPattern);
    if (matches) {
        return true;
    }
    return false;
};

const checkActionLocation = (req) => {
    const data ='location';
    const myPattern = new RegExp('(\\w*\\w*'+data+')', 'gi');
    const matches = String(req.originalUrl).match(myPattern);
    if (matches) {
        return true;
    }
    return false;
};

const checkActionStatus = (req) => {
    const data ='status';
    const myPattern = new RegExp('(\\w*\\w*'+data+')', 'gi');
    const matches = String(req.originalUrl).match(myPattern);
    if (matches) {
        return true;
    }
    return false;
};

const updateRecord = (req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    const errors = check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, error: errors.array({ onlyFirstError: true }) });
    }
    let successMessage;
    let type;
    if (checkIfRedFlag(req)) {
        type = 'red-flg';
    } else {
        type = 'intervention';
    }
    let originalRecord;
    const recordId=parseInt(req.params.id, 10);
    getSingleRecordDB([recordId]).then((data) => {
        if (data.rowCount===0) {
            return res.status(404).json({ status: 404, error: 'Record not found' });
        }
        originalRecord = data.rows[0];
        const updateRecordData = Record;
        updateRecordData.title = req.body.title || originalRecord.title;
        updateRecordData.type = originalRecord.type;
        updateRecordData.id = originalRecord.id;
        updateRecordData.createdOn = originalRecord.createdOn;
        updateRecordData.createdBy = originalRecord.createdBy;
        updateRecordData.image = req.body.image || originalRecord.image;
        if (checkActionComment(req)) {
            updateRecordData.comment = req.body.comment || originalRecord.comment;
        } else {
            updateRecordData.comment = originalRecord.comment;
            successMessage = 'Updated '+type+' comment';
        }
        if (checkActionLocation(req)) {
            updateRecordData.location = req.body.location || originalRecord.location;
            successMessage = 'Updated '+type+' location';
        } else {
            updateRecordData.location = originalRecord.location;
        }
        if (checkActionStatus(req)) {
            if (req.userData.isAdmin === 1) {
                updateRecordData.status = req.body.status || originalRecord.status;
                successMessage = 'Updated '+type+' status';
            } else {
                updateRecordData.status = originalRecord.status;
                return res.status(401).json({ status: 401, error: 'Unauthorized' });
            }
        } else {
            updateRecordData.status = originalRecord.status;
        }
        updateRecordsDB(updateRecordData).then((result) => {
            if (req.userData.isAdmin === 1) {
                if (updateRecordData.status !== originalRecord.status) {
                    getSingleUserByIdDB([originalRecord.createdBy]).then((userData) => {
                        const userData2=userData.rows[0];
                        sgMail.setApiKey(config.SENDGRID_API_KEY);
                        const msg = {
                        to: userData2.email,
                        from: 'swaye407@gmail.com',
                        subject: 'iRepoter Record Update',
                        html: '<p>Thank you for using iRepoter, your post status <strong> '
                        +updateRecordData.title+ '</strong> has been updated to <strong>'+updateRecordData.status+' </strong></p>',
                        };
                        sgMail.send(msg);
                    });
                }
            }
            return res.status(200).json({
                 status: 200,
                 data: [{ id: originalRecord.id, message: successMessage }],
                 });
        })
        .catch((error) => {
            return res.status(400).json({ status: 400, error: 'An error occurred' });
        });
    });
};

const deleteRecord = (req, res) => {
    let successMessage;
    const recordId = parseInt(req.params.id, 10);
    deleteRecordDB([recordId]).then((data) => {
        if (checkIfRedFlag(req)) {
            successMessage = 'red-flag record has been deleted';
        } else {
            successMessage = 'intervention record has been deleted';
        }
        return res.status(200).json({
            status: 200,
            data: [{ id: recordId, message: successMessage }] });
    })
    .catch((error) => {
        return res.status(400).json({ status: 400, error: 'An error occurred' });
    });
};

export { create, getAll, getSingle, updateRecord, deleteRecord };
