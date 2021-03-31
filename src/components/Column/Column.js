import React, {useState} from 'react';
import classes from './Column.module.css';


import Button from '../UI/Button/Button';




const Column = (props) => {

	const [inputState, setInputState] = useState('');

	const addButton = () => {

		props.add(inputState);
		setInputState('');
	}

	return(
			<div className={classes.column}>
				
				{props.add 
					?
					<React.Fragment>
						<input 
							type='text' 
							value={inputState} 
							onChange={(event) => setInputState(event.target.value)}
							placeholder='nazwa kolumny'>
						</input>
						<Button click={addButton} disabled={inputState == '' ? true: false}>Dodaj Kolumne</Button>
				 		
					</React.Fragment> 
					: 
					<input type='text' value={props.name}/>}
			</div>
		);
};

export default Column;