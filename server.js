const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const PORT = 3000
require('./src/Models')
const UserRouter = require('./src/Routers/UserRouter')
const CourseRouter = require('./src/Routers/CourseRouter')
const CategoryRouter = require('./src/Routers/CategoryRouter')
const AdminRouter = require('./src/Routers/AdminRouter')



//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//user router
app.use('/users' , UserRouter)

//course router
app.use('/course' , CourseRouter)

//category router
app.use('/category' , CategoryRouter)

//admin router
app.use('/admin' , AdminRouter)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

