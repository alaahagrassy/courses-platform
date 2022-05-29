module.exports = (sequelize, DataTypes) => {

    const Course = sequelize.define('course', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        category:{
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:false
    }
    )
    return Course
    
}