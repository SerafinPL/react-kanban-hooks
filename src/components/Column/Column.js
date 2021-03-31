import React, {useState} from 'react';
import classes from './Column.module.css';


import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Task from '../Task/Task';
import ExistingColumn from './ExistingColumn/ExistingColumn';



const Column = (props) => {

	const [inputCol, setInputCol] = useState('');
	

	const addCol = () => {

		props.add(inputCol);
		setInputCol('');
	};

	

	// const taskHandlerKeyPress = (event) => {
 //  		if(event.key === 'Enter'){
 //    		addCol();
 //  		}
	// }

	// const colHandlerKeyPress = (event) => {
 //  		if(event.key === 'Enter'){
 //    		addTask();
 //  		}
	// }



	return(
			<div className={classes.column}>
				
				{props.add 
					?
					<React.Fragment>
						<Input 
							type='text' 
							value={inputCol} 
							onChange={(event) => setInputCol(event.target.value)}
							placeholder='nazwa kolumny'
							//onKeyDown={colHandlerKeyPress}
							>
						</Input>
						<Button click={addCol} disabled={inputCol === '' ? true: false}>Dodaj Kolumne</Button>
				 		
					</React.Fragment> 
					: 
					<ExistingColumn
							identy={props.identy}
							name={props.name}
							tasks={props.tasks}
							addTask={props.addTask}
					/>
					
				}
			</div>
		);
};

export default Column;