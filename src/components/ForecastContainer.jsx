/* eslint-disable no-nested-ternary */
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
    '@media screen and (max-width: 705px)': {
      padding: [0, 10],
      flexDirection: 'column',
      '& div[class^=cardContainer]': {
        width: '100%',
      },
      '& div[class^=bodyContainer]': {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      '& $headerContainer': {
        alignItems: 'center',
        '& p': {
          fontSize: '1.2em',
          fontWeight: 500,
        },
      },
      '& $tempInfo': {
        flexDirection: 'column',
        width: 'auto',
        '& p': {
          fontSize: '2em',
          padding: [10, 0],
        },
      },
    },
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
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
});

const ForecastContainer = ({ searchInput }) => {
  const classes = useStyles();
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const cards = () =>
    weather.map(({ high_temp, low_temp, moonrise_ts, datetime, weather: { icon: imgCode } }) => (
      <Card key={moonrise_ts}>
        <Card.Body>
          <div className={classes.headerContainer}>
            <Card.Title>{convertDateToDay(datetime)}</Card.Title>
            <Card.Image imgSrc={imgAPI(imgCode)} />
          </div>
          <div className={classes.tempInfo}>
            <p>{Math.floor(high_temp)}&deg;</p>
            <p>{Math.floor(low_temp)}&deg;</p>
          </div>
        </Card.Body>
      </Card>
    ));

  return (
    <div className={classes.forecastContainer}>
      {/* if it is done retrieiving data then display result */}
      {!loading && weather && weather.length ? (
        cards()
      ) : !loading && !weather.length ? (
        <div className={classes.loadingOuterContainer}>
          {/* if it is d one retrieving data and no data set is returned */}
          <p>No data available for that location.</p>
        </div>
      ) : (
        <div className={classes.loadingOuterContainer}>
          {/* in the process of retrieving data */}
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
