import React, { useState } from 'react';
import classes from './Toolbar.module.css'

import NaviItem from './Navi/NaviItem';



const Toolbar = () => {

	const [authHook, setAuthHook] = useState(false);

	

	return(
			<div className={classes.toolbar}>
				{authHook ? 
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