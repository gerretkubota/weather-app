import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

import Search from './Search';
import Forecast from './ForecastContainer';

const useStyles = createUseStyles({});

const WeatherContainer = () => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState('Monterey Park, CA');

  return (
    <div>
      <Search setSearchInput={setSearchInput} />
      <Forecast searchInput={searchInput} />
    </div>
  );
};

export default WeatherContainer;
