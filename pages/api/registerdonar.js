/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import Donar from '../../model/Donar';
import connectDb from '../../utils/connectDB';
import generateToken from '../../utils/generateToken';

connectDb();

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};

const registerDonar = async (req, res) => {
    const { phone, password } = req.body;

    try {
        const checkPhoneNumber = await Donar.findOne({ phone });

        if (checkPhoneNumber) {
            res.status(409).json({
                message: 'This phone number has already been taken,Use New One!',
            });
        }
        const donar = await Donar.create({
            ...req.body,
            password: await hashPassword(password),
        });

        if (donar) {
            // eslint-disable-next-line no-unsafe-optional-chaining
            const { password: secret, ...othersInfo } = donar._doc;
            res.json({
                donar: othersInfo,
                token: generateToken({
                    id: donar._id,
                    name: donar.name,
                    isAdmin: donar.isAdmin,
                }),
            });
        } else {
            res.status(500).json({
                message: 'Server Problem',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export default registerDonar;
