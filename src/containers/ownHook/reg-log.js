import axios from 'axios';

import {useReducer} from 'react';


const initState = {
	token: null,
	userId: null,
	error: null,
	time: null,
	email: null,
	loading: false
}

const reducer = (curState, action) => {
	switch (action.type) {
		case 'SEND':
		return { 	token: null, 
					userId: null,
					error: null,
					time: null,
					email: null,
					loading: true
				}
		case 'RESPONSE':
		return { 	token: action.token, 
					userId: action.userId,
					error: null,
					time: action.time,
					email: action.email,
					loading: false
				}
		case 'ERROR':
		return { 	error: action.error,
					loading: false
				}
	}// switch
}



const useRegLogHook = () => {

	const [authState, dispatchAuth] = useReducer(reducer, initState);

	const sendAuth = (url, data) => {
		dispatchAuth({type: 'SEND'});
		axios.post(url, data)
			.then(response => {
				dispatchAuth({
					type: 'RESPONSE', 
					token: response.data.idToken,
					time: new Date(new Date().getTime() + response.data.expiresIn * 1000 - 2000),
					email: response.data.email,
					userId: response.data.localId
				});
				
			})
			.catch(err => {
				dispatchAuth({
				 	type: 'ERROR',
				 	error: err.message
				})
				 
			});

			
	}

	return {
		sendAuth: sendAuth,
		error: authState.error,
		token: authState.token,
		time: authState.time,
		email: authState.email,
		userId: authState.userId,
		loading: authState.loading
	}
}

export default useRegLogHook;