import React from 'react'
import './DetailsChart.css';
import BarChart from '../../charts/barChart';
import LineStylesDemo from '../../charts/Line';
import LineDemo from '../../charts/Line';
import DoughnutChartDemo from '../../charts/doughnut';
import PolarAreaDemo from '../../charts/poler';
import ComboDemo from '../../charts/poler';

const DetailsChart = () => {
    return (
        <div className="right-details-chart-contaner">
        <div className="right-details-chart">
            <BarChart />
        </div>
        <div className="right-details-chart">
            <LineDemo />
        </div>
        <div className="right-details-chart">
            <DoughnutChartDemo />
        </div>
        <div className="right-details-chart">
            <ComboDemo />
        </div>                
    </div>
    )
}

export default DetailsChart