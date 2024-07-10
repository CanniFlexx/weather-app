import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../Api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const url = `${GEO_API_URL}?namePrefix=${encodeURIComponent(inputValue)}`;
      console.log(`Fetching data from: ${url}`);

      const response = await fetch(url, geoApiOptions);

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      const options = result.data.map(item => ({
        label: `${item.name}, ${item.country}`,
        value: `${item.latitude} ${item.longitude}`,
      }));

      console.log('Processed Options:', options);

      return {
        options,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        options: [],
      };
    }
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search a city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
