const express = require('express')
const router = express.Router();
const  {checkifUserActive} = require('../../Middlewares/checkuserActive')
const {authorizeUser} = require('../../Middlewares/authorizeUser')
const {checkAdmin}  =require('../../Middlewares/authorizeAdmin')

const {register,login , EditUser , Enrolle,leaveCourse , finshedCourse , getusers } = require('../Controllers/UserController')

router.post("/register" , register);
router.post("/login",checkifUserActive,login )
router.get("/", checkAdmin,getusers )
router.patch('/:id' ,authorizeUser, EditUser)
router.post('/:id/courses/:cid' ,authorizeUser, Enrolle)
router.delete('/:id/courses/:cid' ,authorizeUser, leaveCourse)
router.patch('/:uid/courses/:cid' , authorizeUser,  finshedCourse)

module.exports = router