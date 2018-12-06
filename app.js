import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';
import config from 'config';
// application routes import
import recordRouter from './api/routes/record';
import authRouter from './api/routes/auth';

const app=express();
app.use(expressValidator());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
// initialize database
const apiv='/api/v1';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiv+'/red-flag', recordRouter);
app.use(apiv+'/intervention', recordRouter);
app.use(apiv+'/auth', authRouter);
app.get('/api/v1', (req, res) => {
    res.status(200).send('Hey this is the iReporter API version 1');
});
app.use('*', (req, res) => res.status(404).send({
    status: 404,
    error: 'This route does not exist. You may navigate to the home route at api/v1',
  }));
app.use(morgan('dev'));
export default app;
