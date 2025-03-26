const userModel = require('../model/userModel')
const productModel = require('../model/productModel')
const cartModel = require('../model/cartModel')
const orderModel= require('../model/orderModel')

const add_To_cart = async (req,res) => {
    const userId = req.user
    const productId= req.params
    const {quantity} = req.body
    try {
        const product = await productModel.findById(productId)
        if (!product) {
            res.json({message: 'Product not found'})
        }
        let cart= await cartModel.findOne(userId)
        if (!cart) {
            cart= new cartModel({userId, product:[]})
        }
        const existingProduct = await cart.items.find(productId)
        if (existingProduct) {
            existingProduct.quantity += quantity
        }
        cart.items.push({product,quantity, price: product.price})
        await cart.save()
        res.json({message: 'Product added to cart'})
    } catch (error) {
        console.log(error);
        
    }
}

const remove_From_cart = async (req,res) => {
    const userId = req.user
    const productId= req.params
    try {
        const cart= await cartModel.findOne(userId)
        cart.items = cart.items.filter(item.productId !== productId)
        await cart.save()
        res.json({cart , message: 'Product removed from cart'})
    } catch (error) {
        console.log(error);
        
    }
}

const checkout = async (req,res) => {
    const userId= req.user
    const items = req.cart
    try {
        const cart= await cartModel.findOne(userId).populate(items)
        if (!cart || cart.items.length === 0) {
            res.json({message: 'Cart is empty'})
        }
        const productAvailable = await productModel(available)
        if (productAvailable < cart.quantity) {
            res.json({message: 'Stock not enough'})
        }
        const order = await new orderModel({...req.body})
        await order.save();
        const deduction = await productModel.findById(items)
         deduction.available -= items.quantity
         await deduction.save();
        const clear_cart = cart.items= []
        await clear_cart.save()
        res.json({message: 'Checkout successful'})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {add_To_cart,remove_From_cart,checkout,}