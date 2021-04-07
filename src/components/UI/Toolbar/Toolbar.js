import React, { useContext, useState } from 'react';
import classes from './Toolbar.module.css'

import NaviItem from './Navi/NaviItem';
import Auth from './Auth/Auth';

import AuthContext from '../../../containers/context/context';

const Toolbar = () => {

	const context = useContext(AuthContext);

	const [regis,setRegis] = useState(false);
	const [showDialog, setShowDialog] =useState(false);

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
					<span className={classes.right}>{context.email}</span>
					
				</React.Fragment>
				:
				<React.Fragment>	
					<NaviItem text='Zaloguj' click={() => {setRegis(false); setShowDialog(true);}}></NaviItem>
					<NaviItem text='Zarejestruj' click={() => {setRegis(true); setShowDialog(true);}}></NaviItem>
				</React.Fragment>
				
				}
				{showDialog && <Auth registration={regis} clickX={() => setShowDialog(false)}/>}
				

			</div>
			

		);
};

export default Toolbar;