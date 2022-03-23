import Donar from '../../../../model/Donar';
import verifyToken from '../../../../utils/verifyToken';

const deleteAccount = async (req, res) => {
    const { id } = req.query;
    const token = req.headers?.authorization?.split(' ')[1];
    if (token) {
        const decodedToken = verifyToken(token);

        if (decodedToken && decodedToken.id === id) {
            try {
                await Donar.findByIdAndDelete(id);
                res.json({
                    message: 'Account Deleted!',
                });
            } catch (error) {
                res.status(401).json({
                    message: error.message,
                });
            }
        } else {
            res.status(401).json({
                message: 'UnAuthorized Request',
            });
        }
    } else {
        res.status(401).json({
            message: 'UnAuthorized Request',
        });
    }
};

export default deleteAccount;
