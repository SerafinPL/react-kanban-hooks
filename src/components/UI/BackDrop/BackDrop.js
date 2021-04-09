import React from 'react';
import classes from './BackDrop.module.css';

import Button from '../Button/Button';


const BackDrop = (props) => {
	return(
			<div className={classes.backdrop}>
				{props.children}
			</div>
		);
};

export default BackDrop;