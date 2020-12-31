import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({});

const Title = ({ children }) => <p>{children}</p>;

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
