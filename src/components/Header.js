import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import "chart.js/auto"
import "../styles/Header.css"

const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY || 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';
const POLLING_INTERVAL = 60000; // Poll every minute

export default function Header({ name, setName, setDayIntervalData })
{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStockData = useCallback(async (symbol) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    function: 'TIME_SERIES_INTRADAY',
                    symbol: symbol,
                    interval: '1min',
                    apikey: API_KEY
                }
            });

            const timeSeriesData = response.data['Time Series (1min)'];
            if (!timeSeriesData) {
                throw new Error('No data available for this symbol');
            }

            const newDayIntervalData = {
                newDayIntervalDataLabels: [],
                newDayIntervalDataOpenDataSet: [],
                newDayIntervalDataHighDataSet: [],
                newDayIntervalDataLowDataSet: [],
                newDayIntervalDataCloseDataSet: []
            };

            // Get only the most recent 100 data points
            Object.entries(timeSeriesData)
                .slice(0, 100)
                .forEach(([key, value]) => {
                    const timeLabel = new Date(key).toLocaleTimeString();
                    newDayIntervalData.newDayIntervalDataLabels.unshift(timeLabel);
                    newDayIntervalData.newDayIntervalDataOpenDataSet.unshift(parseFloat(value['1. open']));
                    newDayIntervalData.newDayIntervalDataHighDataSet.unshift(parseFloat(value['2. high']));
                    newDayIntervalData.newDayIntervalDataLowDataSet.unshift(parseFloat(value['3. low']));
                    newDayIntervalData.newDayIntervalDataCloseDataSet.unshift(parseFloat(value['4. close']));
                });

            setDayIntervalData(newDayIntervalData);
        } catch (err) {
            setError(err.message || 'Failed to fetch stock data');
            console.error('Error fetching stock data:', err);
        } finally {
            setIsLoading(false);
        }
    }, [setDayIntervalData]);

    useEffect(() => {
        if (!name) return;

        // Initial fetch
        fetchStockData(name);

        // Set up polling interval
        const intervalId = setInterval(() => {
            fetchStockData(name);
        }, POLLING_INTERVAL);

        // Cleanup interval on unmount or when name changes
        return () => clearInterval(intervalId);
    }, [name, fetchStockData]);

    function handleChange(event)
    {
        setName(event.target.value.toUpperCase())
    }
    function handleClick()
    {
     if (name === "")
        return 
    console.log("this is the value of the stock : " , name)
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${name}&interval=5min&apikey=853T6KQBMCSOA7NS`).then(data => {
        console.log("This is the data in the supposed JSON format : " , data.data)
        console.log("this is the type of the data : " , typeof(data))
    })

    }
    return (
        <React.Fragment>
        <div id="header-wrapper">
            <div id="heading">Stock Market Application</div>
            <div id = "search-wrapper">
                <input 
                    type="text" 
                    id="search-bar" 
                    placeholder="Enter Stock Name" 
                    value={name} 
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <button 
                    id="search-button" 
                    onClick={handleClick}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
        </React.Fragment>
    )
}

// this is the api key : 