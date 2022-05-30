const db = require('../Models')
const CourseModel = db.Courses
const categoriesModel = db.Categories


//add new course function
addCourse = async (req, res) => {
    const { name, description, category } = req.body
    const Image = req.file.path
    const NewCourse = await CourseModel.create({
        name, description, category
    })
    const categories = await categoriesModel.findOne({ where: { name: category } })

    if (!categories) {
        return res.status(404).json('Not Found')
    } 
        NewCourse.addCategory(categories).then(data => {
            res.status(201).json({
                message: "added successfully",
            });
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    
}

//delete course function
deleteCourse = async (req, res) => {
    const { id } = req.params

    const Course = await CourseModel.destroy({ where: { id: id } }).then(data => {
        if (!data) {
            return res.status(404).json('Not Found')
        }
        res.status(200).json("Deleted")
    }).catch(err => {
        res.status(500).json({
            Error: err
        })
    })

}
//get list of courses function

getCourses = async (req, res) => {

    const courses = await CourseModel.findAll({ raw: true }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).json({
            message: 'Server Error'
        })
    })
}


getcourseById = async (req, res) => {
    const { id } = req.params
    const course = await CourseModel.findOne({ where: { id: id } }).then(data => {
        if (!data) {
            return res.status(404).json({
                message: 'Not Found'
            })
        }
        res.send(data)
    }).catch(err => {
        res.status(500).json({
            message: 'Server Error'
        })
    })
}

editcourse = async (req, res) => {
    const { id } = req.params
    const { name, description , category } = req.body
    const findcourse = await CourseModel.findOne({ where: { id: id } })
    if (!findcourse) {
        res.status(404).json('Not Found')
    }
    const dataupdated = {
        name: name,
        description: description,
        category:category
    }
    const updated = await findcourse.update(dataupdated)
    res.status(200).json({
        message: 'updated Successfully'
    })
}


module.exports = { addCourse, deleteCourse, getCourses, getcourseById, editcourse }