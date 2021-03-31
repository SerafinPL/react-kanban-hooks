import React from 'react';
import classes from './Column.module.css';



import ExistingColumn from './ExistingColumn/ExistingColumn';
import NewColumn from './NewColumn/NewColumn';


const Column = (props) => {

	
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
					<NewColumn add={props.add}/>
					: 
					<ExistingColumn
							identy={props.identy}
							name={props.name}
							tasks={props.tasks}
							addTask={props.addTask}
							removeColumn={props.removeColumn}
					/>
					
				}
			</div>
		);
};

export default Column;