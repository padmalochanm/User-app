import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './pages/HomePage';
import UserPage from './pages/UserPage';
import TeamPage from './pages/TeamPage';
import NewUser from './Components/NewUser';
import UpdatePage from './pages/UpdatePage';
import NewTeam from './Components/NewTeam';
import DetailPage from './Components/DetailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/users" element={<UserPage/>} />
          <Route path="/teams" element={<TeamPage/>}/>
          <Route path="/newTeam" element={<NewTeam/>}/>
          <Route path="/newUser" element={<NewUser/>}/>
          <Route path="/update" element={<UpdatePage/>}/>
          <Route path="/details" element={<DetailPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
