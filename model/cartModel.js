const mongoose= require('mongoose')

const cartModel = new mongoose.Schema(
    {
        items:[{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            quantity : {
                type: Number,
                required: true,
                default: 1,
            },
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },{timestamps: true}
)


module.exports = mongoose.model('cart', cartModel);