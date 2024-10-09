const {
    add,
    allBrands,
    oneBrand
} = require('../services/brandService');
const upload = require('../utils/upload');
const { remove } = require('../utils/delete');
const Brand = require('../models/brands');

const addBrand = (req, res) => {
    try {

        upload.array('images', 1)(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            try {

                const { name, subCategory } = req.body;

                if (!subCategory || subCategory === 'null') {
                    return res.status(400).json({ error: 'SubCategory name is required!' });
                }
                if (!name || name === 'null') {
                    return res.status(400).json({ error: 'Brand name is required!' });
                }
                const existingBrand = await oneBrand(name);
                if (existingBrand) {
                    return res.status(400).json({ error: 'Brand already exists' });
                }
                if (req.files && req.files.length > 0) {

                    await add(name, subCategory, req.files[0]);

                    return res.status(200).json({ message: 'Sub subCategory added successfully' });
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


const getBrands = async (req, res) => {
    try {
        const Brands = await allBrands();
        if (Brands) {
            res.status(200).json(Brands);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const removeBrand = async (req, res) => {
    try {
        const id = req.query.id;
        const brand = await remove(id, Brand);
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getBrands,
    addBrand,
    removeBrand
}
