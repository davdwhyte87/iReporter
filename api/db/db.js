import { Pool } from 'pg';
import config from '../../config';

console.log(config.DB_URL);
const pool=new Pool({ connectionString: config.DB_URL });
pool.on('connect', () => {
    console.log('connected');
});

const createTables = () => {
    const createRecordQuery= `
    CREATE TABLE IF NOT EXISTS
    records(
        id bigint PRIMARY KEY,
        title varchar(100) NOT NULL,
        comment TEXT NOT NULL,
        created_on varchar(100) NOT NULL,
        created_by integer NOT NULL,
        type varchar(100) NOT NULL,
        location varchar(100),
        status integer,
        image TEXT
    );
    `;
    const seedRecordsQuery=`
    INSERT INTO records ("id","title","comment","created_on","created_by","type","location","status","image")
    VALUES (2030300,'Mandela wa gay!','jrkelkjekdldkeda','39-29-1003UTC',328394,'red-flag','192.39 9304.93',0,'aojdnkdnjknkanskakjsdanjakjnkas');
    `;
    // pool.connect();
    const finalQueryCreate=createRecordQuery;
    const finalQuerySeed=seedRecordsQuery;
    pool.query(finalQueryCreate).then((res) => {
        console.log(res);
    });
    pool.end();
};

createTables();
