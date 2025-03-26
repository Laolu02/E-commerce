const roleModel = require("../model/roleModel")
const userModel = require("../model/userModel")


const roleMW = (requirredrole) => async (req,res, next) => {
    const role = req.user.role
    const user = req.user
   try {
    if (!user) {
        res.json({message: 'No user'})
    }
    if (!role) {
        return res. status(401).json({message: 'Unauthorized'}) 
     }
     if (role !== requirredrole) {
         return res.status(401).json({message: 'Unauthorized '})
     }
     
     next();
   } catch (error) {
    console.log(error);
    
   }
}

module.exports = roleMW