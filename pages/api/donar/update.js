/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import Donar from '../../../model/Donar';

const verifyToken = (token) => {
    const donar = jwt.verify(token, process.env.jwt_secret);
    if (donar) return donar;
    return null;
};

const update = async (req, res) => {
    // console.log({ data });
    const token = req?.headers?.authorization && req?.headers?.authorization?.split(' ')[1];

    if (token) {
        const response = verifyToken(token);
        if (response) {
            try {
                const data = await Donar.findByIdAndUpdate(
                    response.id,
                    {
                        lat: req.body,
                    },
                    {
                        new: true,
                        upsert: true,
                    }
                ).select('-password');

                res.send(data);
            } catch (error) {
                res.status(404).json({
                    message: error.message,
                });
            }
        } else {
            res.status(401).json({
                message: 'Invalid Request',
            });
        }
    } else {
        res.status(401).json({
            message: 'UnAuthorized Request,Please Login First',
        });
    }
};

export default update;
