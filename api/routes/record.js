import express from 'express';
import { validate, create, getAll, getSingle, updateRecord, deleteRecord } from '../controllers/record';
import { Record } from '../models/Record';

const recordRouter=express.Router();

recordRouter.post('/', validate('create'), create);
recordRouter.get('/', getAll);
recordRouter.get('/:id', getSingle);
recordRouter.patch('/:id', updateRecord);
recordRouter.delete('/:id', deleteRecord);

export default recordRouter;
