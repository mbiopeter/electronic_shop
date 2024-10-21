const express = require('express');
const {
    sendEmail,
    all
} = require('../controllers/emailController');

const router = express.Router();

//send emails
router.post('/send', sendEmail);
//get all emails
router.get('/all', all);



module.exports = router;
