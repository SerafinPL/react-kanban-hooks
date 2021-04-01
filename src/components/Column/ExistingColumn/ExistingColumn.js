import React, {useState} from 'react';
import classes from './ExistingColumn.module.css';


import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Task from '../../Task/Task';
import Modal from '../../UI/Modal/Modal';

const ExistingColumn = (props) => {

const [inputTask, setInputTask] = useState('');
const [modal, setModal] = useState(false);


const addTask = () => {
		props.addTask(props.identy, inputTask);
		setInputTask('');
	};




	return (<React.Fragment >
				{modal && <Modal 
							alert={`Usunąć Liste ${props.name}?`} 
							ok={() => props.removeColumn(props.identy)}
							cancel={() => setModal(false)}
							indenty={props.identy}
							left='Usuń'
							clLeft='buttonRed'
							right='Anuluj'
							clRight='buttonGreen'
						/>}
				<header className={classes.header}><span onClick={() => setModal(true)}>X</span></header>		
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