import React from 'react';
import classes from './Input.module.css'


const Input = (props) => (			
			<input 
				className={classes.input} 
				type={props.type}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				onKeyDown={props.onKeyDown}
				
			/>
			
		);


export default Input;