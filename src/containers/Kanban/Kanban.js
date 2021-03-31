import React, {useState} from 'react';
import classes from './Kanban.module.css'
import Column from '../../components/Column/Column'



const Kanban = () => {

	const [lists, setLists] = useState([]);

	const addColumn = (name) => {
		const columns = [...lists];

		columns.push({name: name, id: new Date().getTime(), order: columns.length, tasks:[] })
		setLists([...columns])
	};



	return(
			<div className={classes.kanban}>
				
				{ lists.map( list => (
					<Column key={list.id} name={list.name}/>
				) ) }

				<Column key='000' add={addColumn}/>
			</div>
		);
};

export default Kanban;