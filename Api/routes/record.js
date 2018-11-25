import express from 'express';
import { validate, create, GetAll, GetSingle, UpdateRecord } from '../controllers/record';
import { Record } from '../models/Record';

const RecordRouter=express.Router();

RecordRouter.post('/', validate('create'), create);
RecordRouter.get('/', GetAll);
RecordRouter.get('/:id', GetSingle);
RecordRouter.patch('/:id', UpdateRecord);
export default RecordRouter;
