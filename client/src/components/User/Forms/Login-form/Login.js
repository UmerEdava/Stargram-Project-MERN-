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

import Axios from 'axios';
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



export default function Login() {
  const classes = useStyles();
 
  const [login, setLogin] = useState();
  const [loginStatus,setLoginStatus] = useState(false);

  const changeHandler = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const history = useHistory();

  const loginSubmit = (event) => {
    event.preventDefault();
    
      console.log("form submitting...");
      Axios({
        method: "post",
        url: "http://localhost:3001/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: login
      }).then((response)=>{
        // if(response.data.valid){
        //   console.log('valid');
        //   history.push("/");
        // }else if (response.data.wrong){
        //   console.log('wrong')
        // }else if (response.data.notUser){
        //   console.log('not a user');
        // }
        console.log('front', response.data.user);
        if(!response.data.auth){
          setLoginStatus(false)
          if(response.data.wrong){
            console.log('thettu');
            document.getElementById('loginError').innerHTML = "Invalid username or password"
          }else if(response.data.notUser){
            console.log('kallan');
            document.getElementById('loginError').innerHTML = "User not valid"
          }
          
        }else{
          setLoginStatus(true)
          localStorage.setItem("token", response.data.token)
          localStorage.setItem('userId', response.data.userId)
          // localStorage.setItem('username', response.data)
          localStorage.setItem('username', response.data.username)
          history.push("/");
        }
      })
    }

    let values = {}

    

    const responseSuccessGoogle = (response) => {
      console.log(response.profileObj.name,response.profileObj.email)
      console.log(response);
      console.log(values);
      values.username = response.profileObj.name
      values.email = response.profileObj.email
      console.log(values);
      Axios({
       method: "post",
       url: "http://localhost:3001/googleLogin",
       headers: {
         "Content-Type": "application/json",
       },
       data: values
     }).then((response)=>{
       if(response){
         console.log('returned',response)
         localStorage.setItem("token", response.data.token)
         localStorage.setItem("userId", response.data.userId)
         localStorage.setItem("username", response.data.username)
         history.push("/")
       }
     })
   }
 
   const responseErrorGoogle = (response) => {
     console.log(response);    
   }

   useEffect(() => {
    var user = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    console.log("effect...",user,token);

      if(token){
          history.push('/')
      }
    })


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <img src={Logo} alt='Logo' height="40px;"></img>
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <GoogleLogin
          clientId="810147001315-mq6dijpgu99sfuu9ibb4tced7rhqe84g.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle} 
          cookiePolicy={'single_host_origin'}
        />
        <form className={classes.form} onSubmit={loginSubmit}>
        
          <Grid item xs={12}>
            <TextField
              margin="normal"
              id="emailOrPhone"
              name="emailOrPhone"
              fullWidth
              required
              label="Email/Phone"
              onChange={changeHandler}
              autoFocus
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
              autoComplete="current-password"
              onChange={changeHandler}
            />
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <p id="loginError" className="text-center" style={{color: "red"}}></p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}