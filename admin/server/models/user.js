const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    idNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
});

module.exports = User;
