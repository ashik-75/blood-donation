import Donar from '../../model/Donar';
import connectDb from '../../utils/connectDB';

connectDb();

const alldonars = async (req, res) => {
    try {
        const donars = await Donar.find();

        if (donars.length > 0) {
            res.status(200).send(donars);
        } else {
            res.status(404).json({
                message: 'No Donars available',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export default alldonars;
