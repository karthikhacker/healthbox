const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');
const AppError = require('../utils/appError');
const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = verifyToken(token, process.env.JWT_SECRET);
            // console.log(decoded)
            if (!decoded) return next(new AppError('Invalid token or token expired', 401))
            const { id } = decoded;
            req.user = await User.findById({ _id: id }).select('-password -otp -__v');
            next()
        } catch (error) {
            // console.log('auth', error);
            next(error)
        }
    }
    if (!token) {
        res.status(401).json({ message: 'NOT AUTHORIZED !' })
        return next(new AppError('Not authorized', 401));
    }
}
module.exports = authMiddleware;