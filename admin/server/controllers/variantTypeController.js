const VariantType = require('../models/variantType');
const { remove } = require('../utils/delete');
const {
    addVariantType,
    getAllVariantTypes,
    getOneVariantType
} = require('../services/variantTypeService');

const add = async (req, res) => {
    try {
        const { name } = req.body;
        const userExistence = await getOneVariantType(name);
        if (userExistence) {
            return res.status(400).json({ message: 'Variant type already exists' });
        }
        await addVariantType(name);
        return res.status(200).json({ message: 'Variant type successfully added' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const all = async (req, res) => {
    try {
        const allVariantTypes = await getAllVariantTypes();
        return res.status(200).json(allVariantTypes);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const deleteVariantType = async (req, res) => {
    try {
        const { id } = req.query;
        await remove(id, VariantType);
        return res.status(200).json({ message: 'Variant type successfully deleted!' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


module.exports = {
    add,
    all,
    deleteVariantType
};
