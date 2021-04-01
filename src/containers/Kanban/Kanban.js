import React, {useState} from 'react';
import classes from './Kanban.module.css';
import Column from '../../components/Column/Column';

import Modal from '../../components/UI/Modal/Modal'



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
		console.log(lists);
		//const column = lists.filter(list => (id === list.id));
		//column.tasks.push({name: name, id:(name + new Date().getTime()), order: column.tasks.length});

	}

	const removeTask = (id) => {
		
	}

	

	return(
			<div className={classes.kanban}>
				{/*<Modal/>*/}
				{ lists.map( list => (
					<Column key={list.id} identy={list.id} name={list.name} tasks={list.tasks} addTask={addTask} removeColumn={removeColumn}/>
				) ) }

				<Column key='000' add={addColumn}/>
			</div>
		);
};

export default Kanban;