import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../../css/variables.css';

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        
        // Using custom CSS variables for colors
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
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
