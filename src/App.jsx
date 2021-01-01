import React from 'react';
import { createUseStyles } from 'react-jss';

import Weather from './components/WeatherContainer';

const useStyles = createUseStyles({
  '@import': 'url(https://fonts.googleapis.com/css?family=Roboto)',
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      fontFamily: 'Roboto',
    },
  },
  appContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <Weather />
    </div>
  );
};

export default App;
