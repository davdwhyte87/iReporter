import express from 'express';
import UserController from '../controllers/user';
import validator from '../helpers/validator';
import handleValidation from '../helpers/handle-validation';

const authRouter = express.Router();

authRouter.post('/signup', validator('signup'), handleValidation, UserController.createUser);
authRouter.post('/login', validator('login'), handleValidation, UserController.loginUser);

export default authRouter;
