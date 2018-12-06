import express from 'express';
import { validate, createUser } from '../controllers/user';


const authRouter=express.Router();

authRouter.post('/signup', validate('create'), createUser);
export default authRouter;
