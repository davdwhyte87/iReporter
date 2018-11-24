import express from 'express';
import { validate, create } from '../controller/record';

const RecordRouter=express.Router();

RecordRouter.post('/', validate('create'), create);

export default RecordRouter;
