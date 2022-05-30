const db = require('../Models')
const UserModel = db.Users
const CourseModel = db.Courses
const junctionTable = db.enrolledcourse
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
require('dotenv').config();

/// registration funstion
register = async (req, res) => {
    const { userName, email, password } = req.body

    // check form email duplicating
    const emailcheck = await UserModel.findOne({
        where: { email: email }
    })
    if (emailcheck) {
        return res.status(409).json({
            message: "E-mail exists"
        })
    }

    // check for userName duplicating 

    const userNameCheck = await UserModel.findOne({
        where: { userName: userName }
    })
    if (userNameCheck) {
        return res.status(409).json({
            message: "Username is taken"
        })
    }

    //registering
    const user = await UserModel.create({
        userName, email, password
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


// get all users
getusers = async (req , res)=>{
    const user = await UserModel.findAll({raw : true ,  attributes: {exclude: ['password']}}).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({
            Error:err
        })
    })
}


///logIn function
login = async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ where: { email: email } })
    const Id = JSON.stringify(user.id)
    const userName = JSON.stringify(user.userName)
    const Email = JSON.stringify(user.email)
    const score = JSON.stringify(user.score)
    const active = JSON.stringify(user.active)
    const role = JSON.stringify(user.role)
    if (user) {
        const token = jwt.sign({ Id, userName, Email, score, active, role }, process.env.JWT_SECRET)
        user.validPassword(password).then(valid => {
            if (!valid) {
                return res.status(400).json({
                    message: 'Invalid email or password'
                })
            }
            if (!token) throw new Error('Failed')
            res.status(200).json({ token })
        })
    }
    else {
        return res.status(400).json({
            message: 'User Not Found'
        })
    }
}

//EditUsers funsction
EditUser = async (req, res) => {
    const { id } = req.params
    const { userName, email, password } = req.body
    const finduser = await UserModel.findOne({ where: { id: id } })
    if (!finduser) {
        res.status(404).json('Not Found')
    }
    const dataupdated = {
        userName: userName,
        email: email,
        password: password
    }
    const updated = await finduser.update(dataupdated, { where: { id: id } })
    res.status(200).json({
        message: 'updated Successfully'
    })
}

//enrolled course function

Enrolle = async (req, res) => {

    const { id, cid } = req.params
    const User = await UserModel.findOne({ where: { id: id } })
    const CoursestoEnroll = await CourseModel.findOne({ where: { id: cid } })
    if (!User || !CoursestoEnroll) {
        res.status(404).json('Not Found')
    }
    User.addCourse(CoursestoEnroll).then((data) => {
        res.json("Enrolled Successfully")
    }).catch(err => {
        res.json(err)
    })
}

/// leave Course fundction

leaveCourse = async (req, res) => {
    const { id, cid } = req.params
    const User = await UserModel.findOne({ where: { id: id } })
    const leaveCourse = await CourseModel.findOne({ where: { id: cid } })
    if (!User || !leaveCourse) {
        res.status(400).json('Not Found')
    }
    User.removeCourse(leaveCourse).then((data) => {
        res.json("Deleted")
    }).catch(err => {
        res.status(500).json(
            {
                Error: err,
                message: "Failed"
            }
        )
    })
}

//finshed course function 

finshedCourse = async (req, res) => {
    const { uid, cid } = req.params
    const userScore = await UserModel.findOne({ where: { id: uid } })
    let score = userScore.score + 5
    const FindenrolledCourse = await junctionTable.findOne({
        where: {
            [Op.and]: [
                { courseId: cid },
                { userId: uid }
            ]
        },
    })
    if (!userScore || !FindenrolledCourse) {
        res.status(404).json({
            message: 'Not Found'
        })
    }
    FindenrolledCourse.update({ Finished: true }).then(data => {
        userScore.update({ score: score })
        res.status(201).json({
            message: 'Finshed and You get the points'

        })
    }).catch(err => {
        res.status(500).json({ message: 'Server Error', err })
    })
}







module.exports = { register, login, EditUser, Enrolle, leaveCourse, finshedCourse , getusers } 