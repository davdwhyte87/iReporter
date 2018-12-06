import { Pool } from 'pg';
import config from 'config';

const pool = new Pool({ connectionString: config.DB_URL });

const User ={
    id: Int16Array,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    created_on: Date,
    is_admin: Int16Array,
    password: String,
};

const createUserDB = (user) => {
    const createQuery = `
    INSERT INTO users ("id","firstname","lastname","email","phone","created_on","is_admin","password")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8);
    `;
    const values = [user.id, user.firstname, user.lastname, user.email, user.phone,
         user.created_on, user.is_admin, user.password];
    return pool.query(createQuery, values);
};

const getSingleUserDB = (selector) => {
    const Query=`
    SELECT * FROM users WHERE email=$1 
    `;
    return pool.query(Query, selector);
};

export { createUserDB, User, getSingleUserDB };
