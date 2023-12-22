const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    lab_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LabUser',
        required: "Lab user Id is required!."
    },
    first_name: {
        type: String,
        required: 'First name is required.'
    },
    last_name: {
        type: String,
        required: 'Last name is required.'
    },
    phone_number: {
        type: String,
        required: 'Phone number is required',
        unique: 'Phone already in use'
    },
    results: Array,
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Patient', PatientSchema);