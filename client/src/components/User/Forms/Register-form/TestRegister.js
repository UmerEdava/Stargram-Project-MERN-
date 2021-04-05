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



export default function TestRegister(props) {
  const classes = useStyles();
  
  function checkAndNext(){
      console.log('ok faster',values);
      let cPass = document.getElementById('Cpassword').value
      if (values.password !== cPass) {
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
            if(response){
                console.log('***',response);
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
              id="username"
              name="username"
              fullWidth
              required
              type="text"
              label="Username"
              
              autoFocus              
              //onChange={changeHandler}
              onChange={handleChange('username')}                
              defaultValue={values.username}
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
          <Grid item xs={12}>
            <TextField
              margin="normal"
              id="phone"
              name="phone"
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
          <p id="cPasswordError" style={{ color: 'rgb(255 0 0)' }}></p>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" id="signupForm" />}
            label="Remember me"
          />
          
          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //className={classes.submit}
            onClick={checkAndNext}
          >
            Next
          </Button>
          { showOtp ? <SendOtp /> : null }
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already a user? Log in"}
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