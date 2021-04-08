import React, { useContext, useState, useEffect } from 'react';
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

	useEffect(() => {
		if (context.expirationDate){
			console.log(context.expirationDate.getTime() - new Date().getTime());

			setTimeout(() => {
				context.loginOff();
			},context.expirationDate.getTime() -  new Date().getTime());
		}
	} ,[context.expirationDate]);


	return(
	
			<div className={classes.toolbar}>
				{context.isAuth ? 
				<React.Fragment>
					<NaviItem text='Wyloguj' click={loginOff}></NaviItem>
					<span className={classes.right}>Zalogowany jako: {context.email}</span>
					
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