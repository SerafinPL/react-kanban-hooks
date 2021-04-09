import React from 'react';
import classes from './BackDrop.module.css';

import Button from '../Button/Button';


const BackDrop = (props) => {
	return(
			<div className={classes.backdrop} onClick={props.click}>
				{props.children}
			</div>
		);
};

export default BackDrop;