module.exports = (sequelize, DataTypes) => {

    const Categorycourse = sequelize.define('Categorycourse', {
    },
        {
            timestamps: false
        }
    )
    return Categorycourse

}