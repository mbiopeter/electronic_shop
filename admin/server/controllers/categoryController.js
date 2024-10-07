const {
    add,
    categories,
    oneCategory
} = require('../services/categoryService');
const upload = require('../utils/upload');

const addCategory = (req, res) => {
    try {
        upload.array('images', 1)(req, res, async (err) => {
            console.log(req.body); // Should log the parsed form data
            console.log(req.files); // Should log the uploaded files

            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (!req.body.name) {
                return res.status(400).json({ error: 'Category name is required' });
            }

            // Check if the category already exists
            const existingCategory = await oneCategory(req.body.name);
            if (existingCategory) {
                return res.status(400).json({ error: 'Category already exists' });
            }

            // Create a new category in the database
            if (req.files && req.files.length > 0) {
                await add(req.body.name, req.files[0]);
                res.status(200).json({ message: 'Category added successfully' });
            } else {
                return res.status(400).json({ error: 'Image file is required' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

module.exports = {
    addCategory
}
