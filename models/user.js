const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: 'First name is required',
        unique: true
    },
    last_name: {
        type: String,
        required: 'Last name is required'
    },
    email: {
        type: String,
        unique: 'Email already taken',
        default: ''
    },
    password: {
        type: String,
        min: [8, 'Password should be minimum 8 characters.'],
        max: [16, 'Password should not be more than 16 characters'],
        select: false,
        default: '',
    },
    phone_number: {
        type: Number,
        unique: 'Mobile number already in use.',
        required: 'Mobile number is required.'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordLink: {
        type: String,
        data: ''
    },
    otp: { type: String },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', UserSchema);