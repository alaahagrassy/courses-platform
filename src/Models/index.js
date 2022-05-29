const {Sequelize , DataTypes} = require('sequelize')
const dbconfig = require('../../config/db.config')
const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect:dbconfig.dialect,
    operatorsAliases:false,

    pool:{
        max:dbconfig.pool.max,
        min:dbconfig.pool.min,
        acquire:dbconfig.pool.acquire,
        idle:dbconfig.pool.idle,
    }
}
)


sequelize.authenticate()
.then(()=>{
    console.log('database is connected');
})
.catch(err=>{
    console.log('Error'+err);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Users = require('./UserModel')(sequelize,DataTypes)
db.Courses = require('./CourseModel')(sequelize,DataTypes)
db.enrolledcourse = require('./EnrolledCourses')(sequelize,DataTypes)
db.Categories = require('./CategoryModel')(sequelize,DataTypes)
db.CategoryCourses = require('./CategoryCourse')(sequelize,DataTypes)


//// UserandcourseRealtion M-M
db.Users.belongsToMany(db.Courses, {  foreignKey: "userId" , through:db.enrolledcourse})

db.Courses.belongsToMany(db.Users , {foreignKey:"courseId" , through:db.enrolledcourse})

///////// categoryandcourseRelation M-M

db.Courses.belongsToMany(db.Categories , {  foreignKey: "courseId" , through:db.CategoryCourses})
db.Categories.belongsToMany(db.Courses, {  foreignKey: "categoryId" , through:db.CategoryCourses})





db.sequelize.sync({ alter: true })
.then(()=>{
    console.log('re-sync done');
})

module.exports = db