import React, {useState, useContext} from 'react';
import './App.css';

import Toolbar from './components/UI/Toolbar/Toolbar';
import Kanban from './containers/Kanban/Kanban';


import FullContext from './containers/context/context';



function App() {

	const [isAuth, setIsAuth] = useState(false);
	const [userId, setUserId] = useState(null);
	const [token, setToken]	= useState(null);
	const [expirationDate, setExpirationDate] = useState(null); 


	const loginOnHandler = () => {
		setIsAuth(true);
	};

	const loginOffHandler = () => {
		setIsAuth(false);
		setUserId(null);
		setToken(null);
		setExpirationDate(null);
	};



	//const context = useContext(FullContext);

  return (
  <FullContext.Provider value={{
  		isAuth: isAuth, 
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
