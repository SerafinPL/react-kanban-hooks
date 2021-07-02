import React from "react";
import "./App.css";

import Toolbar from "./components/UI/Toolbar/Toolbar";
import Kanban from "./containers/Kanban/Kanban";

import FullContextProvider from "./containers/context/context";
import FuncContextProvider from "./containers/context/funcContext";

const App = () => {
  return (
    <FullContextProvider>
      <div className="App">
        <Toolbar />
        <FuncContextProvider>
          <Kanban />
        </FuncContextProvider>
      </div>
    </FullContextProvider>
  );
};

export default App;
