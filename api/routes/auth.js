import express from 'express';
import { validate, createUser, loginUser } from '../controllers/user';
import validator from '../helpers/validator';

const authRouter=express.Router();

authRouter.post('/signup', validator('signup'), createUser);
authRouter.post('/login', validator('login'), loginUser);
export default authRouter;
