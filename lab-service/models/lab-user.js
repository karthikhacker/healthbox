const mongoose = require('mongoose');

const LabUser = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: 'Username already taken'
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: [true, 'Email already taken'],
        index: [true, 'Email already in use']
    },
    password: {
        type: String,
        required: 'Password is required.'
    },
    lab_name: {
        type: String,
        required: 'Lab name is required !'
    },
    lab_owner_name: {
        type: String,
        required: 'Lab owner name is required!'
    },
    lab_contact_number: {
        type: String,
        required: 'Contact details required.',
        unique: [true, 'Contact number exists'],
        index: [true, 'contact number already in use']
    },
    lab_address: {
        type: String,
        required: 'Lab contact address required!.'
    },
    lab_zipcode: {
        type: String,
        required: 'Lab zip code  required!.'
    },
    lab_location_lat: {
        type: String,
        required: 'Latitude is required'
    },
    lab_location_lon: {
        type: String,
        required: 'Longitude is required.'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('LabUser', LabUser);