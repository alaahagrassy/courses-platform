const express = require('express')
const router = express.Router();
const {checkAdmin} = require('../../Middlewares/authorizeAdmin')

const {addCourse,deleteCourse , getCourses , getcourseById,editcourse} = require('../Controllers/CourseController')

router.post('/',checkAdmin , addCourse);
router.get('/' , checkAdmin,getCourses);
router.get('/:id' ,checkAdmin, getcourseById);
router.delete('/:id' ,checkAdmin, deleteCourse);
router.patch('/:id' ,checkAdmin, editcourse);


module.exports = router