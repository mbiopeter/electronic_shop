const Product = require('../models/products');
const { Op, where } = require('sequelize');

const createProduct = async (productData, imageFiles) => {
    try {
        // Check for required fields
        const requiredFields = ['name', 'description', 'category', 'subCategory', 'brand', 'price', 'quantity'];
        for (const field of requiredFields) {
            if (!productData[field]) {
                throw new Error(`${field} Field is required`);
            }
        }
        const imageUrls = imageFiles.map(file => `${file.filename}`);
        productData.images = imageUrls;

        const product = await Product.create(productData);
        return product;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
};
//function to check whether a product exists
const findProduct = async (productData) => {
    const product = await Product.findOne({
        where: {
            [Op.and]: [
                { name: productData.name },
                { description: productData.description },
                { category: productData.category },
                { subCategory: productData.subCategory },
                { brand: productData.brand }
            ]
        }
    });
    if (product) {
        throw new Error('Product already exists!')
    }
}

//function to get all the products in the
const allProducts = async () => {
    try {
        // Fetch all the products from the database
        const products = await Product.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (!products) {
            throw new Error('Error fetching products');
        }

        // Format the products to match the desired output
        const formattedProducts = products.map(product => {
            const imgs = product.images ? JSON.parse(product.images) : [];
            const imageUrl = imgs.map(img => `http://localhost:4000/${img}`);
            return {
                id: product.id,
                img: imageUrl[0] || null,
                imageUrl,
                name: product.name,
                category: product.category,
                sub_category: product.subCategory,
                brand: product.brand,
                desc: product.description,
                price: parseFloat(product.price),
                offerPrice: parseFloat(product.offerPrice),
                quantity: product.quantity,
                variantType: product.variantType ? JSON.parse(product.variantType) : [],
            };
        });

        return formattedProducts;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

// Function to fetch out of stock products
const outOfStock = async () => {
    try {
        const products = await Product.findAll({
            where: {
                quantity: {
                    [Op.lte]: 0
                }
            }
        });

        const formattedProducts = products.map(product => {
            const imgs = product.images ? JSON.parse(product.images) : [];
            const imageUrl = imgs.map(img => `http://localhost:4000/${img}`);
            return {
                id: product.id,
                img: imageUrl[0] || null,
                imageUrl,
                name: product.name,
                category: product.category,
                sub_category: product.subCategory,
                brand: product.brand,
                desc: product.description,
                price: parseFloat(product.price),
                offerPrice: parseFloat(product.offerPrice),
                quantity: product.quantity,
                variantType: product.variantType ? JSON.parse(product.variantType) : [],
            };
        });

        return formattedProducts;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

// Function to fetch limited stock products
const limitedStock = async () => {
    try {
        const products = await Product.findAll({
            where: {
                quantity: {
                    [Op.gt]: 0,
                    [Op.lt]: 30
                }
            }
        });

        const formattedProducts = products.map(product => {
            const imgs = product.images ? JSON.parse(product.images) : [];
            const imageUrl = imgs.map(img => `http://localhost:4000/${img}`);
            return {
                id: product.id,
                img: imageUrl[0] || null,
                imageUrl,
                name: product.name,
                category: product.category,
                sub_category: product.subCategory,
                brand: product.brand,
                desc: product.description,
                price: parseFloat(product.price),
                offerPrice: parseFloat(product.offerPrice),
                quantity: product.quantity,
                variantType: product.variantType ? JSON.parse(product.variantType) : [],
            };
        });

        return formattedProducts;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};

// Function to fetch other stock products
const otherStock = async () => {
    try {
        const products = await Product.findAll({
            where: {
                quantity: {
                    [Op.gt]: 29,
                    [Op.lt]: 100
                }
            }
        });

        const formattedProducts = products.map(product => {
            const imgs = product.images ? JSON.parse(product.images) : [];
            const imageUrl = imgs.map(img => `http://localhost:4000/${img}`);
            return {
                id: product.id,
                img: imageUrl[0] || null,
                imageUrl,
                name: product.name,
                category: product.category,
                sub_category: product.subCategory,
                brand: product.brand,
                desc: product.description,
                price: parseFloat(product.price),
                offerPrice: parseFloat(product.offerPrice),
                quantity: product.quantity,
                variantType: product.variantType ? JSON.parse(product.variantType) : [],
            };
        });

        return formattedProducts;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};


module.exports = {
    createProduct,
    findProduct,
    allProducts,
    outOfStock,
    limitedStock,
    otherStock
};
