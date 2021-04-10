import React, {useState} from 'react';
import classes from './Dialog.module.css';

import Button from '../Button/Button';
import BackDrop from '../BackDrop/BackDrop';
import Input from '../Input/Input';


const Dialog = (props) => {

	const [inputName, setInputName] = useState(props.name);

	const editName = () => {
		props.ok(props.identy, inputName, props.identyTask);
		props.cancel();
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
					//onKeyDown={taskHandlerKeyPress}
				/>
				<div>	
					<Button classes={props.clLeft} click={editName}>{props.left}</Button>
					<Button classes={props.clRight} click={props.cancel}>{props.right}</Button>
				</div>
			</div>
		</div>
		);
};

export default Dialog;