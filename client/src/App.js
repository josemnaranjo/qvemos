import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Evaluation from './views/Evaluation';
import NewGame from './views/NewGame';
import Recommendations from './views/Recommendations.jsx';
import ThreeFinalists from './views/ThreeFinalists';
import Winner from './views/Winner';
import EditGameName from './views/EditGameName';
import {UserProvider} from './contexts/userContext';




function App() {

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/recommendations/:id" element={<Recommendations />} />
          <Route path="/finalists/:id" element={<ThreeFinalists />} />
          <Route path="/winner/:id" element={<Winner />} />
          <Route path="/evaluation/:id" element={<Evaluation />} />
          <Route path="/edit-game-name/:id" element={<EditGameName />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
