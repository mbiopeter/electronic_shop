const { send } = require('../utils/sendEmails');
const { allEmails } = require('../services/emailService');
const upload = require('../utils/upload');

const sendEmail = async (req, res) => {
    try {
        const { from, to, cc, subject, body } = req.body;
        if (!from) {
            return res.status(500).json({ error: 'Sender email is required' });
        }
        if (!to) {
            return res.status(500).json({ error: 'Receiver email is required' });
        }
        if (!subject) {
            return res.status(500).json({ error: 'Email subject is required' });
        }
        if (!body) {
            return res.status(500).json({ error: 'Email body is required' });
        }


        if (req.files && req.files.length > 0) {
            return upload.array('images', 1)(req, res, async (err) => {
                if (err) return res.status(400).json({ error: err.message });

                await send(from, to, subject, body, cc, req.files[0]);
                return res.status(200).json({ message: 'Email sent successfully with attachment!' });
            });
        }


        await send(from, to, subject, body, cc);
        return res.status(200).json({ message: 'Email sent successfully!' });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const all = async (req, res) => {
    try {
        const allMails = await allEmails();
        return res.status(200).json(allMails);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    sendEmail,
    all
};
