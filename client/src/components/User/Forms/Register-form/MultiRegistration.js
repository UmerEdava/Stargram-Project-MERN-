import React, { Component } from 'react'
import SendOtp from './SendOtp';
import VerifyOTP from './VerifyOTP';
import ChangeProfilePicture from './changeProfilePic';
import FirstPage from './FirstPage'


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
        const { email, phone, password, displayName, otp, creditMessages, referralCode, referredBy, referralCount } = this.state;
        const values = { email, phone, password, displayName, otp, creditMessages, referralCode, referredBy, referralCount }
        
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
                        <SendOtp
                          nextStep = {this.nextStep}
                          previousStep = {this.previousStep}
                          handleChange = {this.handleChange}
                          values = {values}
                        />
                    )
                case 3:
                    return(
                        <VerifyOTP
                        nextStep = {this.nextStep}
                        previousStep = {this.previousStep}
                        handleChange = {this.handleChange}
                        values = {values}
                      />
                    )
                case 4:
                    return(
                        <ChangeProfilePicture
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