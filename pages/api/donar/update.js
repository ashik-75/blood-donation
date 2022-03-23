/* eslint-disable no-underscore-dangle */

import Donar from '../../../model/Donar';
import extractToken from '../../../utils/extractToken';
import verifyToken from '../../../utils/verifyToken';

const update = async (req, res) => {
    const token = extractToken(req.headers);

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
                message: 'Invalid Request,Please Login!',
            });
        }
    } else {
        res.status(401).json({
            message: 'UnAuthorized Request,Please Login First',
        });
    }
};

export default update;
