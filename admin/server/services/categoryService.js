const Category = require('../models/category');

const add = async (name, imageFile) => {
    try {
        // Check for required fields
        if (!name) {
            throw new Error('Category name is required!');
        }

        let productData = {
            name: name,
        };

        if (imageFile && imageFile.filename) {
            productData.img = imageFile.filename; // Update to `img` to match your model
        }

        const category = await Category.create(productData);
        return category;
    } catch (error) {
        throw new Error(error);
    }
}


const categories = async () => {
    try {
        const allCategories = await Category.findAll({
            attributes: {
                exclude: ['updatedAt']
            }
        });

        return allCategories;
    } catch (error) {
        throw new Error(error);
    }
}

const oneCategory = async (name) => {
    try {
        const oneCategory = await Category.findOne({ where: { name: name } });
        return oneCategory;
        return false;
    } catch (error) {
        throw new Error('Error while fetching category');
    }
};

module.exports = {
    add,
    categories,
    oneCategory
}