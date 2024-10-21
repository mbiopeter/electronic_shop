import React, { useEffect, useState } from 'react';
import './ViewEmail.css';
import '../../../css/common.css';
import Layer from '../Layer';
import { handleFetchAllEmails } from '../../../../logical/email/fetch';
import { emailUrl } from '../../../../logical/consts/apiUrl';

const ViewEmail = ({
    handleHidePopUp,
    showViewEmail,
    emailId
}) => {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);

    useEffect(() => {
        // Fetch emails data
        const getAllEmails = async () => {
            try {
                const emailData = await handleFetchAllEmails(emailUrl, 'all');
                setEmails(emailData); 
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };
        getAllEmails();
    }, []);

    useEffect(() => {
        // Find the email with the matching ID
        if (emailId && emails.length > 0) {
            const email = emails.find(e => e.id === emailId);
            setSelectedEmail(email || null);
        }
    }, [emailId, emails]);

    return (
        <>
            {showViewEmail && <Layer handleHidePopUp={handleHidePopUp} />}
            <div className={`ViewEmail popup-css ${showViewEmail ? 'show-emails' : 'hide'}`}>
                <div className="ViewEmail-title">
                    <span>VIEW EMAIL</span>
                </div>
                <div className="ViewEmail-container">
                    {selectedEmail ? (
                        <>
                            <div className="viewEmailController">
                                <span>From:</span>
                                <span>{selectedEmail.from || 'N/A'}</span>
                            </div>
                            <div className="viewEmailController">
                                <span>To:</span>
                                <span>{selectedEmail.to}</span>
                            </div>
                            {selectedEmail.cc && (
                                <div className="viewEmailController">
                                    <span>Cc:</span>
                                    <span>{selectedEmail.cc}</span>
                                </div>
                            )}
                            <div className="viewEmailHeader">
                                <span>Subject:</span>
                                <span>{selectedEmail.subject}</span>
                            </div>
                            <div className="viewEmailBody">
                                <span>{selectedEmail.body}</span>
                            </div>
                            <div className="viewEmailAttachments viewEmailDate">
                                <span>Sent on {selectedEmail.addedDate}</span>
                            </div>
                        </>
                    ) : (
                        <div>No email found</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewEmail;
