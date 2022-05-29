const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const authorizeUser = async (req , res , next)=>{
    try{
        const {id} =req.params
        const token=req.headers.authorization
        const decoded = jwt.verify(token , 'secret')  
        req.Id = decoded.Id
       if(req.Id!==id)
       {
           return res.json('You are not authorized')
       }
        next()
    }catch(err){
        console.error(err.message)
    }
}

module.exports={authorizeUser}