const AppError = require("../utils/appError");

const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}
const prodErrors = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went worng'
        })
    }
}
const castErrorHandler = (err) => {
    let message = `Invalid ${err.path} and for the field ${err.value._id}`
    return new AppError(message, 400);
}
const duplicateErrorHandler = (err) => {
    console.log(err);
    const message = `${err.keyValue.first_name} name already exists`
    return new AppError(message, 400);
}
const validationErrorHandler = (err) => {
    const error = Object.values(err.errors).map(val => val.message);
    const errorMessages = error.join(". ");
    const message = `Invalid input ${errorMessages}`;
    return new AppError(message, 400);
}
const invalidTokenErrorHandler = () => {
    return new AppError('Invalid token,plz login', 401)
}
const jwtExpireHandler = () => {
    return new AppError('Token expired,plz login again!', 401)
}
const errorHandlerMiddleware = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        devErrors(res, error)
    } else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'CastError') error = castErrorHandler(error);
        if (error.code === 11000) error = duplicateErrorHandler(error);
        if (error.name === 'ValidationError') error = validationErrorHandler(error);
        if (error.name === 'JsonWebTokenError') error = invalidTokenErrorHandler();
        if (error.name === 'TokenExpiredError') error = jwtExpireHandler();
        prodErrors(res, error)
    }
}

module.exports = errorHandlerMiddleware;