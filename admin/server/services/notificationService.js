const Notification = require('../models/notification');

const add = async (name, desc, imageFile) => {
    try {
        // Check for required fields
        if (!name) {
            throw new Error('Notification name is required!');
        }
        if (!desc) {
            throw new Error('Description is required!');
        }

        let notificationData = {
            name: name,
            description: desc
        };

        if (imageFile && imageFile.filename) {
            notificationData.img = imageFile.filename;
        }

        const notification = await Notification.create(notificationData);
        return notification;
    } catch (error) {
        throw new Error(error);
    }
}


const allNotifications = async () => {
    try {
        const allNotifications = await Notification.findAll({
            attributes: {
                exclude: ['updatedAt']
            }
        });

        const formattedNotifications = allNotifications.map(notification => {
            const formattedDate = new Date(notification.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            const imageUrl = `http://localhost:4000/${notification.img}`;
            return {
                id: notification.id,
                name: notification.name,
                description: notification.description,
                addedDate: formattedDate,
                img: imageUrl
            };
        });

        return formattedNotifications;
    } catch (error) {
        throw new Error(error);
    }
}



const oneNotification = async (name) => {
    try {
        const oneNotification = await Notification.findOne({ where: { name: name } });
        return oneNotification;
    } catch (error) {
        throw new Error('Error while fetching Notification');
    }
};

module.exports = {
    add,
    allNotifications,
    oneNotification
}