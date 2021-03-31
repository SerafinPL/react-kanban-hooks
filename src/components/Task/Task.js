import React from 'react';
import classes from './Task.module.css'


const Task = (props) => {
	return(
			<div className={classes.task}>
				<p>{props.name}</p>
			</div>
		);
};

export default Task;