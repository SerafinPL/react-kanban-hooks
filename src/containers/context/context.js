import React from 'react';


const context = React.createContext({
	isAuth: false,
	login: () =>  {},
	userId: null,
	token: null,
	expirationDate: null
});

export default context