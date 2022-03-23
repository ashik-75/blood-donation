/* eslint-disable no-underscore-dangle */
import Donar from '../../../model/Donar';
import extractToken from '../../../utils/extractToken';
import generateToken from '../../../utils/generateToken';
import verifyToken from '../../../utils/verifyToken';

const updateInfo = async (req, res) => {
    const token = extractToken(req.headers);
    if (token) {
        const decodedData = verifyToken(token);
        if (decodedData) {
            const { id } = decodedData;
            try {
                const donar = await Donar.findByIdAndUpdate(id, req.body, {
                    new: true,
                }).select('-password');

                res.json({
                    donar,
                    token: generateToken({
                        id: donar._id,
                        name: donar.name,
                        isAdmin: donar.isAdmin,
                    }),
                });
            } catch (error) {
                res.status(401).send(error.message);
            }
        } else {
            res.status(404).json({
                message: 'UnAuthorized Request,Please Login!',
            });
        }
    } else {
        res.status(401).json({
            message: 'UnAuthorized Request,Please Login!',
        });
    }
};

export default updateInfo;
