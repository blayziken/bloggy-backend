const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true
    },
    contactNumber: {
        type: String,
        required: [true, 'Please provide your contact number'],
        maxlength: 11,
        // select: false
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
