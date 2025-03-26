const mongoose= require('mongoose')

const orderModel = new mongoose.Schema(
    {
      order:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true,
      },
      status:{
        type: String,
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Returned'],
        default: 'Pending',
      }  
    },{timestamps: true}
)