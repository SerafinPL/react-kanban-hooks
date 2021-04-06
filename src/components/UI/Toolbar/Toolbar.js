import React, { useContext } from 'react';
import classes from './Toolbar.module.css'

import NaviItem from './Navi/NaviItem';

import Context from '../../../containers/context/context';

const Toolbar = () => {

	const context = useContext(Context);

	return(
	
			<div className={classes.toolbar}>
				{context.isAuth ? 
				<>
					<NaviItem text='Wyloguj'></NaviItem>
					<NaviItem text='Dodaj Kolumne'></NaviItem>
				</>
				:
				<>	
					<NaviItem text='Zaloguj'></NaviItem>
					<NaviItem text='Zarejestruj'></NaviItem>
				</>
				
				}
				
			</div>
			

		);
};

export default Toolbar;