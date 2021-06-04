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

export default function ForgotPassword() {
    const classes = useStyles();
    
    const history = useHistory()


    const [otpNumber, setOtpNumber] = useState('');

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
            
        })
    }
      

    return (
        <div>
            <Container component="main" maxWidth="xs">
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
                    <Typography style={{float:'left',width:'100%',fontWeight:'700'}} component="h1" variant="h5">
                    Reset Password
                    </Typography>
                    <p style={{float:'left',width:'100%',marginBottom:'0rem'}}>Please choose your new password</p>
                    
                    <form className={classes.form} onSubmit={otpNumberSubmit}>
                    
                    <Grid item xs={12}>
                        <TextField
                        margin="normal"
                        id="newPassword"
                        name="newPassword"
                        fullWidth
                        required
                        label="New Password"
                        onChange={(e)=>setOtpNumber(e.target.value)}
                        autoFocus
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                        margin="normal"
                        id="confirmPassword"
                        name="confirmPassword"
                        fullWidth
                        required
                        label="Confirm Password"
                        onChange={(e)=>setOtpNumber(e.target.value)}
                        autoFocus
                        />
                    </Grid>
                    <p id="errorSentence" className="text-center" style={{color: "red"}}></p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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