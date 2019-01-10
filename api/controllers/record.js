import sgMail from '@sendgrid/mail';
import {
  Record,
  createRecordDB,
  getAllRecordsDB,
  getSingleRecordDB,
  updateRecordsDB,
  deleteRecordDB,
  getUserRecordsDB,
} from '../models/Record';
import { getSingleUserByIdDB } from '../models/User';
import createId from '../helpers/generator';

import checkIfRedFlag from '../helpers/check-redflag';

/** Class representing a record */
class RecordController {
  /**
   * This function creates a new record
   * @param {Object} req - Incoming request
   * @param {Object} res - Response to be returned
   * @return {Object} res - Response for a request
   */
  static create(req, res) {
    let type;
    let successMessage;
    if (checkIfRedFlag(req)) {
      type = 'red-flag';
      successMessage = 'Created red-flag record';
    } else {
      type = 'intervention';
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
    createRecordDB(record).then(() => res.status(201).json({
      status: 201,
      data: [{ id: record.id, message: successMessage }],
    }))
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }

  /**
   * This function gets all records in a database
   * @param {Object} req - Incoming request
   * @param {Object} res - Response to be returned
   * @return {Object} res - Response for a request
   */
  static getAll(req, res) {
    let type;
    if (checkIfRedFlag(req)) {
      type = 'red-flag';
    } else {
      type = 'intervention';
    }
    getAllRecordsDB([type]).then(data => res.status(200).json({ status: 200, data: data.rows }))
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }


  /**
   * This gets a single record from the database
   * @param {Object} req - Incoming request
   * @param {Object} res - Response to be returned
   * @return {Object} res - Response for a request
   */
  static getSingle(req, res) {
    const recordId = parseInt(req.params.id, 10);
    getSingleRecordDB([recordId]).then((data) => {
      if (data.rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'This record does not exist' });
      }
      return res.status(200).json({ status: 200, data: data.rows });
    })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }

  /**
   * This updates a records image
   * @param {Object} req - Incoming request
   * @param {Object} res - Response to be returned
   * @return {Object} res - Response for a request
   */
  static updateImage(req, res) {
    let successMessage;
    const recordId = parseInt(req.params.id, 10);
    getSingleRecordDB([recordId]).then((data) => {
      const [recordData] = data.rows;
      const recordOwnerId = parseInt(recordData.createdBy, 10);
      const userId = parseInt(req.userData.id, 10);
      if (userId === recordOwnerId) {
        const updatedRecord = recordData;
        updatedRecord.image = req.body.image || recordData.image;
        updateRecordsDB(updatedRecord).then(() => {
          if (checkIfRedFlag(req)) {
            successMessage = 'red-flag image has been updated';
          } else {
            successMessage = 'intervention image has been updated';
          }
          return res.status(200).json({
            status: 200,
            data: [{ id: recordId, message: successMessage }],
          });
        })
          .catch((error) => {
            console.log(error);
            res.status(400).json({ status: 400, error: 'An error occurred' });
          });
      } else {
        return res.status(401).json({ status: 401, error: 'You are Unauthorized' });
      }
    })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }

  /**
   * This function checks if a comment is to be updated
   * @param {Object} req - Incoming request object
   * @return {Boolean} - Boolean
   */
  static checkActionComment(req) {
    const data = 'comment';
    const myPattern = new RegExp('(\\w*\\w*' + data + ')', 'gi');
    const matches = String(req.originalUrl).match(myPattern);
    if (matches) {
      return true;
    }
    return false;
  }

  /**
   * This function checks whether the location is to be updated
   * @param {Object} req - request object
   * @return {Boolean} Boolean
   */
  static checkActionLocation(req) {
    const data = 'location';
    const myPattern = new RegExp('(\\w*\\w*' + data + ')', 'gi');
    const matches = String(req.originalUrl).match(myPattern);
    if (matches) {
      return true;
    }
    return false;
  }

  /**
   * This function checks whether to update a record status
   * @param {Object} req - request object
   * @return {Object} Boolean - returns true or false
   */
  static checkActionStatus(req) {
    const data = 'status';
    const myPattern = new RegExp('(\\w*\\w*' + data + ')', 'gi');
    const matches = String(req.originalUrl).match(myPattern);
    if (matches) {
      return true;
    }
    return false;
  }

  /**
   * This function updates a record
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object}  - response Object
   */
  static updateRecord(req, res) {
    let successMessage;
    let type;
    if (checkIfRedFlag(req)) {
      type = 'red-flg';
    } else {
      type = 'intervention';
    }
    let originalRecord;
    const recordId = parseInt(req.params.id, 10);
    getSingleRecordDB([recordId]).then((data) => {
      if (data.rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'Record not found' });
      }
      [originalRecord] = data.rows;
      const updateRecordData = Record;
      updateRecordData.title = req.body.title || originalRecord.title;
      updateRecordData.type = originalRecord.type;
      updateRecordData.id = originalRecord.id;
      updateRecordData.createdOn = originalRecord.createdOn;
      updateRecordData.createdBy = originalRecord.createdBy;
      updateRecordData.image = req.body.image || originalRecord.image;
      if (RecordController.checkActionComment(req)) {
        updateRecordData.comment = req.body.comment || originalRecord.comment;
        successMessage = 'Updated ' + type + ' comment';
      } else {
        updateRecordData.comment = originalRecord.comment;
      }
      if (RecordController.checkActionLocation(req)) {
        updateRecordData.location = req.body.location || originalRecord.location;
        successMessage = 'Updated ' + type + ' location';
      } else {
        updateRecordData.location = originalRecord.location;
      }
      if (RecordController.checkActionStatus(req)) {
        if (req.userData.isAdmin === true) {
          updateRecordData.status = req.body.status || originalRecord.status;
          successMessage = 'Updated ' + type + ' status';
        } else {
          updateRecordData.status = originalRecord.status;
          return res.status(401).json({ status: 401, error: 'Unauthorized' });
        }
      } else {
        updateRecordData.status = originalRecord.status;
      }
      // update record
      updateRecordsDB(updateRecordData).then(() => {
        if (req.userData.isAdmin === true) {
          if (updateRecordData.status !== originalRecord.status) {
            getSingleUserByIdDB([originalRecord.createdBy]).then((responseUserData) => {
              const userData = responseUserData.rows[0];
              sgMail.setApiKey(process.env.SENDGRID_API_KEY);
              const msg = {
                to: userData.email,
                from: 'swaye407@gmail.com',
                subject: 'iRepoter Record Update',
                html: '<p>Thank you for using iRepoter, your post status <strong> '
                          + updateRecordData.title + '</strong> has been updated to <strong>'
                          + updateRecordData.status + ' </strong></p>',
              };
              sgMail.send(msg);
            })
              .catch((error) => {
                console.log(error);
                return res.status(400).json({ status: 400, error: 'An error occurred' });
              });
            // end get record owner
          }
        }
        return res.status(200).json({
          status: 200,
          data: [{ id: originalRecord.id, message: successMessage }],
        });
      })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({ status: 400, error: 'An error occurred' });
        });
      // end update
    })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ status: 400, error: 'An error occurred' });
      });
    // end record get
  }


  /** This method deletes a record if the user performing the action owns the record
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {Object} res - response object
   */
  static deleteRecord(req, res) {
    let successMessage;
    const recordId = parseInt(req.params.id, 10);
    getSingleRecordDB([recordId]).then((data) => {
      const [recordData] = data.rows;
      const recordOwnerId = parseInt(recordData.createdBy, 10);
      const userId = parseInt(req.userData.id, 10);
      if (userId === recordOwnerId) {
        deleteRecordDB([recordId]).then(() => {
          if (checkIfRedFlag(req)) {
            successMessage = 'red-flag record has been deleted';
          } else {
            successMessage = 'intervention record has been deleted';
          }
          return res.status(200).json({
            status: 200,
            data: [{ id: recordId, message: successMessage }],
          });
        })
          .catch((error) => {
            console.log(error);
            res.status(400).json({ status: 400, error: 'An error occurred' });
          });
      } else {
        return res.status(401).json({ status: 401, error: 'You are Unauthorized' });
      }
    })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }

  /**
   * This function gets all a user records in the database
   * @param {Object} req - Incoming request
   * @param {Object} res - Response to be returned
   * @return {Object} res - Response for a request
   */
  static getUserRecords(req, res) {
    const userId = parseInt(req.userData.id, 10);
    getUserRecordsDB([userId]).then(data => res.status(200).json({ status: 200, data: data.rows }))
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }
}

export default RecordController;
