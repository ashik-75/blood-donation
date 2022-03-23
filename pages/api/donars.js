// import Donar from '../../model/Donar';
import Donar from '../../model/Donar';
import connectDb from '../../utils/connectDB';

connectDb();
const donars = async (req, res) => {
    const { district, group, upazila } = req.body;

    try {
        const response = await Donar.find({ district, group, upazila })
            .sort({ updatedAt: -1 })
            .select('-password');

        if (response?.length > 0) {
            res.status(200).send(response);
        } else {
            res.status(404).json({
                message: 'Not Found',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export default donars;
