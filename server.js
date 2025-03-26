
const express = require('express')
const userRouter = require('./router/userRouter')
const productRouter = require('./router/productRouter')
const cartRouter = require('./router/cartRouter')
const connectdb = require("./db/dbcontroller")
const err = require('./Middleware/errorMW')
const cookieParser = require('cookie-parser')

const app = express()

require('dotenv').config();
const port = process.env.PORT;
connectdb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api', userRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)



app.use(err)   
app.listen(port )

