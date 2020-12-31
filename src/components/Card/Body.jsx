import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({
  bodyContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

const Body = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.bodyContainer}>{children}</div>;
};

Body.propTypes = {
  children: PropTypes.node,
};

export default Body;
