import jwt from 'jsonwebtoken';
import config from 'config';

const Auth=(req, res, next) => {
    if (req.headers.token ==='') {
        return res.status(401).json({ status: 401, error: 'Unauthorized' });
    }
    try {
        const decode=jwt.verify(req.headers.token, config.JWT);
        req.userData=decode;
        next();
    } catch (error) {
        return res.status(401).json({ status: 401, error: 'Unauthorized' });
    }
};

export default Auth;
