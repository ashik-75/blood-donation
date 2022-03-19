import bcrypt from 'bcrypt';
import Donar from '../../model/Donar';
import connectDb from '../../utils/connectDB';
import generateToken from '../../utils/generateToken';

connectDb();

const hashPassword = (password) => {
    return bcrypt.hash(password, 10);
};

const registerDonar = async (req, res) => {
    const { name, email, phone, gender, dob, lat, group, password, address, upazila, district } =
        req.body;

    try {
        const checkPhoneNumber = await Donar.findOne({ phone });

        if (checkPhoneNumber) {
            res.status(409).json({
                message: 'This phone number has already been taken,Use New One!',
            });
        }
        const donar = await Donar.create({
            name,
            email,
            phone,
            gender,
            dob,
            lat,
            group,
            address,
            upazila,
            district,
            password: await hashPassword(password),
        });

        if (donar) {
            const { password: sectet, ...othersInfo } = donar?._doc;
            res.json({
                donar: othersInfo,
                token: generateToken({
                    othersInfo,
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
