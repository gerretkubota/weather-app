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
      '@media screen and (max-width: 705px)': {
        padding: [0, 10],
        width: '100%',
      },
    },
    '& h1': {
      fontSize: 50,
      marginBottom: 10,
    },
  },
  licenseContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '.5em',
    marginTop: 500,
  },
});

const WeatherContainer = () => {
  const classes = useStyles();
  // I will keep the default location as Los Angeles
  const [searchInput, setSearchInput] = useState('Los Angeles, CA');

  return (
    <div className={classes.weatherContainer}>
      <h1>Weather App</h1>
      <Search setSearchInput={setSearchInput} />
      <Forecast searchInput={searchInput} />
      <div className={classes.licenseContainer}>
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
          <img
            alt="Creative Commons License"
            style={{ borderWidth: 0 }}
            src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
          />
        </a>
        <br />
        This work is licensed under a{' '}
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
          Creative Commons Attribution-NonCommercial 4.0 International License
        </a>
        .
      </div>
    </div>
  );
};

export default WeatherContainer;
