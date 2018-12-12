import check from 'express-validator/check';
import { getSingleUserByUsernameDB } from '../models/User';


/**
 * This method validates inputes coming into the api
 * @param {string} method - the name of the validation to be performed
 * @returns {array} - returns array of validators
 */
const validate = (method) => {
  switch (method) {
    case 'signup': {
      return [
        check.body('firstname', 'A valid First Name is required')
          .exists().isString().isLength({ min: 2, max: 20 }),
        check.body('lastname', 'A valid Last Name is required')
          .exists().isString().isLength({ min: 2, max: 20 }),
        check.body('othernames', 'A valid Other Name is required')
          .exists().isString().isLength({ min: 2, max: 20 }),
        check.body('username', 'A valid username is required')
          .exists().isString().isLength({ min: 2, max: 20 }),
        check.body('username', 'This username already exists').custom(async (value) => {
          const data = await getSingleUserByUsernameDB([value]);
          if (data.rowCount > 0) {
            throw new Error('This username has been taken');
          }
        }),
        check.body('email', 'A valid email is required').exists().isEmail(),
        check.body('phone', 'A valid phone number is required')
          .exists().isString().isLength({ min: 10, max: 20 }),
        check.body('password', 'A valid password is required. (At least 5 characters)')
          .exists().isLength({ min: 5, max: 20 }),
      ];
    }
    case 'login': {
      return [
        check.body('email', 'A valid email is required').exists().isEmail(),
        check.body('password', 'A valid password is required. (At least 5 characters)').exists().isLength({ min: 5 }),
      ];
    }
    case 'create-record': {
      return [
        check.body('title', 'a valid title is needed').exists().isString(),
        check.body('title', 'Minimum of 5 characters and maximum of 20').isLength({ min: 5, max: 100 }),
        check.body('comment', 'You need to add a valid comment (At least 40 characters)')
          .exists().isString().isLength({ min: 40 }),
      ];
    }
    case 'update-status': {
      return [
        check.body('status', 'A valid status is requires. Either of (draft,rejected,under-investigation,resolved)')
          .exists().isString().custom((value) => {
            const status = ['draft', 'rejected', 'under-investigation', 'resolved'];
            if (status.includes(value)) {
              return value;
            }
            throw new Error('A valid status is requires. Either of (draft,rejected,under-investigation,resolved)');
          }),
      ];
    }
    case 'update-location': {
      return [
        check.body('location', 'A valid location is needed').exists().isString()
          .custom((value) => {
            const matches = String(value).match(/\d\s,\s\d/g);
            if (matches) {
              const matchCount = matches.length;
              if (matchCount === 0) {
                console.log('bad');
                throw new Error('Wrong Longitude and latitude format');
              }
            }
            return matches;
          }),
      ];
    }
    default: {
      return [];
    }
  }
};

export default validate;
