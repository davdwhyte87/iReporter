import { Pool } from 'pg';
import config from 'config';

const pool = new Pool({ connectionString: config.DB_URL });
pool.on('connect', () => {
  console.log('connected');
});

const createTables = () => {
  const createRecordQuery = `
    CREATE TABLE IF NOT EXISTS
    records(
        id bigint PRIMARY KEY,
        title varchar(100) NOT NULL,
        comment TEXT NOT NULL,
        "createdOn" varchar(100) NOT NULL,
        "createdBy" bigint NOT NULL,
        type varchar(100) NOT NULL,
        location varchar(100),
        status varchar(100),
        image TEXT
    );
    `;
  const createUserQuery = `
    CREATE TABLE IF NOT EXISTS
    users(
        id bigint PRIMARY KEY,
        firstname varchar(255) NOT NULL,
        lastname varchar(255) NOT NULL,
        othernames varchar(255) NOT NULL,
        username varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        "phoneNumber" varchar(100) NOT NULL,
        "createdOn" varchar(100) NOT NULL,
        "isAdmin" boolean NOT NULL,
        password TEXT NOT NULL 
    );
    `;
  const finalQueryCreate = createRecordQuery + createUserQuery;
  pool.query(finalQueryCreate).then((res) => {
    console.log(res);
  });
  pool.end();
};

createTables();
