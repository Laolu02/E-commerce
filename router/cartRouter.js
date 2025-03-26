const {Router} = require('express')
const authMW = require('../Middleware/authMW')
const roleMW = require('../Middleware/roleMW')
const {add_To_cart,remove_From_cart,checkout}= require('../controller/cartController')

const router=Router()
    .post('/product/cart',authMW,add_To_cart)
    .delete('/product/cart', authMW, remove_From_cart)
    .post('/product/checkout', authMW,checkout)

module.exports = router