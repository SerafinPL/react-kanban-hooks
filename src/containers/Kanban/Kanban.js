import React, {useState} from 'react';
import classes from './Kanban.module.css';
import Column from '../../components/Column/Column';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';


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
			<div className={classes.kanban}>
				<DragDropContext onDragEnd={(result) => console.log(result)/*onDragEnd(result, columns, setColumns)*/}>
					{ lists.map( list => (
						
									<Column
										 
										key={list.id} 
										identy={list.id} 
										name={list.name} 
										tasks={list.tasks} 
										addTask={addTask} 
										removeTask={removeTask}
										removeColumn={removeColumn}

									/>
					  )  ) }
				</DragDropContext>
				<Column key='000' add={addColumn}/>
			</div>
		);
};

export default Kanban;