import check from 'express-validator/check';
import bcrypt from 'bcrypt';
import { User, createUserDB, getSingleUserDB } from '../models/User';


const validate=(method) => {
    switch (method) {
        case 'create': {
            return [
                check.body('firstname', 'A valid First Name is required').exists().isLength({ min: 2 }),
                check.body('lastname', 'A valid Last Name is required').exists().isLength({ min: 2 }),
                check.body('email', 'A valid email is required').exists().isEmail(),
                check.body('phone', 'A valid phone number is required').exists().isLength({ min: 8 }),
                check.body('password', 'A valid password is required. (At least 5 characters)').exists().isLength({ min: 5 }),
            ];
        }
        case 'update': {
            return [
                check.body('title', 'a valid title is needed').exists(),
                check.body('title', 'Title is too short, at least 5 characters').isLength({ min: 5 }),
                check.body('comment', 'a valid comment is required').exists().isLength({ min: 5 }),
                check.body('type', 'You need to selected a type').exists().isString(),
                check.body('comment', 'You need to add a valid comment (At least 300 characters)')
                .exists().isString().isLength({ min: 3 }),
                check.body('created_by', 'User Id is needed').exists().isInt(),
                check.body('status', 'A defualt status is required').exists().isString(),
            ];
        }
        default: {
            return [];
        }
    }
};

const createId = () => {
    const id =Math.floor(Math.random()*90000000000) + 100000000000;
    return id;
};

const createUser = (req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    const errors = check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, error: errors.array({ onlyFirstError: true }) });
    }

    getSingleUserDB([req.body.email]).then((data) => {
        const userData=data.rows;
        if (userData.length>0) {
            return res.status(400).json({ status: 400, error: 'This account exists already' });
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ status: 400, error: 'An error occured' });
            }
            const user = User;
            user.id = createId();
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.created_on = new Date();
            user.is_admin = 0;
            user.password = hash;
            createUserDB(user).then(() => {
                delete user.password;
                return res.status(200).json({ status: 200, data: user });
            })
            .catch((error) => {
                console.log(error);
                return res.status(400).json({ status: 400, error: 'An error occurred' });
            });
        });
    })
    .catch((error) => {
        console.log(error);
        return res.status(400).json({ status: 400, error: 'An error occurred' });
    });
};

const loginUser = () => {

};

export { validate, createUser };
