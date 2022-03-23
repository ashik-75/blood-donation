import Donar from '../../model/Donar';
import connectDb from '../../utils/connectDB';

connectDb();

const alldonars = async (req, res) => {
    try {
        const donars = await Donar.find().sort({ updatedAt: -1 }).select('-password');

        if (donars.length > 0) {
            res.status(200).send(donars);
        } else {
            res.status(404).json({
                message: 'No More Donors available Right Now!',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export default alldonars;
