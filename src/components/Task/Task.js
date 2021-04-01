import React, {useState} from 'react';
import classes from './Task.module.css'

import Modal from '../UI/Modal/Modal';


const Task = (props) => {


	const [checkbox, setCheckbox] = useState(false);
	const [modal, setModal] = useState(false);

	return(
			<div className={classes.task}>

				<header className={classes.header}>
					<span className={classes.left}>&#9776;</span>
					<span onClick={() => props.removeTask(props.identyList, props.identyTask)} className={classes.right}>&#9746;</span>
				</header>
				<p className={checkbox && classes.line}>
					<input type='checkbox' checked={checkbox} onChange={(event) => {setCheckbox(event.target.checked)}}/>
					{props.name}
				</p>
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
			</div>
		);
};

export default Task;