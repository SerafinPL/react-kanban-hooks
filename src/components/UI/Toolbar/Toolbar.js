import React, { useContext } from 'react';
import classes from './Toolbar.module.css'

import NaviItem from './Navi/NaviItem';

import AuthContext from '../../../containers/context/context';

const Toolbar = () => {

	const context = useContext(AuthContext);

	const loginOn = () => {
		context.loginOn();
	}

	const loginOff = () => {
		context.loginOff();
	}

	return(
	
			<div className={classes.toolbar}>
				{context.isAuth ? 
				<React.Fragment>
					<NaviItem text='Wyloguj' click={loginOff}></NaviItem>
				</React.Fragment>
				:
				<React.Fragment>	
					<NaviItem text='Zaloguj' click={loginOn}></NaviItem>
					<NaviItem text='Zarejestruj'></NaviItem>
				</React.Fragment>
				
				}
				

			</div>
			

		);
};

export default Toolbar;