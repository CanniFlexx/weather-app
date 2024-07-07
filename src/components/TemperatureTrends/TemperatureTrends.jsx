import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureTrends = ({ forecastData }) => {
  // Prepare data to show each day only once on the x-axis
  const dailyData = {};
  
  forecastData.forEach((day) => {
    const dateKey = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
    
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        count: 0,
        totalTemp: 0
      };
    }
    
    dailyData[dateKey].count++;
    dailyData[dateKey].totalTemp += day.main.temp;
  });

  const dates = Object.keys(dailyData);
  const averageTemps = dates.map((dateKey) => (dailyData[dateKey].totalTemp / dailyData[dateKey].count).toFixed(2));

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Daily Average Temperature (°C)',
        data: averageTemps,
        fill: false,
        backgroundColor: 'rgba(137,152,149, 0.5)',
        borderColor: 'rgba(137,152,149, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#000', // legend label text color
        },
      },
      title: {
        display: true,
        text: '5-Day Temperature Trends',
        color: '#000', // chart title text color
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000', // x-axis label text color
        },
      },
      y: {
        ticks: {
          color: '#000', // y-axis label text color
        },
      },
    },
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto', backgroundColor: 'rgba(66, 66, 66, 0.5)', color: '#000' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Temperature Trends:
        </Typography>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default TemperatureTrends;
