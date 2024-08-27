import React from 'react';
import './DetailsDescription.css';

const DetailsDescription = ({
    name,
    value
}) => {
    return (
    <div className="right-details-description-item">
        <span className="right-details-description-item-header">{name}</span>
        <span className="right-details-description-item-value">{value}</span>
    </div>
    )
}

export default DetailsDescription