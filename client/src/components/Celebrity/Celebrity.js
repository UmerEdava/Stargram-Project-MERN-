import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './Login/Login';
import Signup from './Signup/Signup';
import SecondPage from './Signup/SecondPage';
import DetailsPage from './Signup/DetailsPage';
import VerifyOTP from './Signup/VerifyOTP';

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
              <VerifyOTP/>
            </Route>
        </Router>
    </div>
  );
}

export default Celebrity;