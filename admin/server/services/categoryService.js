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
            productData.img = imageFile.filename;
        }

        const category = await Category.create(productData);
        return category;
    } catch (error) {
        throw new Error(error);
    }
}


const allCategories = async () => {
    try {
        const allCategories = await Category.findAll({
            attributes: {
                exclude: ['updatedAt']
            }
        });

        const formattedCategories = allCategories.map(category => {
            const formattedDate = new Date(category.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            const imageUrl = `http://localhost:4000/${category.img}`;
            return {
                ...category.dataValues,
                addedDate: formattedDate,
                img: imageUrl
            };
        });

        return formattedCategories;
    } catch (error) {
        throw new Error(error);
    }
}


const oneCategory = async (name) => {
    try {
        const oneCategory = await Category.findOne({ where: { name: name } });
        return oneCategory;
    } catch (error) {
        throw new Error('Error while fetching category');
    }
};

module.exports = {
    add,
    allCategories,
    oneCategory
}