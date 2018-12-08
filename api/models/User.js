import { Pool } from 'pg';
import config from 'config';

const pool = new Pool({ connectionString: config.DB_URL });

const User ={
    id: Int16Array,
    firstname: String,
    lastname: String,
    othernames: String,
    username: String,
    email: String,
    phoneNumber: String,
    createdOn: Date,
    isAdmin: Int16Array,
    password: String,
};

const createUserDB = (user) => {
    const createQuery = `
    INSERT INTO users ("id","firstname","lastname","othernames","username","email","phoneNumber","createdOn","isAdmin","password")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);
    `;
    const values = [user.id, user.firstname,
         user.lastname, user.othernames, user.username, user.email, user.phoneNumber,
         user.createdOn, user.isAdmin, user.password];
    return pool.query(createQuery, values);
};

const getSingleUserDB = (selector) => {
    const Query=`
    SELECT * FROM users WHERE email=$1 
    `;
    return pool.query(Query, selector);
};

const getSingleUserByIdDB = (selector) => {
    const Query=`
    SELECT * FROM users WHERE id=$1 
    `;
    return pool.query(Query, selector);
};

const getSingleUserByUsernameDB = (selector) => {
    const Query=`
    SELECT * FROM users WHERE username=$1 
    `;
    return pool.query(Query, selector);
};

export { createUserDB, User, getSingleUserDB, getSingleUserByIdDB, getSingleUserByUsernameDB };
