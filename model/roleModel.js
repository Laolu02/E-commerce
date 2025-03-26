const mongoose = require('mongoose')

const roleModel = new mongoose.Schema(
    {
        name :{
            type: String,
            enum:['user', 'admin'],
            unique: true,
        },
    }
)

module.exports = mongoose.model('role', roleModel)