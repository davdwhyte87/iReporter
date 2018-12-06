import check from 'express-validator/check';

const validate=(method) => {
    switch (method) {
        case 'signup': {
            return [
                check.body('firstname', 'A valid First Name is required').exists().isLength({ min: 2 }),
                check.body('lastname', 'A valid Last Name is required').exists().isLength({ min: 2 }),
                check.body('email', 'A valid email is required').exists().isEmail(),
                check.body('phone', 'A valid phone number is required').exists().isLength({ min: 8 }),
                check.body('password', 'A valid password is required. (At least 5 characters)').exists().isLength({ min: 5 }),
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
                check.body('title', 'a valid title is needed').exists(),
                check.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }),
                check.body('comment', 'You need to add a valid comment (At least 300 characters)')
                .exists().isString().isLength({ min: 3 }),
            ];
        }
        default: {
            return [];
        }
    }
};

export default validate;
