import { TextField } from '@material-ui/core';
import React, { Component } from 'react'

export class Success extends Component {
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
        return (
            <div>
                <h2>Fouth</h2>    
                <TextField
                  Label="otp"
                  onChange={handleChange('otp')}                
                  defaultValue={values.otp}
                  
                />  
                <br/>
                <button onClick={this.continue}>Continue</button>          
                <button onClick={this.back}>Back</button>          

            </div>
            
        )
    }
}

export default Success