import React, { useState } from 'react';
import './SendEmail.css';
import '../../../css/common.css';
import Layer from '../Layer';
import { sendEmail } from '../../../../logical/email/sendEmail';
import { ToastContainer, toast } from 'react-toastify';

const SendEmail = ({
    handleHidePopUp,
    showSendEmail,
    setReload,
    reload
}) => {

    const[sender, setSender] = useState('');
    const[receiver, setReceiver] = useState('');
    const[copyTo, setCopyTo] = useState('');
    const[subject, setSubject] = useState('');
    const[message, setMessage] = useState('');
    const[loading, setLoading] = useState(false);

    const handleSendEmail = async () => {
        setLoading(true);
        try {
            const newResponse = await sendEmail(
                sender,
                receiver,
                copyTo,
                subject,
                message,
            );
            if(newResponse.type === 'error'){
                toast.error(newResponse.message); 
            } else {
                toast.success(newResponse.message); 
                setReload(!reload);
            }
        } catch (err) {
            toast.error(err.message || err);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <ToastContainer />
            {showSendEmail && (
                <Layer handleHidePopUp={handleHidePopUp} />
            )}
            <div className={`SendEmail popup-css ${showSendEmail ? 'show-emails' : 'hide'}`}>
                <div className="SendEmail-title">
                    <span>SEND EMAIL</span>
                </div>
                <div className="SendEmail-container">
                    <div className="SendEmail-input-container">
                        <input onChange={(e) => setSender(e.target.value)} value={sender} className='input-css' type="text" placeholder='From' />
                        <input onChange={(e) => setReceiver(e.target.value)} value={receiver} className='input-css' type="text" placeholder='To' />
                    </div>
                    <div className="SendEmail-input-container">
                        <input onChange={(e) => setCopyTo(e.target.value)} value={copyTo} className='input-css' type="text" placeholder='Copy To' />
                        <input onChange={(e) => setSubject(e.target.value)} value={subject} className='input-css' type="text" placeholder='Subject' />
                    </div>
                    <div className="SendEmail-input-container-textarea">
                        <textarea onChange={(e) => setMessage(e.target.value)} value={message} className='input-css'></textarea>
                    </div>
                    <div className="SendEmail-form-btn">
                        <button onClick={handleHidePopUp} className="SendEmail-form-btn-item cancel">Cancel</button>
                        <button onClick={handleSendEmail} className="SendEmail-form-btn-item submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SendEmail;
