import { TextField } from '@material-ui/core';
import React, { Component } from 'react'

export class PersonalDetails extends Component {
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
                <h2>Second</h2>    
                <TextField
                  Label="phone"
                  onChange={handleChange('phone')}                
                  defaultValue={values.phone}
                  
                />  
                <br/>
                <button onClick={this.continue}>Continue</button>          
                <button onClick={this.back}>Back</button>          

            </div>
            
        )
    }
}

export default PersonalDetails