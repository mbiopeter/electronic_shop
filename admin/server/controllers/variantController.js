const Variants = require('../models/variants');
const {
    addVariant,
    allVariants,
    oneVariant
} = require('../services/variantService');
const { remove } = require('../utils/delete');

const add = async (req, res) => {
    try {
        const { name, variantType } = req.body;
        //check if variant already exists
        const variantExists = await oneVariant(name);
        if (variantExists) {
            return res.status(400).json({ message: 'Variant already exists!' });
        }
        //create a new variant in the database
        await addVariant(name, variantType);
        return res.status(200).json({ message: 'Variant created successfully' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const all = async (req, res) => {
    try {
        const variants = await allVariants();
        return res.status(200).json(variants);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

const removeVariant = async (req, res) => {
    try {
        const { id } = req.query;
        await remove(id, Variants);
        return res.status(200).json({ message: 'Variants removed successfully' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

module.exports = {
    add,
    all,
    removeVariant
}