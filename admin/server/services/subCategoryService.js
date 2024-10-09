const SubCategory = require('../models/subCategory');

const add = async (name, category, imageFile) => {
    try {
        // Check for required fields
        if (!category) {
            throw new Error('Category name is required!');
        }
        if (!name) {
            throw new Error('Sub Category name is required!');
        }

        let productData = {
            name: name,
            category: category,
        };
        if (imageFile && imageFile.filename) {
            productData.img = imageFile.filename;
        }

        const subCategory = await SubCategory.create(productData);
        return subCategory;
    } catch (error) {
        throw new Error(error.message);
    }
};


const allSubCategories = async () => {
    try {
        const allSubCategories = await SubCategory.findAll({
            attributes: {
                exclude: ['updatedAt']
            }
        });

        const formattedSubCategories = allSubCategories.map(subCategory => {
            const formattedDate = new Date(subCategory.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            const imageUrl = `http://localhost:4000/${subCategory.img}`;
            return {
                ...subCategory.dataValues,
                addedDate: formattedDate,
                img: imageUrl
            };
        });

        return formattedSubCategories;
    } catch (error) {
        throw new Error(error);
    }
}


const oneSubCategory = async (name) => {
    try {
        const oneSubCategory = await SubCategory.findOne({ where: { name: name } });
        return oneSubCategory;
    } catch (error) {
        throw new Error('Error while fetching sub categories');
    }
};

module.exports = {
    add,
    allSubCategories,
    oneSubCategory
}