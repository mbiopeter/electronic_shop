const {
    add,
    allNotifications,
    oneNotification
} = require('../services/notificationService');
const upload = require('../utils/upload');
const { remove } = require('../utils/delete');
const Notification = require('../models/notification');

const addNotification = (req, res) => {
    try {
        upload.array('images', 1)(req, res, async (err) => {
            const notificationName = req.body.name;
            const description = req.body.description;

            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (!notificationName) {
                return res.status(400).json({ error: 'Notification name is required' });
            }
            if (!description) {
                return res.status(400).json({ error: 'Notification description is required' });
            }
            // Check if the Notification already exists
            const existingNotification = await oneNotification(notificationName);
            if (existingNotification) {
                return res.status(400).json({ error: 'Notification already exists' });
            }

            // Create a new Notification in the database
            if (req.files && req.files.length > 0) {
                await add(notificationName, description, req.files[0]);
                res.status(200).json({ message: 'Notification added successfully' });
            } else {
                return res.status(400).json({ error: 'Image file is required' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getNotifications = async (req, res) => {
    try {
        const notifications = await allNotifications();
        if (notifications) {
            res.status(200).json(notifications);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const removeNotification = async (req, res) => {
    try {
        const id = req.query.id;
        const Notifications = await remove(id, Notification);
        res.status(200).json(Notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getNotifications,
    addNotification,
    removeNotification
}
