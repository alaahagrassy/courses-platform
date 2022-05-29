const db = require('../src/Models')
const UserModel = db.Users

checkifUserActive = async (req, res,next)=>{
    const { email } = req.body
    const user = await UserModel.findOne({where:{email :email}})
    if(!user){
        return res.status(404).json({
            message:'User Not Found'
        })
    }
    const Active = user.active
    if(!Active)
    {
        return res.json('You are deactivated by admin')
    }
    next();
}

module.exports = {checkifUserActive}