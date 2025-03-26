const {Router} = require('express')
const authMW = require('../Middleware/authMW')
const roleMW = require('../Middleware/roleMW')
const {create_product, delete_A_product,update_A_product, searchProducts} = require('../controller/productController')

const router = Router()
    .post('/product/create', authMW,create_product)
    .delete('/product/:id', authMW,roleMW('admin'), delete_A_product)
    .put('/product/:id', authMW, update_A_product)
    .get('/product/query', searchProducts)

module.exports = router