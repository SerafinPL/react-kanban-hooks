import React, {useState} from 'react';
import './App.css';

import Toolbar from './components/UI/Toolbar/Toolbar';
import Kanban from './containers/Kanban/Kanban';



import FullContext from './containers/context/context';



function App() {

	

	const [isAuth, setIsAuth] = useState(false);
	const [userId, setUserId] = useState(null);
	const [token, setToken]	= useState(null);
	const [expirationDate, setExpirationDate] = useState(null);
	const [email, setEmail] = useState(null); 


	const loginOnHandler = (userId, token, expirationDate, email) => {
		setIsAuth(true);
		setUserId(userId);
		setToken(token);
		setExpirationDate(expirationDate);
		setEmail(email);


	};

	const loginOffHandler = () => {
		setIsAuth(false);
		setUserId(null);
		setToken(null);
		setExpirationDate(null);
		setEmail(null);
		
	};



	//const context = useContext(FullContext);

  return (
  <FullContext.Provider value={{
  		isAuth: isAuth,
  		userId: userId,
  		token: token,
  		expirationDate: expirationDate,
  		email: email,
  		loginOn: loginOnHandler, 
  		loginOff: loginOffHandler}}>
    <div className="App">

      <Toolbar/>
      <Kanban/>
          
    </div>
  </FullContext.Provider>
  
  );
}

export default App;
