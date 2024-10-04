const Product = require('../models/products');
const {
    createProduct,
    findProduct,
    allProducts,
    outOfStock,
    limitedStock,
    otherStock
} = require('../services/productsService');
const { remove } = require('../utils/delete');
const upload = require('../utils/upload');

// Function for uploading products
const uploadProduct = (req, res) => {
    upload.array('images', 5)(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        try {
            const productData = {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                subCategory: req.body.subCategory,
                brand: req.body.brand,
                price: parseFloat(req.body.price),
                offerPrice: parseFloat(req.body.offerPrice),
                quantity: parseInt(req.body.quantity, 10),
                variantType: {
                    name: req.body.variant,
                    values: Array.isArray(req.body.variantType) ? req.body.variantType : [req.body.variantType]
                }, 
            };
            //check if the product already existswx
            await findProduct(productData);

            //create a new product in the database
            await createProduct(productData, req.files);

            res.status(201).json({ message: 'Product aded successfully!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

//function to get all the products
const getAllProducts = async (req, res) => {
    try {
        const products = await allProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

//function to get out of stock product
const getOutOfStockProducts = async (req, res) => {
    try {
        const products = await outOfStock();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

//function to get limited products
const getLimitedProducts = async (req, res) => {
    try {
        const products = await limitedStock();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

//function to get other products
const getOtherProducts = async (req, res) => {
    try {
        const products = await otherStock();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

//function delete a products
const deleteProduct = async (req, res) => {
    try {
        const id = req.query.id;
        const products = await remove(id, Product);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    uploadProduct,
    getAllProducts,
    getOutOfStockProducts,
    getLimitedProducts,
    getOtherProducts,
    deleteProduct
};
