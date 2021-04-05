import { TextField } from '@material-ui/core';
import React, { Component } from 'react'

export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.previousStep();
    }
    
    render() {
        const { values, handleChange } = this.props;
        console.log(values)
        return (
            <div>
                <h2>Third</h2>    
                <TextField
                  
                  onChange={handleChange('username')}                
                  defaultValue={values.username}
                  
                />  
                <br/>
                <button onClick={this.continue}>Continue</button>          
                <button onClick={this.back}>Back</button>          

            </div>
            
        )
    }
}

export default Confirm