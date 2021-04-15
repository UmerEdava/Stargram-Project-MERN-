import {BrowserRouter as Router,Route} from 'react-router-dom'
import User from './components/User/User';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <div>
      <Router>
        <Route path='/'><User/></Route>
        <Route path="/admin"><Admin/></Route>
      </Router>  
    </div>
  )
}
       
export default App            