import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

import Title from './Title';
import Image from './Image';
import Body from './Body';

const useStyles = createUseStyles({});

const Card = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.cardContainer}>{children}</div>;
};

Card.Title = Title;
Card.Image = Image;
Card.Body = Body;

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
