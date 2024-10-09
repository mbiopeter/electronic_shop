const {
    add,
    allCategories,
    oneCategory
} = require('../services/categoryService');
const upload = require('../utils/upload');
const { remove } = require('../utils/delete');
const Category = require('../models/category');

const addCategory = (req, res) => {
    try {
        upload.array('images', 1)(req, res, async (err) => {

            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (!req.body.name) {
                return res.status(400).json({ error: 'Category name is required' });
            }

            // Check if the category already exists
            const existingCategory = await oneCategory(req.body.name);
            if (existingCategory) {
                return res.status(400).json({ error: 'Category already exists' });
            }

            // Create a new category in the database
            if (req.files && req.files.length > 0) {
                await add(req.body.name, req.files[0]);
                res.status(200).json({ message: 'Category added successfully' });
            } else {
                return res.status(400).json({ error: 'Image file is required' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await allCategories();
        if (categories) {
            res.status(200).json(categories);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const removeCategory = async (req, res) => {
    try {
        const id = req.query.id;
        const products = await remove(id, Category);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCategories,
    addCategory,
    removeCategory
}
