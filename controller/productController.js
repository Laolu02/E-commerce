const productModel= require("../model/productModel")
const userModel = require( "../model/userModel")


const create_product = async (req, res) => {
    const userId = req.user.id
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            res.json({message: 'Login to proceed'})
        }
        const newProduct = await new productModel({...req.body, userId})
        await newProduct.save()
        res.json(newProduct)
    } catch (error) {
        console.log(error);
    }
}

const delete_A_product = async (req,res) => {
    const userId = req.user
    const {id} = req.params
    try {
        const user= await userModel.findById(userId)
        if (!user) {
            res.json({message: 'Login to proceed'})
        }
        const product= await productModel.findById(id)
        if (!product) {
            res.json({message: "Can't find product"})
        }
        const deleteProduct = await productModel.findByIdAndDelete(product)
        res.json({message:'Delete successful'})
    } catch (error) {
        console.log(error);
        
    }
}

const update_A_product = async (req,res) => {
    const userId = req.user
    const {id} = req.params
    const updates = req.body;
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            res.json({message: 'Login to proceed'})
        }
        const product = await productModel.findById(id)
        if (!product) {
            res.json({message: 'No product found'})
        }
        if (!userId || !id) {
            return res.status(401).json({message: 'Unauthorized action'})
        }
        if (!product.userId || !userId._id) {
            res.json({message: 'Unauthorized action'})
        }
        const update= await productModel.findByIdAndUpdate(id, updates, {new: true , runValidators: true})
        await update.save()
        res.json(update)
    } catch (error) {
        console.log(error);
        
    }
}

const searchProducts = async (params) => {
    const {search} = req.query
    try {
        const searched = search.split('')
    const querySearch= {
        $or: searched.map (eachword =>({
            content : {$regex: search, $options: 'i'}
        }))
    };
    const result= await product.find(querySearch)
    res.json(result)
    } catch (error) {
        console.log(error);
        
    }
}

module.exports ={create_product,delete_A_product,update_A_product,searchProducts}