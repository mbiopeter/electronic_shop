const VariantType = require('../models/variantType');

const addVariantType = async (name) => {
    try {
        if (!name) {
            throw new Error('Name is required');
        }
        const variantType = await VariantType.create({ name });
        return variantType;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllVariantTypes = async () => {
    try {
        const allVariantTypes = await VariantType.findAll({
            attributes: { exclude: ['updatedAt'] }
        });
        const formattedVariantType = allVariantTypes.map(variantType => {
            const formattedDate = new Date(variantType.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            return {
                ...variantType.dataValues,
                addedDate: formattedDate,
            };
        });
        return formattedVariantType;
    } catch (err) {
        throw new Error('Error fetching variant types: ' + err.message);
    }
};
const getOneVariantType = async (name) => {
    try {
        return await VariantType.findOne({
            where: { name: name }
        })
    } catch (err) {
        throw new Error(err.message);
    }
}
module.exports = {
    addVariantType,
    getAllVariantTypes,
    getOneVariantType
};
