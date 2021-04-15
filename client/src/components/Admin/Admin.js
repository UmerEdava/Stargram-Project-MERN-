import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import All_Users from './All Users/All_Users';
import Dashboard from './Dashboard/Dashboard';


export default function Admin() {
    return (
        <div>
            <Router>
            <Route path="/admin" exact>
              <Dashboard/>
            </Route>
            <Route path="/admin/all_users">
              <All_Users/>
            </Route>
        </Router>
        </div>
    )
}
