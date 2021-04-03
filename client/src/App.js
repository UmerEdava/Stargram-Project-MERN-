import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Appbar from './components/User/Appbar/Appbar';
import Register from './components/User/Forms/Register-form/Register';
import Login from './components/User/Forms/Login-form/Login';

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
            <Route path="/login">
              <Login/>
            </Route>
        </Router>
    </div>
  );
}

export default App;