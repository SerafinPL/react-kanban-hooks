import React, {useState} from 'react';
import classes from './Dialog.module.css';

import Button from '../Button/Button';
import BackDrop from '../BackDrop/BackDrop';
import Input from '../Input/Input';


const Dialog = (props) => {

	const [inputName, setInputName] = useState(props.name);
	const [inputDescription, setInputDescription] = useState(props.description);

	const editTask = () => {
		props.ok(props.identyList, inputName, props.identyTask, inputDescription);
		props.cancel();
	}

	const onEnter = (event) => {
	
		if (event.keyCode === 13) {
			editTask();
		}
	}

	return(
		<div>	
			<BackDrop click={props.cancel}/>
			<div className={classes.dialog}>
				<h1>{props.alert}</h1>
				<Input
					type='text' 
					value={inputName} 
					onChange={(event) => setInputName(event.target.value)}
					placeholder='nowa nazwa listy'
					onKeyDown={(event) => onEnter(event)}
				/>
				<p>Opis zadania</p>
				<textarea
					className={classes.TextArea}
					value={inputDescription}
					onChange={(event) => setInputDescription(event.target.value)}
					placeholder='opis zadania'
					onKeyDown={(event) => onEnter(event)}
				/>
				<div>	
					<Button classes={props.clLeft} click={editTask}>{props.left}</Button>
					<Button classes={props.clRight} click={props.cancel}>{props.right}</Button>
				</div>
			</div>
		</div>
		);
};

export default Dialog;