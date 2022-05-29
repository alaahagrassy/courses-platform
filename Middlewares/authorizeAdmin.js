const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const db = require('../src/Models')
const UserModel = db.Users
const checkAdmin = async (req , res , next)=>{
    try{
        if(!req.headers.authorization){
            return res.json("authorization failed")
        }
        const token = req.headers.authorization
        const decoded = await verify(token , 'secret')
        req.role = JSON.parse(decoded.role)
        if(req.role !==  "admin")
        return res.json('authorization failed')
        next()
    }catch(err){
       console.error(err.message)
    }
}

module.exports={checkAdmin}