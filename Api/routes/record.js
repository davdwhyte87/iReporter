import express from 'express';
import { validate, create, getAll, getSingle, updateRecord, deleteRecord } from '../controllers/record';
import { Record } from '../models/Record';

const RecordRouter=express.Router();

RecordRouter.post('/', validate('create'), create);
RecordRouter.get('/', getAll);
RecordRouter.get('/:id', getSingle);
RecordRouter.patch('/:id', updateRecord);
RecordRouter.delete('/:id', deleteRecord);
export default RecordRouter;
