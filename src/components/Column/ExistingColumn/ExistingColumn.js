import React, {useState, useContext} from 'react';
import classes from './ExistingColumn.module.css';

import { Droppable} from 'react-beautiful-dnd';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Task from '../../Task/Task';
import Modal from '../../UI/Modal/Modal';
import Dialog from '../../UI/Dialog/Dialog';

import FuncContext from '../../../containers/context/funcContext';

const ExistingColumn = (props) => {

const [inputTask, setInputTask] = useState('');
const [modal, setModal] = useState(false);
const [dialog, setDialog] = useState(false);

const funcContext = useContext(FuncContext);

const addTask = () => {
		funcContext.addTask(props.identy, inputTask);
		setInputTask('');
	};

const onEnter = (event) => {
	
	if (event.keyCode === 13) {
		addTask();
	}
}



	return (
		<>
			<header className={classes.header}>
				<span className={classes.left} {...props.dragHandleProps}>&#9776;</span>

				<span onClick={() => setModal(true)} className={classes.right}>&#9746;</span>
				<span className={classes.right} onClick={() => setDialog(true)}>...</span>
				<p className={classes.label}>{props.name}</p>
				
			</header>		
			

			<Droppable droppableId={props.identy} key={props.identy} type='task'>
			{
				(provided, snapshot) => {
					return(
						<div
							className={classes.drop} 
							{...provided.droppableProps}
							ref={provided.innerRef} 
							style={{
               					backgroundColor: snapshot.isDraggingOver ? '#C87550' : '#EA9772',
               					//paddingBottom: snapshot.isDraggingOver ? '5%' : '0px'

               				}}
						>
							{props.tasks.map((task, index) =>( 
								<Task 
									name={task.name} 
									key={task.id} 
									identyList={props.identy} 
									identyTask={task.id}
									description={task.description} 
									index={index}
									
								/>
							))}
							{provided.placeholder}

						</div>
					);
				}
			}
			</Droppable>
			<div className={classes.flexGrow}>
				<div className={classes.adding}>
					<Input 
						type='text' 
						value={inputTask} 
						onChange={(event) => setInputTask(event.target.value)}
						placeholder='nazwa zadania'
						onKeyDown={(event) => onEnter(event)}
						/>
					
					<Button click={addTask} classes={'buttonCol'} disabled={inputTask === '' ? true: false}>Dodaj Zadanie</Button>
				</div>
			</div>

			{modal && <Modal 
						alert={`Usunąć Liste ${props.name}?`} 
						ok={() => funcContext.removeColumn(props.identy)}
						cancel={() => setModal(false)}
						left='Usuń'
						clLeft='buttonRed'
						right='Anuluj'
						clRight='buttonGreen'
					/>
			}

			{dialog && <Dialog 
						alert={`Edycja Listy ${props.name}?`} 
						ok={funcContext.editColumnName}
						cancel={() => setDialog(false)}
						left='Zmień'
						clLeft='buttonRed'
						right='Anuluj'
						clRight='buttonGreen'
						identy={props.identy}
						name={props.name}
					/>
			}


							
		
		</>
	)
}
export default React.memo(ExistingColumn);