const express = require('express')
const router = express.Router();
const {checkAdmin} = require('../../Middlewares/authorizeAdmin')
const multer = require('multer');
const {addCourse,deleteCourse , getCourses , getcourseById,editcourse} = require('../Controllers/CourseController')


// const storage =multer.diskStorage({
//     destination:function(req, file, cb){
//         cb(null, './uploads/');
//     },
//     filename:function(req, file, cb){
//         cb(null, new Date() + file.originalname);
//     }
// }) 


// const upload = multer({storage: storage})

router.post('/' ,checkAdmin, addCourse);
router.get('/' , checkAdmin,getCourses);
router.get('/:id' ,checkAdmin, getcourseById);
router.delete('/:id' ,checkAdmin, deleteCourse);
router.patch('/:id' ,checkAdmin, editcourse);


module.exports = router