import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
// application routes import
import RecordRouter from './Api/routes/record';
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
app.use(apiv+'/record', RecordRouter);
app.get('/api/v1', (req, res) => {
    res.status(200).send('Whats up mann long time ooo');
});
app.use(morgan('dev'));
export default app;
