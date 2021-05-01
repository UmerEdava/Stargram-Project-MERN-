import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from './Login/Login';
import Signup from './Signup/Signup';
import SecondPage from './Signup/SecondPage';
import DetailsPage from './Signup/DetailsPage';
import VerifyOTP from './Signup/VerifyOTP';
import Onverification from './Signup/Onverification';

function Celebrity() {
  return (
    <div id="main">
        <Switch>
            {/* <Route path="/celebrity/login">
                <Login/>
            </Route> */}
            <Route path="/celebrity/signup">
                <Signup/>
            </Route>
            <Route path="/celebrity/testCP">
              <VerifyOTP/>
            </Route>
            <Route path="/celebrity/onverification">
              <Onverification/>
            </Route>
        </Switch>
    </div>
  );
}

export default Celebrity;