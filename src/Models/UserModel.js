const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const sign = util.promisify(jwt.sign)

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            // primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },

    },
        {
            timestamps: false,
            hooks: {
                beforeCreate: async function (user) {
                    hashedPassword = user.password
                    if (hashedPassword) {
                        const salt = await bcrypt.genSaltSync(10);
                        hashedPassword = bcrypt.hash(user.password, salt);
                    }
                },
                beforeUpdate: async function (user) {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            }
        })

    User.prototype.validPassword = async function (pass) {
        return await bcrypt.compare(pass, this.password);
    }

    //  didn't work :'(
    User.prototype.generateToken = async () => {
        return sign(
            {
                id: JSON.stringify(this.id),
                userName: JSON.stringify(this.thisName),
                email: JSON.stringify(this.email),
                score: JSON.stringify(this.score),
                active: JSON.stringify(this.active),
                role: JSON.stringify(this.role),
            },
            'secret',
        )
    }
    return User
}



