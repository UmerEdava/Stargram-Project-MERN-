// import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Appbar from './Appbar/Appbar';
import Register from './Forms/Register-form/Register';
import MultiRegister from './Forms/Register-form/MultiRegistration';
import MainMulti from './Forms/Register-form/MainMulti';
import Login from './Forms/Login-form/Login';
import PP from './Forms/Register-form/changeProfilePic';
import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';
import Home from './Home/Home'
import BuyMessage from './Buy Messages/BuyMessage';
import MessagePage from './Messages/MessagePage';
import Notifications from './Notifications/Notifiations'
import OtherPersonProfile from './Profile/OtherPersonProfile';
import Chatbox from './Messages/Chat/Chatbox'

function User() {
  return (
    <div id="main">
        <Switch>
            <Route path="/" exact>
              <Home/> 
            </Route>
            <Route path="/register">
              <MainMulti/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            {/* <Route path="/testregister">
               <Register/>
            </Route> */}
            <Route path="/edit_profile"> 
              <Appbar/><EditProfile/>
            </Route>
            <Route path="/profile">
              <Profile/>
            </Route>
            <Route path="/buy_message">
              <Appbar/><BuyMessage/>
            </Route>
            <Route path="/messages">
              <Appbar/><MessagePage/>
            </Route>
            <Route path="/notifications">
              <Appbar/><Notifications/>
            </Route>
            <Route path="/secondProfile/:starId">
              <Appbar/><OtherPersonProfile/>
            </Route>
            <Route path="/chatbox/:displayName/:starId">
              <Appbar/><Chatbox/>
            </Route>
        </Switch>
    </div>
  );
}

export default User;