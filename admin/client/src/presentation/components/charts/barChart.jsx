import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../../css/variables.css';  // Make sure to import your CSS variables

export default function BarChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        
        // Use your CSS variables for colors
        const primaryColor = documentStyle.getPropertyValue('--primary-color');
        const secondaryColor = documentStyle.getPropertyValue('--secondary-color');
        const warningColor = documentStyle.getPropertyValue('--warning-color');
        const infoColor = documentStyle.getPropertyValue('--info-color');
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--border-color');  // Use your border color variable
        
        const data = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Sales',
                    data: [540, 325, 702, 620],
                    backgroundColor: [
                        `${primaryColor}33`,  // Add opacity to primary color
                        `${secondaryColor}33`,  // Add opacity to secondary color
                        `${infoColor}33`,  // Add opacity to info color
                        `${warningColor}33`  // Add opacity to warning color
                    ],
                    borderColor: [
                        primaryColor,
                        secondaryColor,
                        infoColor,
                        warningColor
                    ],
                    borderWidth: 1
                }
            ]
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColor // Y-axis tick labels color
                    },
                    grid: {
                        color: surfaceBorder // Y-axis grid lines color
                    }
                },
                x: {
                    ticks: {
                        color: textColor // X-axis tick labels color
                    },
                    grid: {
                        color: surfaceBorder // X-axis grid lines color
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor // Legend text color
                    }
                }
            },
            maintainAspectRatio: false,
            aspectRatio: 0.8
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart style={{height:'300px'}}   type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
        