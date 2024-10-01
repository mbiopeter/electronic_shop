const { createProduct, findProduct } = require('../services/productsService');
const upload = require('../utils/upload');

// Express handler for uploading products
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
                variantType: req.body.variantType,
                variant: req.body.variant
            };
            //check if the product already existsw
            await findProduct(productData);

            const product = await createProduct(productData, req.files);

            res.status(201).json({ message: 'Product aded successfully!' });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: error.message });
        }
    });
};

module.exports = {
    uploadProduct
};
