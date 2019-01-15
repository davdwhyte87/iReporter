import express from 'express';
import UserController from '../controllers/user';
import validator from '../helpers/validator';
import handleValidation from '../helpers/handle-validation';
import Auth from '../middleware/auth';

const authRouter = express.Router();

authRouter.post('/signup', validator('signup'), handleValidation, UserController.createUser);
authRouter.post('/login', validator('login'), handleValidation, UserController.loginUser);
authRouter.patch('/me', Auth, validator('user-update'), handleValidation, UserController.updateUser);

export default authRouter;
