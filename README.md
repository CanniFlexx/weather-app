# How'sTheWeather? - Weather Dashboard Project

## Project Overview

How'sTheWeather? is a weather dashboard application built using React.js, Material-UI, and OpenWeatherMap API. It provides real-time weather information and forecasts for different cities, along with features for user authentication and saving favorite cities.

## Project Structure

The project is structured as follows:

```
weather-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Search/
│   │   │   ├── Search.jsx
│   │   │   └── ...
│   │   ├── CurrentWeather/
│   │   │   ├── CurrentWeather.jsx
│   │   │   └── ...
│   │   ├── Forecast/
│   │   │   ├── Forecast.jsx
│   │   │   └── ...
│   │   ├── TemperatureTrends/
│   │   │   ├── TemperatureTrends.jsx
│   │   │   └── ...
│   │   ├── FavoriteCities/
│   │   │   ├── FavoriteCities.jsx
│   │   │   └── ...
│   ├── App.jsx
│   ├── index.js
│   ├── index.css
│   ├── Api.jsx
│   └── ...
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CanniFlexx/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up API keys**:
   - Obtain an API key from [OpenWeatherMap API](https://openweathermap.org/api) and replace `YOUR_API_KEY` in `Api.js` with your actual API key.

4. **Configure Auth0 (optional)**:
   - If using Auth0 for user authentication, update `App.jsx` with your Auth0 credentials.

5. **Start the application**:
   ```bash
   npm start
   ```

## How to Run the Application

Once the setup is complete, you can run the application locally:

- Open your browser and go to `http://localhost:3000` to view the weather dashboard.

## Additional Notes

- **Authentication**: The application supports authentication with Auth0. Update `App.jsx` and configure Auth0 settings as per your requirements.
- **API Integration**: Weather data is fetched from OpenWeatherMap API. Ensure your API key is correctly set up in `Api.js`.
- **Favorite Cities**: Users can save and manage their favorite cities, stored locally using browser's `localStorage`.
- **Responsive Design**: The application is designed to be responsive and should work well across various devices.


