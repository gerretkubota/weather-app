/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

const useStyles = createUseStyles({
  forecastContainer: {
    display: 'flex',
  },
  tempInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
});

const imgAPI = (code) => `https://www.weatherbit.io/static/img/icons/${code}.png`;

const ForecastContainer = ({ searchInput }) => {
  const classes = useStyles();
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (searchInput && searchInput.length) {
      const source = axios.CancelToken.source();
      const getResult = async () => {
        try {
          const {
            data: { data: result },
          } = await axios.get(
            `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchInput}&units=I&key=${process.env.API_KEY}`,
            {
              cancelToken: source.token,
            }
          );
          setWeather(result.slice(0, 5));
        } catch (err) {
          throw new Error('Could not retrieve weather from that location.');
        }
      };

      getResult();

      return () => source.cancel();
    }
  }, [searchInput]);

  console.log(weather);

  return (
    <div className={classes.forecastContainer}>
      {weather &&
        weather.map(
          ({ high_temp, low_temp, moonrise_ts, datetime, weather: { icon: imgCode } }) => {
            // because the date format is 2020-12-30, I want to acquire 12-30
            const day = datetime.split('-').slice(1).join('/');
            return (
              <Card key={moonrise_ts}>
                <Card.Body>
                  <Card.Title>{day}</Card.Title>
                  <Card.Image imgSrc={imgAPI(imgCode)} />
                  <div className={classes.tempInfo}>
                    <p>{high_temp}</p>
                    <p>{low_temp}</p>
                  </div>
                </Card.Body>
              </Card>
            );
          }
        )}
    </div>
  );
};

ForecastContainer.propTypes = {
  searchInput: PropTypes.string,
};

export default ForecastContainer;
