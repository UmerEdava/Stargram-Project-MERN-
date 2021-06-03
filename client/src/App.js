import {BrowserRouter as Router,Route} from 'react-router-dom'
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import ChangeProfilePicture from './components/User/Forms/Register-form/changeProfilePic';
import Celebrity from './components/Celebrity/Celebrity';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div>
      <Router>
        <Route path='/'><User/></Route>
        <Route path="/admin"><Admin/></Route>
        <Route path="/test"><ChangeProfilePicture/></Route>
        <Route path="/celebrity"><Celebrity/></Route>
        {/* <Route component={NotFound} /> */}
      </Router>  
    </div>
  )
}
       
export default App            