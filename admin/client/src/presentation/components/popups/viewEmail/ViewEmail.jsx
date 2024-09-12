import React, { useEffect, useState } from 'react';
import './ViewEmail.css';
import '../../../css/common.css';
import Layer from '../Layer';
import { emails } from '../../../../data/emails/table_data';
const ViewEmail = ({
    handleHidePopUp,
    showViewEmail,
    emailId
}) => {

    const index = emailId - 1;

    return (
        <>
            {showViewEmail && (
                <Layer handleHidePopUp={handleHidePopUp}/>
            )}
            <div className={`ViewEmail popup-css ${showViewEmail ? 'show-brands' : 'hide'}`}>
                <div className="ViewEmail-title">
                    <span>VIEW EMAIL</span>
                </div>
                <div className="ViewEmail-container">
                    <div className="viewEmailController">
                        {emailId && emails[index].from &&
                            <span>From:</span>
                        }
                        <span>{emailId && emails[index].from}</span>
                    </div>
                    <div className="viewEmailController">
                        {emailId && emails[index].to && 
                            <span>To:</span>
                        }
                        <span>{emailId && emails[index].to}</span>
                    </div>
                    <div className="viewEmailController">
                        {emailId && emails[index].cc && 
                            <span>Cc:</span>
                        }
                        <span>{emailId && emails[index].cc}</span>
                    </div>
                    <div className="viewEmailHeader">
                        {emailId && emails[index].subject &&
                            <span>Subject:</span>
                        }
                        <span>{emailId && emails[index].subject}</span>
                    </div>
                    <div className="viewEmailBody">
                        <span>{emailId && emails[index].message}</span>
                    </div>
                    {emailId && emails[index].attachment &&
                        <div className="viewEmailAttachments">
                            <div className="viewEmailAttachmentsCon">
                                <div className="viewEmailAttachmentsConner"></div>
                            </div>
                            <span>{emailId && emails[index].attachment}</span>
                        </div>
                    }
                    <div className="viewEmailAttachments viewEmailDate">
                        <span>sent on {emailId && emails[index].date}</span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ViewEmail