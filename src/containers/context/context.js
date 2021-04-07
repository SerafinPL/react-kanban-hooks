import React from 'react';


const context = React.createContext({
	isAuth: false,
	userId: null,
	token: null,
	expirationDate: null
});

export default context