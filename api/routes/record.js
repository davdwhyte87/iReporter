import express from 'express';
import { create, getAll, getSingle, updateRecord, deleteRecord } from '../controllers/record';
import { Record } from '../models/Record';
import validator from '../helpers/validator';
import Auth from '../middleware/auth';

const recordRouter=express.Router();

recordRouter.post('/', Auth, validator('create-record'), create);
recordRouter.get('/', Auth, getAll);
recordRouter.get('/:id', Auth, getSingle);
recordRouter.patch('/:id/comment', Auth, updateRecord);
recordRouter.patch('/:id/status', validator('update-status'), Auth, updateRecord);
recordRouter.patch('/:id/location', Auth, validator('update-location'), updateRecord);
recordRouter.delete('/:id', Auth, deleteRecord);

export default recordRouter;
