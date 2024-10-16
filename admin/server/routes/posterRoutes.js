const express = require('express');
const {
    getPosters,
    addPoster,
    removePoster
} = require('../controllers/posterController');

const router = express.Router();

//add ne poster
router.post('/addNew', addPoster);
//get all Posters
router.get('/all', getPosters);
//delete a poster
router.delete('/remove', removePoster);


module.exports = router;
