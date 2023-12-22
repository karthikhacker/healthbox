const User = require('../models/user');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const Patient = require('../lab-service/models/patient');

const getProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("profile", error)
        next(error)
    }

}

const updateProfile = async (req, res, next) => {
    try {
        const { first_name, last_name, email } = req.body;
        const user = await User.findById({ _id: req.user._id });
        if (!user) return next(new AppError('User not found', 404));
        const userData = {
            first_name,
            last_name,
            email
        }
        const updatedProfile = await User.findByIdAndUpdate({ _id: req.user._id }, userData, { new: true });
        res.status(201).json({ message: "Profile updated" })
    } catch (error) {
        next(error)
    }
}

const getReport = async (req, res, next) => {
    try {
        const report = await Patient.findOne({ userId: req.user._id });
        if (!report) return next(new AppError('No reports found.', 400))
        res.status(200).json({ data: report });
    } catch (error) {
        next(error)
    }

}

module.exports = { getProfile, updateProfile, getReport }