import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './Login/Login';
import Signup from './Signup/Signup';
import SecondPage from './Signup/SecondPage';

function Celebrity() {
  return (
    <div id="main">
        <Router>
            <Route path="/celebrity/login">
                <Login/>
            </Route>
            <Route path="/celebrity/signup">
                <Signup/>
            </Route>
            <Route path="/celebrity/testCP">
              <SecondPage/>
            </Route>
        </Router>
    </div>
  );
}

export default Celebrity;