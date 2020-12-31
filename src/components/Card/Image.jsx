import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({
  imageContainer: {},
});

const Image = ({ imgSrc, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.imageContainer}>
      <img src={imgSrc} alt={title} />
    </div>
  );
};

Image.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
};

export default Image;
