const express = require('express');
const {
    getNotifications,
    addNotification,
    removeNotification
} = require('../controllers/notificationController');

const router = express.Router();

//add ne Notification
router.post('/addNew', addNotification);
//get all Notifications
router.get('/all', getNotifications);
//delete a Notification
router.delete('/remove', removeNotification);


module.exports = router;
