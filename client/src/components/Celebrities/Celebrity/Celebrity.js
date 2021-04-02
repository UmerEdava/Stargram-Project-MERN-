import React from 'react'
import { useSelector } from 'module';

import Celebrity from './Celebrities/Celebrity';
import useStyles from './style';

const Celebrity = ()=> {
    const celebrities = useSelector((state)=> state.celebrities)
    const classes = useStyles();
    
    console.log(celebrities);
    return(
        <>
         <h2>Welcome celebrities</h2>
         <Celebrity/>
         <Celebrity/>         
        </>
    )
}