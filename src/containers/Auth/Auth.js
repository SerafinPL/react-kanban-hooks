import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import classes from './Auth.module.css'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import AuthContext from '../context/context';

import useRegLogHook from '../ownHook/reg-log';

const Auth = (props) => {

	const context = useContext(AuthContext);

	const [login, setLogin] = useState('');
	const [passwd, setPasswd] = useState('');
	const [passwd2, setPasswd2] = useState('');
	const [valid, setValid] = useState(false);

	const {sendAuth, error, token, time, email, userId, loading} = useRegLogHook();

	const singOn = useCallback((userId, token, expirationDate, email) => {
		context.loginOn(userId, token, expirationDate, email);
	}, []);

	

	useEffect(() => {
		if (props.registration){
			setValid(passwd === passwd2 && passwd.length > 5 && login !== '');
		} else {
			setValid(passwd.length > 5 && login !== '');
		}
	});

	useEffect(() => {
		if (userId) {
			singOn(userId, token, time, email);
		}
		console.log(userId);
	}, [userId, token, time, email, singOn]);

	console.log('rendering');

	
	
	const singFunc = () => {

		const data = {
				email: login,
				password: passwd,
				returnSecureToken: true
			}
		if (props.registration){ //Refinsration
			const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCE9iNHzKkGA9SWX9TD4JvTXBEtyCxovdA';
			sendAuth(url, data);
		} else { // Login
			const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCE9iNHzKkGA9SWX9TD4JvTXBEtyCxovdA';
			sendAuth(url, data);
		}
	}



	return  (
	!context.userId &&		
		<div className={classes.auth}>
			{ !loading ?
				<React.Fragment>	
					<span onClick={props.clickX} className={classes.rightX}>&#9746;</span>
					{error && <p style={{color: 'red'}}>Podano Błędne dane spróbuj jeszcze raz.</p>}
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
							{passwd.length < 6 &&
								<p style={{color: 'red'}}>Minimum 6 znaków</p>
							}						
						</React.Fragment>
					}
					<Button classes={'buttonGreen'} disabled={!valid} click={singFunc} >{props.registration ? 'Zarejestruj' : 'Zaloguj'}</Button>
				</React.Fragment>	
			: <p>Oczekujemy na serwer!</p>}

		</div>
	
		);

	return 
};

export default React.memo(Auth);