import React, {useEffect} from 'react';
import useStyles from './style';
import Login from '../src/components/Forms/Login';
import Appbar from './components/Appbar/Appbar';
import {useDispatch} from 'react-redux';
import {getCelebrities} from './actions/celebrities'


const App = ()=>{
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCelebrities());
    },[dispatch])

    return(
        <>
        <Appbar/>    
        <Login/>
        </>
    )
}

export default App;