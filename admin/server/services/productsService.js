const Product = require('../models/products');
const { Op } = require('sequelize');

const createProduct = async (productData, imageFiles) => {
    try {
        // Check for required fields
        const requiredFields = ['name', 'description', 'category', 'subCategory', 'brand', 'price', 'quantity', 'variantType', 'variant'];
        for (const field of requiredFields) {
            if (!productData[field]) {
                throw new Error(`${field} Field is required`);
            }
        }
        // Extract image file names to store in database
        const imageUrls = imageFiles.map(file => `${file.filename}`);
        productData.images = imageUrls;

        // Create a new product in the database
        const product = await Product.create(productData);
        return product;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};

const findProduct = async (productData) => {
    const product = await Product.findOne({
        where: {
            [Op.and]: [
                { name: productData.name },
                { description: productData.description },
                { category: productData.category },
                { subCategory: productData.subCategory },
                { brand: productData.brand },
                { variantType: productData.variantType },
                { variant: productData.variant },
            ]
        }
    });
    if (product) {
        throw new Error('Product already exists!')
    }
}

module.exports = {
    createProduct,
    findProduct
};
