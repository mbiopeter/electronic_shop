import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../../css/variables.css';
import { mostMonthlySales } from '../../../data/details/detailsData';

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        
        // Using custom CSS variables for colors
        const data = {
            labels: [mostMonthlySales[0].name, mostMonthlySales[1].name, mostMonthlySales[2].name],
            datasets: [
                {
                    data: [mostMonthlySales[0].value, mostMonthlySales[1].value, mostMonthlySales[2].value],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-color'), 
                        documentStyle.getPropertyValue('--warning-color'), 
                        documentStyle.getPropertyValue('--success-color')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--primary-color'), 
                        documentStyle.getPropertyValue('--warning-color'), 
                        documentStyle.getPropertyValue('--success-color')
                    ]
                }
            ]
        };

        const options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: documentStyle.getPropertyValue('--text-color')
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart style={{ height: '300px' }} type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    );
}
