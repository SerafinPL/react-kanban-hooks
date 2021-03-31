import React from 'react';
import classes from './Button.module.css'


const Button = (props) => (			
			<button className={classes[props.classes]} onClick={props.click} disabled={props.disabled}>{props.children}</button>
			
		);


export default Button;