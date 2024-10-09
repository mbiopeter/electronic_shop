const Brands = require('../models/brands');

const add = async (name, subCategory, imageFile) => {

    try {
        // Check for required fields
        if (!subCategory) {
            throw new Error('Sub Category name is required!');
        }
        if (!name) {
            throw new Error('Brand name is required!');
        }

        let productData = {
            name: name,
            SubCategory: subCategory,
        };
        if (imageFile && imageFile.filename) {
            productData.img = imageFile.filename;
        }
        const newBrand = await Brands.create(productData);

        return newBrand;
    } catch (error) {
        throw new Error(error.message);
    }
};


const allBrands = async () => {
    try {
        const allBrands = await Brands.findAll({
            attributes: {
                exclude: ['updatedAt']
            }
        });

        const formattedBrands = allBrands.map(Brands => {
            const formattedDate = new Date(Brands.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            const imageUrl = `http://localhost:4000/${Brands.img}`;
            return {
                ...Brands.dataValues,
                addedDate: formattedDate,
                img: imageUrl
            };
        });

        return formattedBrands;
    } catch (error) {
        throw new Error(error);
    }
}


const oneBrand = async (name) => {
    try {
        const oneBrand = await Brands.findOne({ where: { name: name } });
        return oneBrand;
    } catch (error) {
        throw new Error('Error while fetching sub categories');
    }
};

module.exports = {
    add,
    allBrands,
    oneBrand
}