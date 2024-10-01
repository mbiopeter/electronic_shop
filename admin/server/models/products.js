const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subCategory: {
        type: DataTypes.STRING,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    offerPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    variantType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    variant: {
        type: DataTypes.STRING,
        allowNull: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: true,
});

module.exports = Product;
