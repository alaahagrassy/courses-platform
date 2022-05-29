module.exports = (sequelize, DataTypes) => {

    const enrolledcourse = sequelize.define('enrolledcourse', {      
        Finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {
            timestamps: false
        }
    )
    return enrolledcourse

}