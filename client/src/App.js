import {BrowserRouter as Router,Route} from 'react-router-dom'
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import ChangeProfilePicture from './components/User/Forms/Register-form/changeProfilePic';

function App() {
  return (
    <div>
      <Router>
        <Route path='/'><User/></Route>
        <Route path="/admin"><Admin/></Route>
        <Route path="/test"><ChangeProfilePicture/></Route>
      </Router>  
    </div>
  )
}
       
export default App            