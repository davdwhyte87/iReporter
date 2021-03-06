import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import {
  User,
  createUserDB,
  getSingleUserDB,
  getSingleUserByIdDB,
  updateRecordsDB,
} from '../models/User';
import createId from '../helpers/generator';

/**
 * This class represents a user as an entity
 */
class UserController {
  /**
     * This function creates a user
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @returns {Object} - returns response
     */
  static createUser(req, res) {
    getSingleUserDB([req.body.email]).then((data) => {
      const userData = data.rows;
      console.log(userData);
      if (userData.length > 0) {
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
        user.othernames = req.body.othernames;
        user.username = req.body.username;
        user.email = req.body.email;
        user.phoneNumber = req.body.phone;
        user.createdOn = new Date();
        user.isAdmin = false;
        user.password = hash;
        // check if admin
        if (user.email === process.env.ADMIN_EMAIL) {
          user.isAdmin = true;
        }
        createUserDB(user).then(() => {
          delete user.password;
          const tokenData = jwt.sign({
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          config.JWT, {
            expiresIn: '24h',
          });
          const filteredUser = user;
          delete filteredUser.password;
          return res.status(201).json({
            status: 201,
            data: [{ token: tokenData, user: filteredUser }],
          });
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
  }

  /**
   * This function logs a user in
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} - returns a response object
   */
  static loginUser(req, res) {
    getSingleUserDB([req.body.email]).then((data) => {
      const userData = data.rows[0];
      if (!userData) {
        return res.status(400).json({ status: 400, error: 'This account does not exist!' });
      }
      bcrypt.compare(req.body.password, userData.password, (err, result) => {
        if (err) {
          return res.status(400).json({ status: 400, error: 'An error occurred' });
        }
        if (result) {
          const tokenData = jwt.sign({
            id: userData.id,
            email: userData.email,
            isAdmin: userData.isAdmin,
          },
          config.JWT, {
            expiresIn: '24h',
          });
          delete userData.password;
          return res.status(200).json({
            status: 200,
            data: [{
              token: tokenData,
              user: userData,
            }],
          });
        }
        return res.status(400).json({ status: 400, error: 'An Authentication error occurred' });
      });
    })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }

  /**
   * This function updates a user
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @returns {Object} - returns response
   */
  static updateUser(req, res) {
    const userId = req.userData.id;
    getSingleUserByIdDB([userId]).then((data) => {
      const userData = data.rows;
      const [originalUserData] = userData;
      if (userData.length === 0) {
        return res.status(400).json({ status: 400, error: 'This account does not exist' });
      }
      const user = User;
      user.id = originalUserData.id;
      user.firstname = req.body.firstname || originalUserData.firstname;
      user.lastname = req.body.lastname || originalUserData.lastname;
      user.othernames = req.body.othernames || originalUserData.othernames;
      user.username = req.body.username || originalUserData.username;
      user.email = originalUserData.email;
      user.phoneNumber = req.body.phone || originalUserData.phoneNumber;
      user.createdOn = originalUserData.createdOn;
      user.isAdmin = originalUserData.isAdmin;
      user.password = originalUserData.password;
      updateRecordsDB(user).then((updateData) => {
        const newUser = user;
        delete newUser.password;
        console.log(updateData);
        return res.status(200).json({
          status: 200,
          data: [{ user: newUser, message: 'User data updated' }],
        });
      })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ status: 400, error: 'An error occurred' });
        });
    })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ status: 400, error: 'An error occurred' });
      });
  }
}

export default UserController;
