import React, { useContext } from 'react';
import classes from './Toolbar.module.css'

import NaviItem from './Navi/NaviItem';

import AuthContext from '../../../containers/context/context';

const Toolbar = () => {

	const context = useContext(AuthContext);

	const loginOn = () => {
		context.loginFunc();
	}

	return(
	
			<div className={classes.toolbar}>
				{context.isAuth ? 
				<React.Fragment>
					<NaviItem text='Wyloguj' onClick={() => context.loginOff()}></NaviItem>
					<NaviItem text='Dodaj Kolumne'></NaviItem>
				</React.Fragment>
				:
				<React.Fragment>	
					<NaviItem text='Zaloguj' onClick={loginOn}></NaviItem>
					<NaviItem text='Zarejestruj'></NaviItem>
				</React.Fragment>
				
				}
				{console.log(context)}

			</div>
			

		);
};

export default Toolbar;