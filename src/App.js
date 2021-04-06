import React, {useContext} from 'react';
import './App.css';

import Toolbar from './components/UI/Toolbar/Toolbar';
import Kanban from './containers/Kanban/Kanban';


import Context from './containers/context/context';



function App() {


	const context = useContext(Context);

  return (
  
    <div className="App">
      <Toolbar/>

      {context.isAuth ? <Kanban/> : null}
      
    </div>
  
  );
}

export default App;
