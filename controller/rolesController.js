const roleModel = require('../model/roleModel')
const userModel = require('../model/userModel')


const Roles = async (req,res, next) => {
    const { code}= req.body;
    const passcode = process.env.ADMIN_CODE;
    let regRole = 'user'
    try {
        if (code === passcode) {
            regRole = 'admin'
        }
        const existingRole = await roleModel.findOne({name: regRole});
            if (!existingRole) {
                await roleModel.create({ name: regRole});
            }
        const user = new userModel({...req.body,role: regRole})
        await user.save()
        res.json({message:`Welcome ${regRole}`}).status(200)
        next()
    } catch (error) {
       console.log(error);
        
    }
} 

const update_A_role= async (req,res) => {
    const newRole= req.body.name
    const userId= req.user
    const { code}= req.body;
    const passcode = process.env.ADMIN_CODE;
    try {
        let role = 'user'
        if (code === passcode) {
            role = 'admin'
        }
        const updateRole= await userModel.findByIdAndUpdate(userId, {role, new: true})
        if (!userId) {
            res.json({message: "User not found"})
        }
        await updateRole.save()
        res.json({message: 'Role updated successfully'})
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {Roles, update_A_role}




