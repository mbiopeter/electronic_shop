import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import '../../css/variables.css';

export default function ComboDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const surfaceBorder = documentStyle.getPropertyValue('--border-color');
        const primaryColor = documentStyle.getPropertyValue('--primary-color');
        const secondaryColor = documentStyle.getPropertyValue('--secondary-color');
        const warningColor = documentStyle.getPropertyValue('--warning-color');

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: primaryColor,
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76]
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: secondaryColor,
                    data: [21, 84, 24, 75, 37, 65],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: warningColor,
                    data: [41, 52, 24, 74, 23, 21]
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
                        color: textColor // Updated to use --text-color
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColor // Updated to use --text-color
                    },
                    grid: {
                        color: surfaceBorder
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
