import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({
  titleContainer: {},
});

const Title = ({ children }) => {
  const classes = useStyles();

  return <p className={classes.titleContainer}>{children}</p>;
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
