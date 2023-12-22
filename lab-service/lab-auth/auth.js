const LabUser = require('../models/lab-user');
const AppError = require('../../utils/appError');
const bcrypt = require('bcryptjs');
const createToken = require('../../utils/token');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        let { username, password } = req.body;
        const lab_user = await LabUser.findOne({ username });
        if (!lab_user) return next(new AppError('Lab user does not exists', 400));
        const comparePassword = bcrypt.compareSync(password, lab_user.password);
        if (!comparePassword) return next(new AppError('Password did not match!', 400));
        const token = jwt.sign({ id: lab_user._id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_TOKEN_EXPIRY}` });
        res.status(200).json({ message: 'Login successfull', lab_user, token });
    } catch (error) {
        next(error)
    }
}

module.exports = login;