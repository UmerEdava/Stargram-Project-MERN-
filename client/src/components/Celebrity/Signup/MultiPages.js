import React, { Component } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

export class MultiPages extends Component {
    
    state = {
        step: 1,
        email: '',
        phone: '',
        password: '',
        otp: '',
        starname: '',
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
        const { firstName, lastName, email, phone, password, celebrityField } = this.state;
        const values = { firstName, lastName, email, phone, password, celebrityField }
        
        switch(step) {
            case 1: 
               return(
                    <FirstPage
                      nextStep = {this.nextStep}
                      handleChange = {this.handleChange}
                      values = {values}
                    />
                )
                case 2:
                    return(
                        <SecondPage
                          nextStep = {this.nextStep}
                          previousStep = {this.previousStep}
                          handleChange = {this.handleChange}
                          values = {values}
                        />
                    )
                // case 3:
                //     return(
                //         <VerifyOTP
                //         nextStep = {this.nextStep}
                //         previousStep = {this.previousStep}
                //         handleChange = {this.handleChange}
                //         values = {values}
                //       />
                //     )
                // case 4:
                //     return(
                //         <ChangeProfilePicture
                //         nextStep = {this.nextStep}
                //         previousStep = {this.previousStep}
                //         handleChange = {this.handleChange}
                //         values = {values}
                //       />
                //     )

        }
         
    }
} 

export default MultiPages