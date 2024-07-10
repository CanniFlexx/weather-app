import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../Api';

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(`${WEATHER_API_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        const data = await response.json();
        const dailyData = data.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5);
        setForecastData(dailyData);
      } catch (error) {
        console.error("Error fetching the forecast data", error);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: 'rgba(66, 66, 66, 0.5)', color: '#ffffff', padding: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>5 Days Forecast:</Typography>
        {forecastData.map((day, index) => (
          <Accordion key={index} sx={{ backgroundColor: 'rgba(66, 66, 66, 0.3)', marginBottom: 'px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ marginBottom: '-10px' }}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <img
                    src={`icons/${day.weather[0].icon}.png`}
                    alt="weather icon"
                    style={{ width: 25, height: 25 }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1">
                    {new Date(day.dt_txt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">Temp: {Math.round(day.main.temp)}°C</Typography>
              <Typography variant="body1">Condition: {day.weather[0].description}</Typography>
              <Typography variant="body1">Precipitation: {day.pop * 100}%</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  );
};

export default Forecast;
