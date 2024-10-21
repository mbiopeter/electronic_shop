const Email = require('../models/email');


const allEmails = async () => {
    try {
        const allEmails = await Email.findAll({
            attributes: { exclude: ['updatedAt'] }
        })
        const formattedEmail = allEmails.map(Email => {
            const formattedDate = new Date(Email.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
            return {
                ...Email.dataValues,
                addedDate: formattedDate,
            };
        });
        return formattedEmail;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    allEmails
}