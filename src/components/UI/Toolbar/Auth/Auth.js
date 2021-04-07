import React, { useContext, useState } from 'react';
import classes from './Auth.module.css'

import Input from '../../Input/Input';
import Button from '../../Button/Button';

import AuthContext from '../../../../containers/context/context';

import useRegLogHook from '../../../../containers/ownHook/reg-log';

const Auth = (props) => {

	const context = useContext(AuthContext);

	const [login, setLogin] = useState('');
	const [passwd, setPasswd] = useState('');
	const [passwd2, setPasswd2] = useState('');

	const {sendAuth} = useRegLogHook();


	const singFunc = () => {
		if (props.registration){ //Refinsration
			const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCE9iNHzKkGA9SWX9TD4JvTXBEtyCxovdA';
			const data = {
				email: login,
				password: passwd,
				returnSecureToken: true
			}

			sendAuth(url, data);
		} else { // Login

		}
	}

	return(
	
			<div className={classes.auth}>
				<span onClick={props.clickX} className={classes.rightX}>&#9746;</span>
				<p>Login:</p>
				<Input 
					value={login}
					onChange={event => setLogin(event.target.value)}
					type='text'
				/>
				<p>Hasło:</p>
				<Input 
					value={passwd}
					onChange={event => setPasswd(event.target.value)}
					type='password'
				/>
				{props.registration &&
					<React.Fragment>

						<p>Powtórz Hasło:</p>
						<Input 
							value={passwd2}				
							onChange={event => setPasswd2(event.target.value)}
							type='password'
						/>
						{passwd !== passwd2 &&
							<p style={{color: 'red'}}>Hasła nie są identyczne</p>
						}						
					</React.Fragment>
				}
				<Button classes={'buttonGreen'}  click={singFunc} >{props.registration ? 'Zarejestruj' : 'Zaloguj'}</Button>

				
			</div>
			

		);
};

export default Auth;