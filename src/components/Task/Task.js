import React, {useState} from 'react';
import classes from './Task.module.css'

import Modal from '../UI/Modal/Modal';
import {Draggable} from 'react-beautiful-dnd';

const Task = (props) => {


	const [checkbox, setCheckbox] = useState(false);
	const [modal, setModal] = useState(false);

	return(
		<Draggable key={props.identyTask} draggableId={props.identyTask} index={props.index}>
			{(provided, snapshot) => {
                return(
					<div 
						className={classes.task}
						{...provided.draggableProps} 
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        style={{
                        	...provided.draggableProps.style,
                        	userSelect: 'none',
                        	backgroundColor: snapshot.isDragging ? 'navy' : 'blue',

                        }}
					>

						<header className={classes.header}>
							<span className={classes.left}>&#9776;</span>
							<span onClick={() => setModal(true)} className={classes.right}>&#9746;</span>
						</header>
						<p className={checkbox ? classes.line : null}>
							<input type='checkbox' checked={checkbox} onChange={(event) => {setCheckbox(event.target.checked)}}/>
							{props.name}
						</p>
						{modal && <Modal 
									alert={`Usunąć Zadanie ${props.name}?`} 
									ok={() => props.removeTask(props.identyList, props.identyTask)}
									cancel={() => setModal(false)}
									left='Usuń'
									clLeft='buttonRed'
									right='Anuluj'
									clRight='buttonGreen'
								/>}
					{provided.placeholder}	
					</div>
				)
            }}
		</Draggable>
		);
};

export default Task;