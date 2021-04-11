import React, {useState, useContext} from 'react';
import classes from './Task.module.css'

import Modal from '../UI/Modal/Modal';
import Dialog from '../UI/Dialog/Dialog';
import {Draggable} from 'react-beautiful-dnd';

import FuncContext from '../../containers/context/funcContext';

const Task = (props) => {


	const [checkbox, setCheckbox] = useState(false);
	const [modal, setModal] = useState(false);
	const [dialog, setDialog] = useState(false);

	const funcContext = useContext(FuncContext);

	return(
		<Draggable key={props.identyTask} draggableId={props.identyTask} index={props.index}>
			{(provided, snapshot) => {
                return(
					<div 
						className={classes.task}
						{...provided.draggableProps} 
                        ref={provided.innerRef}
                        
                        style={{
                        	...provided.draggableProps.style,
                        	userSelect: 'none',
                        	backgroundColor: snapshot.isDragging ? '#FFFAB4' : '#F0D892',

                        }}
					>
						<header className={classes.header}>
							<span className={classes.left} {...provided.dragHandleProps}>&#9776;</span>
							<span onClick={() => setModal(true)} className={classes.right}>&#9746;</span>
							<span className={classes.right} onClick={() => setDialog(true)}>...</span>
						</header>
						<label className={classes.container}>
							<input className={classes.Checkbox} type='checkbox' checked={checkbox} onChange={(event) => {setCheckbox(event.target.checked)}}/>
							<span className={classes.checkmark}></span>
							<p className={checkbox ? classes.line : null}>
								
								{props.name}
							</p>
						</label>
						{modal && <Modal 
									alert={`Usunąć Zadanie: ${props.name}?`} 
									ok={() => funcContext.removeTask(props.identyList, props.identyTask)}
									cancel={() => setModal(false)}
									left='Usuń'
									clLeft='buttonRed'
									right='Anuluj'
									clRight='buttonGreen'
								/>}
						{dialog && <Dialog 
							alert={`Edycja Zadania: ${props.name}.`} 
							ok={funcContext.editTask}
							cancel={() => setDialog(false)}
							left='Zmień'
							clLeft='buttonRed'
							right='Anuluj'
							clRight='buttonGreen'
							identyList={props.identyList}
							identyTask={props.identyTask}
							name={props.name}
							description={props.description}
						/>
						}
						
					</div>
				)
            }}
		</Draggable>
		);
};

export default React.memo(Task);