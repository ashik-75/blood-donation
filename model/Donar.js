import mongoose from 'mongoose';

const donarSchema = new mongoose.Schema(
    {
        name: String,
        phone: {
            unique: true,
            type: String,
            minlength: 11,
            maxlength: 11,
        },
        district: String,
        upazila: String,
        address: String,

        lat: String,
        group: String,
        gender: String,
        password: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Donar = mongoose.models.Donar || mongoose.model('Donar', donarSchema);

export default Donar;
