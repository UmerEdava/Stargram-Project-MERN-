import React, { Component } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import DetailsPage from './DetailsPage'
import VerifyOTP from './VerifyOTP'

export class MultiPages extends Component {
    
    state = {
        step: 1,
        email: '',
        phone: '',
        password: '',
        otp: '',
        starname: '',
        image: ''
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

    handleImageChange = input => e => {
        this.setState({[input]: e.target.files[0]})
    }

    render() {
        const { step } = this.state;
        const { displayName, email, phone, password, profession, description, image } = this.state;
        const values = { displayName, email, phone, password, profession, description, image }
        
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
                          handleImageChange = {this.handleImageChange}
                        />
                    )
                case 3:
                    return(
                        <DetailsPage
                        nextStep = {this.nextStep}
                        previousStep = {this.previousStep}
                        handleChange = {this.handleChange}
                        values = {values}
                      />
                    )
                case 4:
                    return(
                        <VerifyOTP
                        nextStep = {this.nextStep}
                        previousStep = {this.previousStep}
                        handleChange = {this.handleChange}
                        values = {values}
                      />
                    )

        }
         
    }
} 

export default MultiPages