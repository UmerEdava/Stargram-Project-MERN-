import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Appbar from './components/User/Appbar/Appbar';
import Register from './components/User/Forms/Register-form/Register';
import MultiRegister from './components/User/Forms/Register-form/MultiRegistration';
import MainMulti from './components/User/Forms/Register-form/MainMulti';
import Login from './components/User/Forms/Login-form/Login';
import PP from './components/User/Forms/Register-form/changeProfilePic';

function App() {
  return (
    <div>
        <Router>
            <Route path="/" exact>
              <Appbar/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/testregister">
              <MainMulti/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/testPP">
              <PP/>
            </Route>
        </Router>
    </div>
  );
}

export default App;