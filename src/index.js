import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Context from './containers/context/context';

ReactDOM.render(
	<Context.Provider value={{isAuth: true}}>
    
      <App />
    </Context.Provider>
      ,

  document.getElementById('root')
);

