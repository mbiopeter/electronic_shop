const {
    add,
    allSubCategories,
    oneSubCategory
} = require('../services/subCategoryService');
const upload = require('../utils/upload');
const { remove } = require('../utils/delete');
const SubCategory = require('../models/subCategory');

const addSubCategory = (req, res) => {
    try {
        upload.array('images', 1)(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            try {
                const { name, category } = req.body;

                if (!category || category === 'null') {
                    return res.status(400).json({ error: 'Category name is required!' });
                }
                if (!name || name === 'null') {
                    return res.status(400).json({ error: 'Sub Category name is required!' });
                }
                const existingSubCategory = await oneSubCategory(name);
                if (existingSubCategory) {
                    return res.status(400).json({ error: 'Sub Category already exists' });
                }
                if (req.files && req.files.length > 0) {
                    await add(name, category, req.files[0]);
                    return res.status(200).json({ message: 'Sub Category added successfully' });
                } else {
                    return res.status(400).json({ error: 'Image file is required' });
                }
            } catch (serviceError) {
                return res.status(500).json({ error: serviceError.message });
            }
        });
    } catch (controllerError) {
        return res.status(500).json({ error: controllerError.message });
    }
};


const getSubCategories = async (req, res) => {
    try {
        const subCategories = await allSubCategories();
        if (subCategories) {
            res.status(200).json(subCategories);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const removeSubCategory = async (req, res) => {
    try {
        const id = req.query.id;
        const products = await remove(id, SubCategory);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getSubCategories,
    addSubCategory,
    removeSubCategory
}
