const LabUser = require('../models/lab-user');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/appError');

const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return next(new AppError('Invalid token or token expired', 401))
            req.user = await LabUser.findById({ _id: decoded.id }).select('-password  -__v');
            next()
        } catch (error) {
            console.log('auth', error);
            next(error)
        }
    }
    if (!token) {
        res.status(401).json({ message: 'NOT AUTHORIZED !' })
        return next(new AppError('Not authorized', 401));
    }
}
module.exports = authMiddleware;