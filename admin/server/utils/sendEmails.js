const nodemailer = require('nodemailer');
const Email = require('../models/email');

const send = async (from, to, subject, body, cc = null, attachment = null) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Styled email content
        const mailOptions = {
            from: `no-reply@${from}`,
            to,
            subject,
            text: body, // Plain text fallback
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
                    <!-- Email body content -->
                    <div style="background-color: #da9100; padding: 20px; border-bottom: 2px solid #d4af37;">
                        <h1 style="font-size: 24px; color: #ffffff;">${subject}</h1>
                    </div>
                    <div style="padding: 20px; background-color: #ffd700;">
                        <p style="font-size: 16px;color:#1a1a1a; line-height: 1.6;">${body}</p>
                    </div>
                    <!-- Footer content with social icons, address, etc. -->
                    <div style="background-color: #da9100; padding: 20px; text-align: center; color: #b0b0b0;">
                        <p style="color: #ffffff; font-size: 16px; margin-bottom: 10px;">Follow us</p>
                        <div style="margin-bottom: 20px;">
                            <a href="https://twitter.com"><img src="https://img.icons8.com/ios-filled/50/ffffff/twitter--v1.png" alt="Twitter" width="24" height="24"></a>
                            <a href="https://linkedin.com"><img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin-circled--v1.png" alt="LinkedIn" width="24" height="24"></a>
                            <a href="https://facebook.com"><img src="https://img.icons8.com/ios-filled/50/ffffff/facebook--v1.png" alt="Facebook" width="24" height="24"></a>
                            <a href="https://instagram.com"><img src="https://img.icons8.com/ios-filled/50/ffffff/instagram--v1.png" alt="Instagram" width="24" height="24"></a>
                        </div>
                        <p style="font-size: 14px; margin-bottom: 5px; color:#ffffff;">650 2nd Street, Westlands, Nairobi, 94107, Kenya</p>
                        <div style="margin-bottom: 20px;">
                            <img src="https://img.icons8.com/ios-filled/100/ffffff/company.png" alt="Company Logo" width="80" style="display: block; margin: 0 auto;">
                        </div>
                        <p style="font-size: 12px; margin-bottom: 20px;color:#ffffff;">&copy; Copyright ${new Date().getFullYear()}. All Rights Reserved.</p>
                        <p style="font-size: 12px; color: #ffffff;">This is a no-reply email. Please <a href="https://example.com/contact-us" style="color: #ffffff; text-decoration: underline;">contact us</a> for support.</p>
                    </div>
                </div>
            `,
            replyTo: `no-reply@${from}`,
            ...(cc && { cc }), // Add CC if provided
            ...(attachment && { attachments: [{ filename: attachment.originalname, path: attachment.path }] }) // Handle single attachment
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Save email info to database
        await Email.create({
            from,
            to,
            cc: cc || '',
            subject,
            body,
            attachment: attachment ? attachment.originalname : ''
        });

        return info;

    } catch (err) {
        throw new Error(`Failed to send email: ${err.message}`);
    }
};

module.exports = { send };
