import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import Search from './Search';
import Forecast from './ForecastContainer';

const useStyles = createUseStyles({
  weatherContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    width: 700,
    "& div[class^='search']": {
      marginBottom: 15,
    },
    '& h1': {
      fontSize: 50,
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
