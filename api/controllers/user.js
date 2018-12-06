import check from 'express-validator/check';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User, createUserDB, getSingleUserDB } from '../models/User';
import createId from '../helpers/generator';

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
            // check if admin
            if (user.email === config.ADMIN_EMAIL) {
                user.is_admin = 1;
            }
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

const loginUser = (req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return msg;
      };
    const errors = check.validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, error: errors.array({ onlyFirstError: true }) });
    }
    getSingleUserDB([req.body.email]).then((data) => {
        const userData=data.rows[0];
        if (!userData) {
            return res.status(400).json({ status: 400, error: 'This account does not exist!' });
        }
        bcrypt.compare(req.body.password, userData.password, (err, result) => {
            if (err) {
                return res.status(400).json({ status: 400, error: 'An error occurred' });
            }
            if (result) {
                const tokenData=jwt.sign({ id: userData.id, is_admin: userData.is_admin },
                    config.JWT, {
                    expiresIn: '24h',
                });
                delete userData.password;
                return res.status(200).json({ status: 200,
                    data: [{ token: tokenData,
                    user: userData }] });
            }
            return res.status(400).json({ status: 400, error: 'An Authentication error occurred' });
        });
    })
    .catch((error) => {
        return res.status(400).json({ status: 400, error: 'An error occurred' });
    });
};

export { createUser, loginUser };
