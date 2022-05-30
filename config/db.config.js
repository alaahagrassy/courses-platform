require('dotenv').config();
require('mysql2')
module.exports = {
    HOST : '127.0.0.1',
    USER:'root',
    PASSWORD: process.env.Passworddatabase,
    DB:'coursesplateform',
    dialect :'mysql',


    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}