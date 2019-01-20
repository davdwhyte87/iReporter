import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';

// application routes import
import recordRouter from './api/routes/record';
import authRouter from './api/routes/auth';

dotenv.config();
const app = express();
app.use(expressValidator());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});


app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/api/v1/red-flags', recordRouter);
app.use('/api/v1/interventions', recordRouter);
app.use('/api/v1/auth', authRouter);
app.get('/api/v1', (req, res) => {
  res.status(200).send('Hey this is the iReporter API version 1');
});
app.use('*', (req, res) => res.status(404).send({
  status: 404,
  error: 'This route does not exist. You may navigate to the home route at api/v1',
}));
app.use(morgan('dev'));
export default app;
