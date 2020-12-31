import React from 'react';
import { createUseStyles } from 'react-jss';

import Weather from './components/WeatherContainer';

const useStyles = createUseStyles({
  '@global': {
    body: {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
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
