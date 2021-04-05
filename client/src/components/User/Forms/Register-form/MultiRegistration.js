import React, { Component } from 'react'
import UserDetails from './UserDetails'
import PersonalDetails from './PersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import TestRegister from './TestRegister'


export class MultiRegistration extends Component {
    
    state = {
        step: 1,
        email: '',
        phone: '',
        password: '',
        otp: '',
        username: '',
        image: '',
    }

    //Continue to the next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    //Go back to the previous step
    previousStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    // Handle fields change
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    render() {
        const { step } = this.state;
        const { email, phone, password, username, otp } = this.state;
        const values = { email, phone, password, username, otp }
        
        switch(step) {
            case 1: 
               return(
                    <TestRegister
                      nextStep = {this.nextStep}
                      handleChange = {this.handleChange}
                      values = {values}
                    />
                )
                case 2:
                    return(
                        <PersonalDetails
                          nextStep = {this.nextStep}
                          previousStep = {this.previousStep}
                          handleChange = {this.handleChange}
                          values = {values}
                        />
                    )
                case 3:
                    return(
                        <Confirm
                        nextStep = {this.nextStep}
                        previousStep = {this.previousStep}
                        handleChange = {this.handleChange}
                        values = {values}
                      />
                    )
                case 4:
                    return(
                        <Success
                        nextStep = {this.nextStep}
                        previousStep = {this.previousStep}
                        handleChange = {this.handleChange}
                        values = {values}
                      />
                    )

        }
         
    }
}

export default MultiRegistration