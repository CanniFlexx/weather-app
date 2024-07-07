import React, { useState } from 'react';
import './index.css';
import Search from './components/Search/Search';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import TemperatureTrends from './components/TemperatureTrends/TemperatureTrends';
import { WEATHER_API_KEY, WEATHER_API_URL } from './components/Api';
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState(null);
  const [latLon, setLatLon] = useState({ lat: null, lon: null });
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

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

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast(forecastResponse.list);
      })
      .catch((err) => console.log(err));
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
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log Out
            </button>
          ) : (
            <button 
              onClick={() => loginWithRedirect()} 
              className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log In
            </button>
          )}
        </div>
        <div className="w-full md:w-2/5 order-3 md:order-2">
          <Search onSearchChange={handleOnSearchChange} />
        </div>
      </div>
      
      <div className="mx-auto grid grid-cols-1 md:grid-cols-11 gap-1">
        {currentWeather && (
          <div className="mx-auto col-span-3">
            <CurrentWeather data={currentWeather} />
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
    </div>
  );
}

export default App;
