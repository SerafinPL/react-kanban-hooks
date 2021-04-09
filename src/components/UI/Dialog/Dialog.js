import React, {useState} from 'react';
import classes from './Dialog.module.css';

import Button from '../Button/Button';
import BackDrop from '../BackDrop/BackDrop';


const Dialog = (props) => {

	const [inputName, setInputName] = useState(props.name);

	return(
			<BackDrop>
				<div className={classes.dialog}>
					<h1>{props.alert}?</h1>
					<Button classes={props.clLeft} click={props.ok}>{props.left}</Button>
					<Button classes={props.clRight} click={props.cancel}>{props.right}</Button>
				</div>
			</BackDrop>
		);
};

export default Dialog;