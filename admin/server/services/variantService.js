const Variants = require('../models/variants');

const addVariant = async (name, variantType) => {
    try {
        if (!name) {
            throw new Error('Name field is required!')
        }
        if (!variantType) {
            throw new Error('variant type field is required!')
        }
        const variant = await Variants.create({ variantType, name });
        return variant;
    } catch (err) {
        throw new Error(err);
    }
}

const allVariants = async () => {
    try {
        const allVariants = await Variants.findAll({
            attributes: { exclude: ['updatedAt'] }
        })
        const formattedVariant = allVariants.map(variant => {
            const formattedDate = new Date(variant.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            return {
                ...variant.dataValues,
                addedDate: formattedDate,
            };
        });
        return formattedVariant;
    } catch (err) {
        throw new Error(err);
    }
}

const oneVariant = async (name) => {
    try {
        if (!name) {
            throw new Error('Variant name is required!');
        }
        return await Variants.findOne({ where: { name: name } });
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    addVariant,
    allVariants,
    oneVariant
}