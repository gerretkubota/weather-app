import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({});

const MainContainer = ({ children }) => <div>{children}</div>;

MainContainer.propTypes = {
  children: PropTypes.node,
};

export default MainContainer;
