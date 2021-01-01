/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import axios from 'axios';

import { convertDateToDay } from '../helpers/dateHelper';
import loader from '../assets/loading.gif';

import Card from './Card';

const imgAPI = (code) => `https://www.weatherbit.io/static/img/icons/${code}.png`;

const useStyles = createUseStyles({
  forecastContainer: {
    border: '1px solid #ededed',
    display: 'flex',
    width: '100%',
    "& div[class^='cardContainer']:hover": {
      boxShadow: [0, 0, 4, '#000'],
      '-webkit-box-shadow': [0, 0, 4, '#000'],
      '-moz-box-shadow': [0, 0, 4, '#000'],
      cursor: 'pointer',
    },
    "& div[class^='cardContainer']:first-child": {
      border: '1px solid #ffbf00',
      '&:hover': {
        boxShadow: [0, 0, 4, '#ffbf00'],
        '-webkit-box-shadow': [0, 0, 4, '#ffbf00'],
        '-moz-box-shadow': [0, 0, 4, '#ffbf00'],
        border: '1px solid #ffbf00',
      },
    },
  },
  loadingOuterContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: 183,
    width: '100%',
  },
  loadingContainer: {
    height: 50,
    width: 50,
    '& img': {
      width: '100%',
    },
  },
  tempInfo: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: [0, 20],
    width: '100%',
    '& p': {
      fontWeight: 500,
    },
    '& p:first-child': {
      color: '#a8a8a8',
    },
    '& p:last-child': {
      color: '#d3d3d3',
    },
  },
  today: {
    color: 'pink',
  },
});

const ForecastContainer = ({ searchInput }) => {
  const classes = useStyles();
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('loader', loader);

  useEffect(() => {
    if (searchInput && searchInput.length) {
      setLoading(true);
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
          setWeather(result.slice(1, 6));
          setLoading(false);
        } catch (err) {
          setLoading(false);
          //   throw new Error('Could not retrieve weather from that location.');
        }
      };

      getResult();

      return () => source.cancel();
    }
  }, [searchInput]);

  return (
    <div className={classes.forecastContainer}>
      {!loading && weather && weather.length ? (
        weather.map(
          ({ high_temp, low_temp, moonrise_ts, datetime, weather: { icon: imgCode } }, index) => (
            // because the date format is 2020-12-30, I want to acquire 12-30
            <Card key={moonrise_ts}>
              <Card.Body>
                <Card.Title>{convertDateToDay(datetime)}</Card.Title>
                <Card.Image imgSrc={imgAPI(imgCode)} />
                <div className={classes.tempInfo}>
                  <p>{Math.floor(high_temp)}&deg;</p>
                  <p>{Math.floor(low_temp)}&deg;</p>
                </div>
              </Card.Body>
            </Card>
          )
        )
      ) : (
        <div className={classes.loadingOuterContainer}>
          <div className={classes.loadingContainer}>
            <img src={loader} alt="Loading" />
          </div>
        </div>
      )}
    </div>
  );
};

ForecastContainer.propTypes = {
  searchInput: PropTypes.string,
};

export default ForecastContainer;
