import React, { useState, useEffect } from 'react';
import './index.css';
import Search from './components/Search/Search';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import TemperatureTrends from './components/TemperatureTrends/TemperatureTrends';
import FavoriteCities from './components/FavoriteCities/FavoriteCities';
import Alerts from './components/Alerts/Alerts';
import { WEATHER_API_KEY, WEATHER_API_URL } from './components/Api';
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, AlertTitle } from '@mui/material';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [city, setCity] = useState(null);
  const [latLon, setLatLon] = useState({ lat: null, lon: null });
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    setCity(searchData.label);
    setLatLon({ lat, lon });

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    //The alertsFetch functionality is not in use currently as it requires a paid plan to access and use.
    const alertsFetch = fetch(
      `${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch, alertsFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const alertsResponse = await response[2].json();

        if (weatherResponse.cod !== 200) throw new Error(weatherResponse.message);
        if (forecastResponse.cod !== "200") throw new Error(forecastResponse.message);
        //if (alertsResponse.cod === 401) throw new Error("Unauthorized access to weather alerts! Check API validity");

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast(forecastResponse.list);

        if (alertsResponse.alerts && alertsResponse.alerts.length > 0) {
          setAlerts(alertsResponse.alerts);
        } else {
          setAlerts([]);
        }

        setError(null);
      })
      .catch((err) => setError(err.message));
  };

  const addFavorite = (city) => {
    if (city && !favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (city) => {
    const newFavorites = favorites.filter(fav => fav !== city);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  return (
    <div className="container mx-auto p-1 text-center">
      <div className="flex flex-col md:flex-row my-3 mx-auto text-center justify-around items-center gap-2">
        <div className="w-full md:w-2/5 order-1 md:order-1">
          <h1 className="text-xl font-bold">How'sTheWeather?</h1>
        </div>
        <div className="w-full md:w-1/5 order-2 md:order-3">
          {isAuthenticated ? (
            <button 
              onClick={() => logout({ returnTo: window.location.origin })} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log Out
            </button>
          ) : (
            <button 
              onClick={() => loginWithRedirect()} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log In
            </button>
          )}
        </div>
        <div className="mx-auto w-full md:w-2/5 order-3 md:order-2">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
      </div>
      
      <div className="mx-auto grid grid-cols-1 md:grid-cols-11 gap-1">
        {error && (
          <div className="mx-auto col-span-11">
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </div>
        )}
        
        {currentWeather && (
          <div className="mx-auto col-span-3">
            <CurrentWeather data={currentWeather} addFavorite={addFavorite} />
          </div>
        )}
        
        {forecast && (
          <div className="mx-auto col-span-3">
            <Forecast city={city} />
          </div>
        )}
        {forecast && (
          <div className="col-span-5">
            <TemperatureTrends forecastData={forecast} />
          </div>
        )}
      </div>

      <FavoriteCities 
        favorites={favorites} 
        onCitySelect={handleOnSearchChange} 
        removeFavorite={removeFavorite} 
      />

      {alerts.length > 0 && <Alerts alerts={alerts} />}
    </div>
  );
}

export default App;
