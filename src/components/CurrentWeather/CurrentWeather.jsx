import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const CurrentWeather = ({ data }) => {
  return (
    <Card sx={{ maxWidth: 345,backgroundColor: 'rgba(66, 66, 66, 0.5)', color: '#fffff' }}>
      <Grid container alignItems="center">
        <Grid item>
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100 }}
            image={`icons/${data.weather[0].icon}.png`}
            title="weather icon"
          />
        </Grid>
        <Grid item xs>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.city}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 0 }}>
              {data.weather[0].description}
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 1 }}>
              {Math.round(data.main.temp)}°C
            </Typography>
            <div>
              <div>
                <span>Feels like: </span>
                <span>{Math.round(data.main.feels_like)}°C</span>
              </div>
              <div>
                <span>Wind: </span>
                <span>{data.wind.speed} m/s</span>
              </div>
              <div>
                <span>Humidity: </span>
                <span>{data.main.humidity}%</span>
              </div>
              <div>
                <span>Pressure: </span>
                <span>{data.main.pressure} hPa</span>
              </div>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CurrentWeather;

