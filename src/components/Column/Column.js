import React, {useState} from 'react';
import classes from './Column.module.css';


import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Task from '../Task/Task';



const Column = (props) => {

	const [inputCol, setInputCol] = useState('');
	const [inputTask, setInputTask] = useState('');

	const addCol = () => {

		props.add(inputCol);
		setInputCol('');
	};

	const addTask = () => {
		props.addTask(props.identy, inputTask);
		setInputTask('');
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
					<React.Fragment>
						
						<p>{props.name} </p>

						
						{props.tasks.map(task => <Task name={task.name} key={task.id} />)}
						<Input 
							type='text' 
							value={inputTask} 
							onChange={(event) => setInputTask(event.target.value)}
							placeholder='nazwa zadania'
							//onKeyDown={taskHandlerKeyPress}
							>
						</Input>
						<Button click={addTask} disabled={inputTask === '' ? true: false}>Dodaj Zadanie</Button>
					</React.Fragment>
				}
			</div>
		);
};

export default Column;