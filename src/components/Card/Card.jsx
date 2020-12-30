import React from 'react';
import { createUseStyles } from 'react-jss';

import Title from './Title';
import Image from './Image';
import Body from './Body';

const useStyles = createUseStyles({});

const Card = () => <div>Card</div>;

Card.Title = Title;
Card.Image = Image;
Card.Body = Body;

export default Card;
