const db = require('../Models')
const UserModel = db.Users

//create new admin

newAdmin = async(req, res)=>{
    const {userName ,email , password} = req.body

    const emailcheck = await UserModel.findOne({
        where: { email: email }
    })
    if (emailcheck) {
        return res.status(409).json({
            message: "E-mail exists"
        })
    }

    const userNameCheck = await UserModel.findOne({
        where: { userName: userName }
    })
    if (userNameCheck) {
        return res.status(409).json({
            message: "Username is taken"
        })
    }
    const user = await UserModel.create({
        userName, email, password , role:"admin"
    })
    try {
        const newUser = await user.save();
        const token = await newUser.generateToken()
        if (!token) throw new Error('somthing failed')
        res.json({ token })
    } catch (err) {
        throw new Error('this user already exists')

    }

}
// deactivated users

updatedUser = async(req , res)=>{
    const { id } = req.params
    const user = await UserModel.findOne({where :{id : id}})
    user.active = !user.active
    user.save(
        res.json({
            message : "edit successfully"
        })
    )
}


module.exports = { newAdmin , updatedUser}