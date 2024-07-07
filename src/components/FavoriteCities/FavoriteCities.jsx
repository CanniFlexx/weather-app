import React, { useState, useEffect } from 'react';

const FavoriteCities = ({ onCitySelect }) => {
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(savedFavorites);
  }, []);

  const addFavorite = (city) => {
    if (city && !favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (favoriteCity) => {
    const newFavorites = favorites.filter(c => c !== favoriteCity);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button onClick={toggleAccordion} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Favorite Cities
      </button>
      {isOpen && (
        <div className="mt-2">
          {favorites.map(favoriteCity => (
            <div key={favoriteCity} className="p-2 border rounded my-2">
              <span>{favoriteCity}</span>
              <button 
                onClick={() => onCitySelect(favoriteCity)} 
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Show Weather
              </button>
              <button 
                onClick={() => removeFavorite(favoriteCity)} 
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCities;
