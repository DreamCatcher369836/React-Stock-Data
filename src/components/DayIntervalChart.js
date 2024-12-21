import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "../styles/Data.css";

export default function DayIntervalChart({ dayIntervalData, id }) {
    const chartRef = useRef(null);

    const chartOptions = {
        responsive: true,
        animation: {
            duration: 250 // Fast but smooth animation for updates
        },
        scales: {
            x: {
                reverse: true, // Most recent data on the right
                ticks: {
                    maxTicksLimit: 10 // Limit number of x-axis labels for readability
                }
            },
            y: {
                beginAtZero: false
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: id === "first" ? 'High/Low Prices' : 'Open/Close Prices'
            }
        },
        maintainAspectRatio: false
    };

    const chartData = id === "first" ? {
        labels: dayIntervalData.newDayIntervalDataLabels || [],
        datasets: [
            {
                label: "HIGH",
                data: dayIntervalData.newDayIntervalDataHighDataSet || [],
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                fill: false,
                tension: 0.1
            },
            {
                label: "LOW",
                data: dayIntervalData.newDayIntervalDataLowDataSet || [],
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                fill: false,
                tension: 0.1
            }
        ]
    } : {
        labels: dayIntervalData.newDayIntervalDataLabels || [],
        datasets: [
            {
                label: "OPEN",
                data: dayIntervalData.newDayIntervalDataOpenDataSet || [],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                fill: false,
                tension: 0.1
            },
            {
                label: "CLOSE",
                data: dayIntervalData.newDayIntervalDataCloseDataSet || [],
                borderColor: "purple",
                backgroundColor: "rgba(128, 0, 128, 0.1)",
                fill: false,
                tension: 0.1
            }
        ]
    };

    // Update chart when new data arrives
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [dayIntervalData]);

    return (
        <div className="chart-container">
            <Line 
                ref={chartRef}
                data={chartData}
                options={chartOptions}
                className="chart"
            />
        </div>
    );
}