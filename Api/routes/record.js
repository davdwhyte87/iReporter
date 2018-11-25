import express from 'express';
import { validate, create, GetAll, GetSingle } from '../controllers/record';
import { Record } from '../models/Record';

const RecordRouter=express.Router();

RecordRouter.post('/', validate('create'), create);
RecordRouter.get('/', GetAll);
RecordRouter.get('/:id', GetSingle);
export default RecordRouter;
