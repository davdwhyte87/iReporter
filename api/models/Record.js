import { Pool } from 'pg';
import config from '../../config';

const pool=new Pool({ connectionString: config.DB_URL });
pool.on('connect', () => {
    console.log('connected');
});
const Record={
    id: Int16Array,
    title: String,
    comment: String,
    created_on: Date,
    created_by: Int16Array,
    type: String,
    location: String,
    status: String,
    image: String,
};
const DbRecord=[];
const createRecordDB = async (record) => {
    const createQuery=`
    INSERT INTO records ("id","title","comment","created_on","created_by","type","location","status","image")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);
    `;
    const values= [record.id, record.title, record.comment, record.created_on, record.created_by,
         record.type, record.location, record.status, record.image];
    return pool.query(createQuery, values);
};

const getAllRecordsDB= async () => {
    const getRecordsQuery=`
    SELECT * FROM records 
    `;
    return pool.query(getRecordsQuery);
};

const getSingleRecordDB= async (selector) => {
    const getRecordsQuery=`
    SELECT * FROM records WHERE id=$1 
    `;
    return pool.query(getRecordsQuery, selector);
};

const updateRecordsDB= async (record) => {
    const Query=`
    UPDATE records SET "id"=$1,"title"=$2,"comment"=$3,"created_on"=$4,"created_by"=$5,"type"=$6,"location"=$7,"status"=$8,"image"=$9 WHERE "id"=$1
    `;
    const values= [record.id, record.title, record.comment, record.created_on, record.created_by,
        record.type, record.location, record.status, record.image];
    return pool.query(Query, values);
};


export { Record, DbRecord, createRecordDB, getAllRecordsDB, getSingleRecordDB, updateRecordsDB };
