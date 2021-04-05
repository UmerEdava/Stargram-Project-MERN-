import { TextField } from '@material-ui/core';
import React, { Component } from 'react'

export class UserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    
    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <h2>First</h2>    
                <TextField
                  Label="email"
                  onChange={handleChange('email')}                
                  defaultValue={values.email}
                />  
                <br/>
                <button
                   
                   onClick={this.continue}
                >
                    Continue                    
                </button>          
            </div>
            
        )
    }
}

export default UserDetails