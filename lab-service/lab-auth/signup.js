const LabUser = require('../models/lab-user');
const AppError = require('../../utils/appError');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
    try {
        const { username, email, password, lab_name, lab_owner_name, lab_contact_number, lab_address, lab_location_lat, lab_location_lon, lab_zipcode } = req.body;

        const existing_lab_user = await LabUser.findOne({ username });
        const existingContactnumber = await LabUser.findOne({ lab_contact_number });
        const existingEmail = await LabUser.findOne({ email });

        if (existingContactnumber) return next(new AppError('Lab contact number already exists!', 400));
        if (existingEmail) return next(new AppError('Email already in use', 400));
        if (existing_lab_user) return next(new AppError('Lab user exists', 400));
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const lab_user = new LabUser({
            username,
            email,
            password: hashedPassword,
            lab_name,
            lab_owner_name,
            lab_contact_number,
            lab_address,
            lab_zipcode,
            lab_location_lat,
            lab_location_lon
        });
        const saved_lab_user = await lab_user.save();
        res.status(201).json({ message: 'Signup successfull', saved_lab_user })

    } catch (error) {
        next(error)
    }
}

module.exports = signup;