const User = require('../models/user');
const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator')
const createToken = require('../utils/token');
const verifyToken = require('../utils/verifyToken');
const AppError = require('../utils/appError');
const sendSms = require('../utils/sms');
const jwt = require('jsonwebtoken');
const Patient = require('../lab-service/models/patient');


//Register
const createUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, phone_number } = req.body;
        const phone_number_exist = await User.findOne({ phone_number });
        if (phone_number_exist) return next(new AppError('Phone number already in use, plz login', 400))
        const OTP = otpGenerator.generate(4,
            {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })

        const sub = `Otp sent to your ${phone_number} - ${OTP}`;

        //const phoneSms = await sendSms(phone_number, sub)
        const exisitingPatient = await Patient.findOne({ phone_number });
        if (exisitingPatient) {
            const createUser = new User({
                first_name,
                last_name,
                email,
                password,
                phone_number,
                otp: OTP
            });
            const user = await createUser.save();
            const updatedPatient = await Patient.findOneAndUpdate({ _id: exisitingPatient._id }, { userId: user._id })
            res.status(200).json({ message: 'Signup successfull', OTP, userId: user._id });
        } else {
            const registerUser = new User({
                first_name,
                last_name,
                email,
                password,
                phone_number,
                otp: OTP
            })
            await registerUser.save();
            res.status(201).json({ message: 'Signup successfull.', OTP, userId: registerUser._id })
        }
    } catch (error) {
        next(error)
    }
}

//send otp
const verify = async (req, res, next) => {
    try {
        const { otp, userId } = req.body;
        if (!userId) return next(new AppError('User id not found', 404))
        const user = await User.findById({ _id: userId });
        if (!user) return res.status(404).json({ message: 'User not found!' });
        if (user.otp !== otp) return res.status(400).json({ message: 'Invalid otp!' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRY })
        user.otp = "";
        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'Otp verified!', token, user })
    } catch (error) {
        next(error)
    }
}

// login
const login = async (req, res, next) => {
    try {
        const { phone_number } = req.body;
        const user = await User.findOne({ phone_number });
        if (!user) return next(new AppError('Phone number not found!', 404));
        const OTP = otpGenerator.generate(4,
            {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
        try {
            const sub = `Otp sent to your ${phone_number} - ${OTP}`;
            // const phoneSms = sendSms(phone_number, sub);
            //console.log(phoneSms)
        } catch (error) {
            res.status(400).json(error);
        }
        user.otp = OTP;
        await user.save();
        res.status(201).json({ message: `Otp send to your phone number ${phone_number}`, OTP, userId: user._id })
    } catch (error) {
        next(error)
    }
}



const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(new AppError('User not found', 404))
        const time = '10m'
        const token = createToken(user._id, process.env.JWT_RESET_PASSWORD_SECRET, time);

        await config.sendMail(msg);
        try {
            let resetLink = await user.updateOne({ resetPasswordLink: token });
        } catch (e) {
            return next(new AppError('Link expired', 401))
        }
        res.status(200).json({ success: true, message: "Password reset link sent." });
    } catch (e) {
        return next(new AppError('something went wront', 500));
    }
}
const resetPassword = async (req, res, next) => {
    try {
        const { resetPasswordLink, newPassword, confirmPassword } = req.body;
        if (resetPasswordLink) {
            let decoded = verifyToken(resetPasswordLink, process.env.JWT_RESET_PASSWORD_SECRET);
            const user = await User.findOne({ resetPasswordLink });
            if (!user) return next(new AppError('No token', 400));
            if (newPassword < 8) return next(new AppError('Password must be minimum 8 character', 400))
            if (newPassword !== confirmPassword) return next(new AppError('Password did not match', 400))
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(newPassword, salt);
            user.password = hash;
            user.resetPasswordLink = '';
            await user.save();
            res.status(201).json({ success: true, message: 'Password updated!.' })
        }
    } catch (e) {
        console.log(e)
        return next(new AppError('Password reset link expired,try again!', 401))
    }

}
module.exports = { createUser, verify, login, forgotPassword, resetPassword }