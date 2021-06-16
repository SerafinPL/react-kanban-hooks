import React from "react";
import "./App.css";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import Kanban from "./containers/Kanban/Kanban";

import FullContextProvider from "./containers/context/context";

const App = () => {
  return (
    <FullContextProvider>
      <div className="App">
        <Toolbar />
        <Kanban />
      </div>
    </FullContextProvider>
  );
};

export default App;
