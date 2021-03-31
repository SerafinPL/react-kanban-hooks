import React, {useState} from 'react';
import classes from './ExistingColumn.module.css';


import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Task from '../../Task/Task';

const ExistingColumn = (props) => {

const [inputTask, setInputTask] = useState('');

const addTask = () => {
		props.addTask(props.identy, inputTask);
		setInputTask('');
	};


	return (<React.Fragment >
						
				<p className={classes.label}>{props.name}</p>

				
				{props.tasks.map(task => <Task name={task.name} key={task.id} />)}
				<div className={classes.flexGrow}>
					<div className={classes.adding}>
						<Input 
							type='text' 
							value={inputTask} 
							onChange={(event) => setInputTask(event.target.value)}
							placeholder='nazwa zadania'
							//onKeyDown={taskHandlerKeyPress}
							>
						</Input>
						<Button click={addTask} classes={'buttonCol'} disabled={inputTask === '' ? true: false}>Dodaj Zadanie</Button>
					</div>
				</div>
			</React.Fragment>
	)
}
export default ExistingColumn;