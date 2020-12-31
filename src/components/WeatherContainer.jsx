import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

import Search from './Search';
import Forecast from './ForecastContainer';

const useStyles = createUseStyles({
  weatherContainer: {
    alignItems: 'center',
    // border: '1px solid #ededed',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    width: 700,
    "& div[class^='search']": {
      marginBottom: 15,
    },
  },
});

const WeatherContainer = () => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState('Monterey Park, CA');

  return (
    <div className={classes.weatherContainer}>
      <h1>Weather App</h1>
      <Search setSearchInput={setSearchInput} />
      <Forecast searchInput={searchInput} />
    </div>
  );
};

export default WeatherContainer;
