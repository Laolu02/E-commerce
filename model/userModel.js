const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        gmail: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type:String,
            ref: 'role'
        },
        code:{
            type: String,
            required: false,
        }
    }, {timestamps: true}
 );

 module.exports = mongoose.model('user', userModel)