import React from 'react'
import './Desc.css';
import '../../css/common.css';
import { More, Inbox } from '../../../logical/consts/icons';

const Desc = ({
    id,
    title,
    percentage,
    count,
    background,
    progress,
    handleDescChange,
}) => {
    return (
        <div onClick={() => handleDescChange(id)} className="dashboard-desc common-css">
            <div className="dashboard-desc-icons">
                <div className="dashboard-desc-icon-container" style={{backgroundColor:background}}>
                    <Inbox className='dashboard-desc-icon-one' style={{color:progress}}/>
                </div>
                <More className='dashboard-desc-icon-two'/>
            </div>
            <span className='dashboard-desc-title'>{title}</span>
            <div className="dashboard-desc-progress" style={{backgroundColor:background}}>
                <div className="dashboard-desc-progress-value"
                style={{width:percentage, backgroundColor:background}}></div>
            </div>
            <span className="dashboard-desc-count">{count} Product</span>
        </div>
    )
}

export default Desc