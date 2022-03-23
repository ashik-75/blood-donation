import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
    const decodedData = jwt.verify(token, process.env.jwt_secret);

    return decodedData;
};

export default verifyToken;
