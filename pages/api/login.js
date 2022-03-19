/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import Donar from '../../model/Donar';
import connectDb from '../../utils/connectDB';
import generateToken from '../../utils/generateToken';

connectDb();
const isPasswordMatch = (password, donarPassword) => {
    return bcrypt.compare(password, donarPassword);
};

const loginDonar = async (req, res) => {
    const { phone, password } = req.body;

    try {
        const donar = await Donar.findOne({ phone });

        if (donar) {
            const isMatched = await isPasswordMatch(password, donar.password);
            const { password: test, ...info } = donar._doc;

            if (isMatched) {
                res.json({
                    donar: info,
                    token: generateToken(info),
                });
            } else {
                res.status(403).json({
                    message: 'Password/Phone Invalid',
                });
            }
        } else {
            res.status(404).json({
                message: 'Password/Phone Invalid',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export default loginDonar;
