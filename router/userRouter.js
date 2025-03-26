const {Router} = require('express')
const authMW = require('../Middleware/authMW')
const {signup, login} = require('../controller/userController')
const { Roles, update_A_role } = require('../controller/rolesController')

const router = Router()
    .post('/registration', signup)
    .post('/login', login)
    .put('/update-role/:id',authMW, update_A_role)
    
module.exports = router    