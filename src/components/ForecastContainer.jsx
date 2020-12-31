/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import axios from 'axios';

import Card from './Card';

const useStyles = createUseStyles({});

const ForecastContainer = ({ searchInput }) => {
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
    <div>
      {weather &&
        weather.map(({ high_temp, low_temp, moonrise_ts }) => (
          <Card key={moonrise_ts}>
            <Card.Body>
              <p>{high_temp}</p>
              <p>{low_temp}</p>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

ForecastContainer.propTypes = {
  searchInput: PropTypes.string,
};

export default ForecastContainer;
