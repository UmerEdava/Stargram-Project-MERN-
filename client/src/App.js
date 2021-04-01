import React from 'react';
import useStyles from './style'
import Login from '../src/components/Forms/Login'
import Appbar from './components/Appbar/Appbar';


const App = ()=>{
    const classes = useStyles();
    return(
        <>
        <Appbar/>    
        <Login/>
        </>
    )
}

export default App;