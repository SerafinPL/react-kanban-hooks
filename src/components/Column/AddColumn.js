import React from 'react';
import classes from './AddColumn.module.css'


const AddColumn = (props) => {
	return(
			<div className={classes.addColumn}>
				<button onClick={props.click} disabled={props.disabled}>Dodaj Kolumne</button>
			</div>
		);
};

export default AddColumn;