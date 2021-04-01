import React from 'react';
import classes from './Modal.module.css';

import Button from '../Button/Button';


const Modal = (props) => {
	return(
			<div className={classes.backdrop}>
				<div className={classes.modal}>
					<h1>{props.alert}?</h1>
					<Button classes={props.clLeft} click={props.ok}>{props.left}</Button>
					<Button classes={props.clRight} click={props.cancel}>{props.right}</Button>
				</div>
			</div>
		);
};

export default Modal;