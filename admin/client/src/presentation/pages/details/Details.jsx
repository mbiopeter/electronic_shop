import React, { useEffect } from 'react';
import './Details.css';
import '../../css/common.css';
import { useState } from 'react';
import ImgPicker from '../../components/popups/addnewproduct/imgPicker/ImgPicker';
import DetailsChart from '../../components/details/detailsChart/DetailsChart';
import { descriptionOverview } from '../../../data/details/detailsData';
import DetailsDescription from '../../components/details/detailsDescription/DetailsDescription';
const Details = () => {
    const numberOfcharts = [4];
    return (
        <div className='Details'>
            <div className="right-details">
                <div className="right-details-description">
                    {descriptionOverview.map((desc) =>(
                        <DetailsDescription  name={desc.name} value={desc.value}/>
                    ) )}
                </div>
                {numberOfcharts.map((chart) => (
                    <DetailsChart/>
                ))}

            </div>
            <div className="left-details">
            
            </div>
        </div>
    )
}

export default Details