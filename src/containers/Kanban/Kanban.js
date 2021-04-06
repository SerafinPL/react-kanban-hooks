import React, {useState} from 'react';
import classes from './Kanban.module.css';
import ExistingColumn from '../../components/Column/ExistingColumn/ExistingColumn';
import NewColumn from '../../components/Column/NewColumn/NewColumn';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';


const onDragEnd = (result, lists, setLists) => {
	const {source, destination, type} = result;
	console.log(result);

	if (destination){
		if (type === 'task'){
			if( source.droppableId === destination.droppableId){ // ta sama kolumna
				const indexOfColumn = lists.findIndex((value) => (value.id === source.droppableId));
				const columns = [...lists];
				const tasks = [...columns[indexOfColumn].tasks];
				
				const [removed] = tasks.splice(source.index, 1);
				tasks.splice(destination.index, 0, removed);
				
				columns[indexOfColumn].tasks = [...tasks];
				setLists([...columns]);
			} else { // inna kolumna
				const indexSourceColumn = lists.findIndex((value) => (value.id === source.droppableId));
				const indexDestColumn = lists.findIndex((value) => (value.id === destination.droppableId));
				const columns = [...lists];

				const sourceTasks = [...columns[indexSourceColumn].tasks];
				const destTasks = [...columns[indexDestColumn].tasks];
				
				const [removed] = sourceTasks.splice(source.index, 1);
				destTasks.splice(destination.index, 0, removed);

				columns[indexSourceColumn].tasks = [...sourceTasks];
				columns[indexDestColumn].tasks = [...destTasks];
				setLists([...columns]);
			}
		} else { // type === 'column'
			console.log(result);
			const columns = [...lists];
			const [movedColumn] = columns.splice(source.index, 1);
			columns.splice(destination.index, 0, movedColumn);

			setLists([...columns]);


			return;
		}

	} else { //if (destination)
		return;
	}

	
	
}




const Kanban = () => {

	const [lists, setLists] = useState([]);

	const addColumn = (name) => {
		const columns = [...lists];
		columns.push({name: name, id: (name + new Date().getTime()), order: columns.length, tasks:[] });
		setLists([...columns]);
	};

	const removeColumn = (id) => {
		const columns = [...lists];
		const positionOfColumn = lists.findIndex((value) => (id === value.id));
		columns.splice(positionOfColumn, 1);
		setLists([...columns]);
	};

	const addTask = (id, name) => {
		const positionOfColumn = lists.findIndex((value) => (id === value.id));
		const columns = [...lists];
		columns[positionOfColumn].tasks.push({name: name, id:(name + new Date().getTime()), order: columns[positionOfColumn].tasks.length});
		setLists([...columns]);
	};

	const removeTask = (idList, idTask) => {
		const positionOfColumn = lists.findIndex((value) => (idList === value.id));
		const columns = [...lists];
		const positionOfTask = columns[positionOfColumn].tasks.findIndex((value) => (idTask === value.id));
		columns[positionOfColumn].tasks.splice(positionOfTask, 1);
		setLists([...columns]);
	};



	return(
			<div className={classes.mainBox} >
				<DragDropContext onDragEnd={(result) => onDragEnd(result, lists, setLists)}>
					<Droppable droppableId='main' type='column' direction='horizontal'>
						{
							(provided, snapshot) => {
								return(
									<div className={classes.kanban} 
										{...provided.droppableProps}
										ref={provided.innerRef} 
										style={{
			               					backgroundColor: snapshot.isDraggingOver ? 'lightgreen' : 'white',
			               					//paddingBottom: snapshot.isDraggingOver ? '25%' : '0px'

			               				}}>

										{ lists.map( (list, index) => (
											<Draggable key={list.id} draggableId={list.id} index={index} >
												{(provided, snapshot) => {
                									return(
														<div className={classes.column}
															{...provided.draggableProps} 
                        									ref={provided.innerRef}
                        									
									                        style={{
									                        	...provided.draggableProps.style,
									                        	userSelect: 'none',
									                        	backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',

									                        }}
									                    >
															<ExistingColumn
																dragHandleProps =  {provided.dragHandleProps}
																key={list.id} 
																identy={list.id} 
																name={list.name} 
																tasks={list.tasks} 
																addTask={addTask} 
																removeTask={removeTask}
																removeColumn={removeColumn}

															/>
															
														</div>
													)
												}}
											</Draggable>
										  )  ) }
										
										
										{provided.placeholder}	
									</div>
								);
							}
						}	
					</Droppable>
					<div className={classes.columnAdd} >
						<div className={classes.itemNew}>
							<NewColumn key='000' add={addColumn}/>
						</div>
					</div>
				</DragDropContext>
				
					
				
			</div>
		);
};

export default Kanban;