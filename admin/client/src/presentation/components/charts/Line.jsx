import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../../css/variables.css';

export default function LineDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        
        // Use CSS variables for colors
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--border-color'); 
        const primaryColor = documentStyle.getPropertyValue('--primary-color');
        const secondaryColor = documentStyle.getPropertyValue('--secondary-color');

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: true,
                    borderColor: primaryColor, 
                    backgroundColor: `${primaryColor}33`, 
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27],
                    fill: true,
                    borderColor: secondaryColor, 
                    backgroundColor: `${secondaryColor}33`, 
                    tension: 0.4
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor 
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColor // X-axis tick labels
                    },
                    grid: {
                        color: surfaceBorder // X-axis grid lines
                    }
                },
                y: {
                    ticks: {
                        color: textColor // Y-axis tick labels
                    },
                    grid: {
                        color: surfaceBorder // Y-axis grid lines
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart style={{ height: '300px' }} type="line" data={chartData} options={chartOptions} />
        </div>
    );
}
