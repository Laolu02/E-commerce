const mongoose = require('mongoose')

const productModel = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        batch:{
            type:String,
            required:true,
        },
        company:{
            type:String,
            required:true,
        },
        category:{
            type: String,
            required: true,
        },
        price:{
            type: String,
            required: true,
        },
        available:{
            type: Number,
            required: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },{timestamps: true}
)

module.exports = mongoose.model('product', productModel)