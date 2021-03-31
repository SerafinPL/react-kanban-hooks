//import logo from './logo.svg';
import './App.css';
import Toolbar from './components/UI/Toolbar/Toolbar';
import Kanban from './containers/Kanban/Kanban';

function App() {
  return (
    <div className="App">
      <Toolbar/>
      <Kanban/>
    </div>
  );
}

export default App;
