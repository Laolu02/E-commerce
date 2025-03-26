const { sign } = require('jsonwebtoken');
const err = require('../Middleware/errorMW');
const generateToken = require('../jwt/tokengenerate')
const userModel = require('../model/userModel')
const {Roles} = require('../controller/rolesController')
const bcrypt = require('bcryptjs')

const signup = async (req, res, next) => {
    const {password, gmail, username, code} = req.body
    if (!password || !gmail || !username) {
        return res.satus(404).json({message: ' All input field must be entered'})
    }
    try {
        const user = await userModel.findOne({gmail, username})
        if (user) {
            return res.status(409).json('User already existed')
        };
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt);
        let regRole = 'user'
        if (code) {
            await Roles()
        }
        const newUser = new userModel({...req.body, password: hashedPassword, role: regRole})
        await newUser.save()
        res.status(200).json({newUser})
    } catch (error) {
        next({status: 500, message: "Something went wrong"}, err)
        console.log(error);
        
        
    }
};
const login = async (req,res) => {
    const {username, password} = req.body
    
    try {
        const user= await userModel.findOne({username})
        if (!user) {
            return res.json({message: ' username or password incorrect'}).status(400)
            
        }
        const comparison = await bcrypt.compare(password, user.password)
            if (!comparison) {
                return res.status(400).json("Username or password incorrect")
                
            }
            const {password: _ , ...userData} = user.toObject();
            const token =  await generateToken (user._id);
            res 
                .cookie('token', token, {
                   httpOnly: true,
                   secure: process.env.NODE_Env ==='production',
                   sameSite: 'strict',
                   maxAge: 3600000 
                })
        res.status(200).json({message: 'Login successfully', user: userData})
        
        
    } catch (error) {
      res.send(error)
      console.log(error);
        
    }
    
}
module.exports={signup, login}