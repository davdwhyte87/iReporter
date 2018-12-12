import express from 'express';
import validator from '../helpers/validator';
import Auth from '../middleware/auth';
import recordController from '../controllers/record';
import handleValidation from '../helpers/handle-validation';

const recordRouter = express.Router();

recordRouter.post('/', Auth, validator('create-record'), handleValidation, recordController.create);
recordRouter.get('/', Auth, recordController.getAll);
recordRouter.get('/:id', Auth, recordController.getSingle);
recordRouter.patch('/:id/comment', Auth, validator('update-comment'), handleValidation, recordController.updateRecord);
recordRouter.patch('/:id/status', validator('update-status'), Auth, handleValidation, recordController.updateRecord);
recordRouter.patch('/:id/location', Auth, validator('update-location'), handleValidation, recordController.updateRecord);
recordRouter.delete('/:id', Auth, recordController.deleteRecord);

export default recordRouter;
