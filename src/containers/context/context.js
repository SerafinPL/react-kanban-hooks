import React from 'react';


const context = React.createContext({
	isAuth: false,
	login: () =>  {}
});

export default context