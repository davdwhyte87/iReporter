import { Pool } from 'pg';
import config from 'config';

const pool=new Pool({ connectionString: config.DB_URL });
pool.on('connect', () => {
    console.log('connected');
});

const dropTables = () => {
    const Query= `
    DROP TABLE IF EXISTS users,records;
    `
    pool.query(Query).then((res) => {
        console.log(res);
    });
    pool.end();
};

dropTables();
