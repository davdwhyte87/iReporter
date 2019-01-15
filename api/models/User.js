import { Pool } from 'pg';
import config from 'config';

const pool = new Pool({ connectionString: config.DB_URL });

const User = {
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

/**
 * This method relates with the database directly and creates a new user
 * @param {Object} user - a User object
 * @returns {Object} - returns a pool.query instance
 */
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

/**
 * This method relates with the database directly and gets a single user
 * @param {Array} selector - an array of query selectors
 * @returns {Object} - returns a pool.query instance
 */
const getSingleUserDB = (selector) => {
  const Query = `
    SELECT * FROM users WHERE email=$1 
    `;
  return pool.query(Query, selector);
};

/**
 * This method relates with the database directly and updates a user
 * @param {Object} user - user object to be updated
 * @returns {Object} - returns a pool.query instance
 */
const updateRecordsDB = async (user) => {
  const Query = `
    UPDATE users SET "id"=$1,"firstname"=$2,"lastname"=$3,"othernames"=$4,"username"=$5,"email"=$6,"phoneNumber"=$7,"createdOn"=$8,"isAdmin"=$9,"password"=$10
     WHERE id=$1
    `;
  const values = [user.id, user.firstname,
    user.lastname, user.othernames, user.username, user.email, user.phoneNumber,
    user.createdOn, user.isAdmin, user.password];
  return pool.query(Query, values);
};

/**
 * This method relates with the database directly and gets a single user
 * @param {Array} selector - an array of query selectors
 * @returns {Object} - returns a pool.query instance
 */
const getSingleUserByIdDB = (selector) => {
  const Query = `
    SELECT * FROM users WHERE id=$1 
    `;
  return pool.query(Query, selector);
};

/**
 * This method relates with the database directly and gets a single user
 * @param {Array} selector - an array of query selectors
 * @returns {Object} - returns a pool.query instance
 */
const getSingleUserByUsernameDB = (selector) => {
  const Query = `
    SELECT * FROM users WHERE username=$1 
    `;
  return pool.query(Query, selector);
};

export {
  createUserDB,
  User,
  getSingleUserDB,
  getSingleUserByIdDB,
  getSingleUserByUsernameDB,
  updateRecordsDB,
};
