const {
    add,
    allPosters,
    onePoster
} = require('../services/posterServices');
const upload = require('../utils/upload');
const { remove } = require('../utils/delete');
const Poster = require('../models/poster');

const addPoster = (req, res) => {
    try {
        // Validate the name before processing the upload

        upload.array('images', 1)(req, res, async (err) => {
            const posterName = req.body.name;

            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (!req.body.name) {
                return res.status(400).json({ error: 'Poster name is required' });
            }
            // Check if the Poster already exists
            const existingPoster = await onePoster(posterName);
            if (existingPoster) {
                return res.status(400).json({ error: 'Poster already exists' });
            }

            // Create a new Poster in the database
            if (req.files && req.files.length > 0) {
                await add(posterName, req.files[0]);
                res.status(200).json({ message: 'Poster added successfully' });
            } else {
                return res.status(400).json({ error: 'Image file is required' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getPosters = async (req, res) => {
    try {
        const posters = await allPosters();
        if (posters) {
            res.status(200).json(posters);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const removePoster = async (req, res) => {
    try {
        const id = req.query.id;
        const posters = await remove(id, Poster);
        res.status(200).json(posters);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPosters,
    addPoster,
    removePoster
}
