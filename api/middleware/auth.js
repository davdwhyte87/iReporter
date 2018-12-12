import jwt from 'jsonwebtoken';
import config from 'config';

const Auth = (req, res, next) => {
  if (req.headers.token === '') {
    return res.status(401).json({ status: 401, error: 'Unauthorized' });
  }
  jwt.verify(req.headers.token, config.JWT, (error, decode) => {
    if (error) {
      return res.status(401).json({ status: 401, error: 'Unauthorized' });
    }
    req.userData = decode;
    next();
  });
};

export default Auth;
