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
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



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



 export default function FirstPage(props) {
  const classes = useStyles();
  const [phone,setPhone] = useState()
  const imgUrl = 'https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-github-1.png'
  
  function checkAndNext(e){
    e.preventDefault()
      
      let cPass = document.getElementById('Cpassword').value
      if (
        values.displayName !== "" &&
        values.email !== "" &&
        values.phone !== "" &&
        values.password !== "" &&
        values.cPassword !== ""
      ) {
        if (values.password !== cPass) {
            console.log('ifil',cPass);
            document.getElementById('cPasswordError').innerHTML = "Passwords doesn't match"
        }else{
            Axios({
              method: "post",
              url: "http://localhost:3001/checkExisting",
              headers: {
                "Content-Type": "application/json",
              },
              data: values
            })
              .then((response) => {
                  if(response.data.existingEmail){
                    document.getElementById('cPasswordError').innerHTML = "Another account is using this email address"
                  }else if(response.data.existingPhone){
                    document.getElementById('cPasswordError').innerHTML = "Another account is using this phone number"
                  }else if(response.data.existingDisplayName){
                    document.getElementById('cPasswordError').innerHTML = "Sorry, display name already exists"
                  }else if(response.data.referralWrong){
                    document.getElementById('cPasswordError').innerHTML = "Sorry, entered referral code is incorrect"
                  }else if(response.data.newUser){
                    
                      if(response.data.referredBy == 'normal'){
                        values.referredBy = 'none'
                      }else{
                        values.referredBy = response.data.referredBy
                      }

                      // values.creditMessages = 0
                      props.nextStep()
                  }
                 
      
              //   if(response.data.email){
              //     console.log('ok',response);
              //     document.getElementById('signupForm').style.display = "none"
              //     //history.push("/");
              //   }else if(response.data.existingEmail){
              //     console.log('Existing email')
              //     document.getElementById('cPasswordError').innerHTML = "Another account is using this email address"
              //   }else if(response.data.existingPhone){
              //     console.log('Existing phone');
              //     document.getElementById('cPasswordError').innerHTML = "Another account is using this phone number"
              //   }
                
              })
              .catch((error) => {
                 console.error(`Error :${error}`);
              });
          }
          
      }else{
        document.getElementById('cPasswordError').innerHTML = "Please fill the form"

      }
 }
  
  
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

  const responseSuccessGoogle = (response) => {
     console.log(response.profileObj.name,response.profileObj.email)
     console.log(response);
     console.log(values);
     values.displayName = response.profileObj.name
     values.email = response.profileObj.email
     console.log(values);
     Axios({
      method: "post",
      url: "http://localhost:3001/googleSignup",
      headers: {
        "Content-Type": "application/json",
      },
      data: values 
    }).then((response)=>{
      console.log('res',response)
      if(response){
        localStorage.setItem("token", response.data.token)
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('displayName', response.data.displayName)
        history.push("/")
      }
    })
  }

  const responseErrorGoogle = (response) => {
    console.log(response);    
  }

  const responseFacebook = (response) => {
    console.log(response.name);
    values.displayName = response.name
     console.log(values);
     Axios({
      method: "post",
      url: "http://localhost:3001/googleSignup",
      headers: {
        "Content-Type": "application/json",
      },
      data: values
    }).then((response)=>{
      console.log('response',response)
      if(response){
        localStorage.setItem("token", response.data.token)
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('displayName', response.data.displayName)
        history.push("/")
      }
    }) 
  }

  const onSuccess = response => console.log("ddd",response);
  const onFailure = response => console.error(response);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={`${classes.paper} text-center`}>
        <Avatar className={classes.avatar}>
          <img src={Logo} alt='Logo' height="40px;"></img>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        

        <form className={classes.form} onSubmit={submitButton}>
          
          <Grid item xs={12}>
            <TextField
              margin="normal"
              id="displayName"
              name="displayName"
              fullWidth
              required
              type="text"
              label="displayName"
              
              autoFocus              
              //onChange={changeHandler}
              onChange={handleChange('displayName')}                
              defaultValue={values.displayName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              id="email"
              name="email"
              fullWidth
              required 
              type="email"
              label="Email"
              autoComplete="email"
                            
              //onChange={changeHandler}
              onChange={handleChange('email')}
              defaultValue={values.email}
            />
          </Grid>
          {/* <Grid item xs={12}>
          <PhoneInput
              margin="normal"
              id="phone"
              name="phone"
              fullWidth
              required
              international
              label="Mobile"
              countryCallingCodeEditable={false}
              defaultCountry="RU"
              value={phone}
              onChange={setPhone}
              />
          </Grid> */}
          
          <Grid item xs={12}>
            <TextField
              
              fullWidth
              required
              type="number"
              label="Mobile"
              autoComplete="number"
              //onChange={changeHandler}
              onChange={handleChange('phone')}                
              defaultValue={values.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              id="password"
              name="password"
              fullWidth
              required
              type="password"
              label="password"
              //onChange={changeHandler}
              onChange={handleChange('password')}                
              defaultValue={values.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              id="Cpassword"
              fullWidth
              required
              type="password"
              label="Confirm password"
              onChange={handleChange('cPassword')}                
              defaultValue={values.email}
              
            />
            
          </Grid>
          <input id='referralCode' onChange={handleChange('referralCode')} type='text' placeholder='Referral Code'></input>
          <p id="cPasswordError" style={{ color: 'rgb(255 0 0)' }}></p>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" id="signupForm" />}
            label="Remember me"
          /> */}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //className={classes.submit}
            onClick={checkAndNext}
          >
            Continue
          </Button>
          { showOtp ? <SendOtp /> : null }
          <Grid container>
            
            <Grid item>
              <Link style={{cursor:'pointer'}} onClick={()=>history.push("/login")} variant="body2">
                {"Already a user? Log in"}
              </Link>
            </Grid>
          </Grid>
        </form>

        <h5 id="orLabel">or continue with</h5>

        <div className="row">
          <div className="col-6">
          <GoogleLogin
            clientId="810147001315-mq6dijpgu99sfuu9ibb4tced7rhqe84g.apps.googleusercontent.com"
            buttonText="Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
          />
          </div>
          <div className="col-6">
          <FacebookLogin
            appId="448548032895347"
            autoLoad={false}
            callback={responseFacebook}
            icon="fa-facebook"
            textButton=" Facebook"
            cssClass="my-facebook-button-class"
          />

          </div>
          <div className="col-sm-4">
          {/* <GitHubLogin clientId="38e3ed84887a175bf699"
            onSuccess={onSuccess}
            onFailure={onFailure}
            className="github-button"     
            buttonText="github"
                
          /> */}
          </div>
        </div>
        

    

      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}