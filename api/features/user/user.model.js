const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    name: {
        type: String,
        required: false,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 100
    },
    phone: {
        type: String,
        required: false,
        unique: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    settings: {
        type: mongoose.Schema.Types.Mixed, // To store user-specific settings
        default: {
            currency: 'USD',
            shipto: 'BD',
            theme: 'light',
            language: 'en',
            country: 'BD',
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);