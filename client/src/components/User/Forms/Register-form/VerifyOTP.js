import React, { useState } from "react";
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

import RegisterCss from './Register.css';
import { useHistory } from "react-router";
import Axios from 'axios';
import Logo from '../../../../images/Stargram icon.jpg';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Card from '@material-ui/core/Card';

import CardActionArea from '@material-ui/core/CardActionArea';

import CardActions from '@material-ui/core/CardActions';

import CardContent from '@material-ui/core/CardContent';

import CardMedia from '@material-ui/core/CardMedia';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Stargram
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// function clickevent(first,last){
      
//     if(first.value.length){
//         document.getElementById(last).focus();
//     }
// } 

function SendOtp() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
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



 export default function VerifyOTP(props) {
  const classes = useStyles();

//   const [verifyOTP, setVerifyOTP] = useState();

  
  
  function checkAndNext(){
    let phone = props.values.phone
    let userDetails = props.values

    console.log('in function',phone);
    console.log('total value',userDetails);

    
    let otp = document.getElementById('1st').value+document.getElementById('2nd').value+document.getElementById('3rd').value+document.getElementById('4th').value+document.getElementById('5th').value+document.getElementById('6th').value

    console.log('*&*&',otp);

    console.log("form submitting...");

      Axios({
        method: "post",
        url: "http://localhost:3001/verifyOTP",
        headers: {
          "Content-Type": "application/json",
        },
        data: {VerifyOTP:otp,phone:phone,userDetails:userDetails},
      }).then((response)=>{
          console.log(response);
          if(response.data.verified){
              console.log('verified');
              props.nextStep()
          }else{
              console.log('invalid');
          }
      })
    
  }
  
  const [otp, setOtp] = useState()
  const { values, handleChange } = props;

  const history = useHistory();

  const [registerUser, setRegisterUser] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const [showOtp, setShowOtp] = useState(false)
  const onNext = () => setShowOtp(true)

  const changeHandler = (event) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };

  
    

  const submitButton = (event) => {
    event.preventDefault();
    let cPass = document.getElementById('Cpassword').value
    if (registerUser.password !== cPass) {
      document.getElementById('cPasswordError').innerHTML = "Passwords doesn't match"
    }else{
    
      console.log("form submitting...");
      Axios({
        method: "post",
        url: "http://localhost:3001/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: registerUser,
      })
        .then((response) => {
           console.log('***',response);

          if(response.data.email){
            console.log('ok',response);
            document.getElementById('signupForm').style.display = "none"
            //history.push("/");
          }else if(response.data.existingEmail){
            console.log('Existing email')
            document.getElementById('cPasswordError').innerHTML = "Another account is using this email address"
          }else if(response.data.existingPhone){
            console.log('Existing phone');
            document.getElementById('cPasswordError').innerHTML = "Another account is using this phone number"
          }
          
        })
        .catch((error) => {
           console.error(`Error :${error}`);
        });
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={Logo} alt='Logo' height="40px;"></img>
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify OTP
        </Typography>
        <Typography component="p" variant="p">
          Enter the OTP which have sent to your mobile
        </Typography>
        <form className={classes.form} onSubmit={submitButton}>
          
        <Grid container spacing={24} >
    <Grid item xs={2}>
        <TextField
            id="1st"
            // onKeyUp={clickevent(this,'2nd')}
            //label="PS"
            //value={this.state.re_pe_value}
            
            onInput={(e)=>{ 
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
            }}
            min={0}
            autoFocus
            margin="normal"
            type="number"
            margin = "dense"
            variant = "filled"
            style={{paddingRight: "20px", width: "80px"}}
        />
    </Grid>
    <Grid item xs={2}>
        <TextField
            id="2nd"
            // onKeyUp={clickevent(this,'3rd')}
            //label="MOOE"
            //value={this.state.re_mooe_value}
            
            margin="normal"
            type="number"
            margin = "dense"
            variant = "filled"
            style={{paddingRight: "20px", width: "80px"}}
        />
    </Grid>
    <Grid item xs={2}>
        <TextField
            id="3rd"
            // onKeyUp={clickevent(this,'4th')}
            //label="CO"
            //value={this.state.re_co_value}
            
            margin="normal"
            type="number"
            margin = "dense"
            variant = "filled"
            style={{paddingRight: "20px", width: "80px"}}
        />
    </Grid>
    <Grid item xs={2}>
        <TextField
            id="4th"
            // onKeyUp={clickevent(this,'5th')}
            //label="CO"
            //value={this.state.re_co_value}
            
            margin="normal"
            type="number"
            margin = "dense"
            variant = "filled"
            style={{paddingRight: "20px", width: "80px"}}
        />
    </Grid>
    <Grid item xs={2}>
        <TextField
            id="5th"
            // onKeyUp={clickevent(this,'6th')}
            //label="CO"
            //value={this.state.re_co_value}
            
            margin="normal"
            type="number"
            margin = "dense"
            variant = "filled"
            style={{paddingRight: "20px", width: "80px"}}
        />
    </Grid>
    <Grid item xs={2}>
        <TextField
            id="6th"
            //label="CO"
            //value={this.state.re_co_value}
            
            margin="normal"
            type="number"
            margin = "dense"
            variant = "filled"
            style={{paddingRight: "20px", width: "80px"}}
        />
    </Grid>
</Grid>
  
          <p id="cPasswordError" style={{ color: 'rgb(255 0 0)' }}></p>          
          
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //className={classes.submit}
            onClick={checkAndNext}
          >
            Continue
          </Button>
          <Button size="small" color="primary" onClick={props.previousStep}>
             Didn't get code? Resend
           </Button>
          { showOtp ? <SendOtp /> : null }
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}