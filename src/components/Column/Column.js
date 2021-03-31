import React, {useState} from 'react';
import classes from './Column.module.css';


import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';



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
						<Input 
							type='text' 
							value={inputState} 
							onChange={(event) => setInputState(event.target.value)}
							placeholder='nazwa kolumny'>
						</Input>
						<Button click={addButton} disabled={inputState === '' ? true: false}>Dodaj Kolumne</Button>
				 		
					</React.Fragment> 
					: 
					<React.Fragment>
						<Input type='text' value={props.name} />
						<Button click disabled={inputState == '' ? true: false}>Dodaj Zadanie</Button>
					</React.Fragment>
				}
			</div>
		);
};

export default Column;