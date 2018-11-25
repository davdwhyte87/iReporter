import express from 'express';
import { validate, create, GetAll } from '../controllers/record';
import { Record } from '../models/Record';

const RecordRouter=express.Router();

RecordRouter.post('/', validate('create'), create);
RecordRouter.get('/', GetAll);
export default RecordRouter;
