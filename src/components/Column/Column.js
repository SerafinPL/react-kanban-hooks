import React, {useState} from 'react';
import classes from './Column.module.css';
import AddColumn from './AddColumn';




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
				 		<AddColumn click={addButton} disabled={inputState == '' ? true: false}/>
					</React.Fragment> 
					: 
					<input type='text' value={props.name}/>}
			</div>
		);
};

export default Column;