import React, { useState,useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import server from '../../../../Server'
import axios from 'axios';
import { useHistory } from "react-router";
import Logo from '../../../../images/Stargram icon.jpg';
import GoogleLogin from 'react-google-login';
import './ForgotPassword.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Stargram
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const useSSNFields = () => {
    const [otpValues, setValue] = useState({});
    const [totalValue,setTotalValue] = useState("")
  
    return {
      handleChange: e => {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");
  
        
        // Check if they hit the max character length
        if (value.length >= maxLength) {
          // Check if it's not the last input field
          if (parseInt(fieldIndex, 10) < 6) {
            // Get the next input field
            const nextSibling = document.querySelector(
              `input[name=otp-${parseInt(fieldIndex, 10) + 1}]`
            );
  
            // If found, focus the next field
            if (nextSibling !== null) {
              nextSibling.focus();
            }
          }
        }else{
             console.log('else back')
            // Check if it's not the last input field
          if (parseInt(fieldIndex, 10) != 1) {
            // Get the next input field
            const backSibling = document.querySelector(
              `input[name=otp-${parseInt(fieldIndex, 10) - 1}]`
            );
  
            // If found, focus the next field
            if (backSibling !== null) {
                backSibling.focus();
            }
          }
        }
  
        setValue({
          ...otpValues,
          [`otp${fieldIndex}`]: value
        });

        setTotalValue(JSON.stringify(otpValues)); 
 
        console.log(otpValues)
        console.log(totalValue)

      }
    };
};

export default function ForgotPassword() {
    const classes = useStyles();
    
    const history = useHistory()

    const [otpNumber, setOtpNumber] = useState('');
    const { handleChange } = useSSNFields();

    function otpNumberSubmit(e) {
        e.preventDefault()
        console.log(otpNumber)
        axios.post(server+'/forgotPasswordNumber',{
            phone:otpNumber
        },{
            headers:{
               'x-access-token': localStorage.getItem('token')
            }
        }).then((response)=>{
            console.log(response)
            if(response.data.isValidUserAndOtpSent){
                document.getElementById('otpNumberContainer').style.display = 'none'
                document.getElementBydId('otpCodeContainer').style.display = 'block'
                document.getElementById('formHeading').textContent = 'Enter OTP'
                document.getElementById('formDescription').textContent = 'Please enter the otp sent to your phone'
                document.getElementById('otpOptions').style.display = 'block'
                document.getElementById('otpButton'). value = 'Submit OTP'
                history.push('/forgotOTP')
            }else if(response.data.inValidUser){
                document.getElementById('errorSentence').textContent = 'There is no user exists with this number'
            }else if(response.data.otpError){
                document.getElementById('errorSentence').textContent = 'Sorry, there is a problem with the otp service.. Please try again'
            }

        })
    }

    return (
        <div>
            <Container id='mainComponent' component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <img src={Logo} alt='Logo' height="40px;"></img>
                    </Avatar>
                    <Grid container>
                        <Grid item xs>
                        <Link style={{cursor:'pointer'}} onClick={()=>history.push("/login")} variant="body2">
                            Back To Login
                        </Link>
                        </Grid>
                    </Grid> 
                    <Typography id='formHeading' style={{float:'left',width:'100%',fontWeight:'700'}} component="h1" variant="h5">
                    Forgot Password
                    </Typography>
                    <p id='formDescription' style={{float:'left',width:'100%',marginBottom:'0rem'}}>Send a OTP to your phone to reset your password</p>
                    
                    <form className={classes.form} onSubmit={otpNumberSubmit}>
                    
                    <Grid id='otpNumberContainer' item xs={12}>
                        <TextField
                        margin="normal"
                        id="phone"
                        name="phone"
                        fullWidth
                        required
                        label="Phone"
                        onChange={(e)=>setOtpNumber(e.target.value)}
                        autoFocus
                        />
                    </Grid>

                    <Grid id='otpCodeContainer' style={{display:'none'}} xs={12}>
                        <input className='otpTextField' onChange={handleChange} name='otp-1' maxLength={1} type='text'></input>
                        <input className='otpTextField' onChange={handleChange} name='otp-2' maxLength={1} type='text'></input>
                        <input className='otpTextField' onChange={handleChange} name='otp-3' maxLength={1} type='text'></input>
                        <input className='otpTextField' onChange={handleChange} name='otp-4' maxLength={1} type='text'></input>
                        <input className='otpTextField' onChange={handleChange} name='otp-5' maxLength={1} type='text'></input>
                        <input className='otpTextField' onChange={handleChange} name='otp-6' maxLength={1} type='text' style={{marginRight:'0rem'}}></input>
                    </Grid>


                    <Grid container id='otpOptions' style={{display:'none'}}>
                        <Grid item xs>
                        <Link style={{cursor:'pointer'}} onClick={()=>history.push("/forgotPassword")} variant="body2">
                            {"Change the phone number"}
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link style={{cursor:'pointer'}} onClick={()=>history.push("/register")} variant="body2">
                            Didn't receive code? Send again
                        </Link>
                        </Grid>
                    </Grid>

                    <p id="errorSentence" className="text-center" style={{color: "red"}}></p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        id='otpButton'
                    >
                        Send OTP
                    </Button>
                    
                    </form>
                    
                </div>
                
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    )
}
