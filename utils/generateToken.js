import jwt from 'jsonwebtoken';

const generateToken = (info) => {
    return jwt.sign(info, process.env.jwt_secret);
};

export default generateToken;
