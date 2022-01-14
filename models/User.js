const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0,     //0: User, 1: admin
    },
},
{timestamps: true}
);

const User = mongoose.model('user',UserSchema);

module.exports = User;