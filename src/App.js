import React, {useState, useContext} from 'react';
import './App.css';

import Toolbar from './components/UI/Toolbar/Toolbar';
import Kanban from './containers/Kanban/Kanban';


import FullContext from './containers/context/context';



function App() {

	const [isAuth, setIsAuth] = useState(false);

	const loginOnHandler = () => {
		setIsAuth(true);
	};

	const loginOffHandler = () => {
		setIsAuth(false);
	};

	const context = useContext(FullContext);

  return (
  <FullContext.Provider value={{isAuth: isAuth, loginOn: loginOnHandler, loginOff: loginOffHandler}}>
    <div className="App">

      <Toolbar/>

       <Kanban/>
      
      
    </div>
  </FullContext.Provider>
  
  );
}

export default App;
