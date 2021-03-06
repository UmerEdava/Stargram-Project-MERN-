import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Logo from '../../../images/Stargram icon.jpg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Stargram
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
  const { values, handleChange } = props;

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem('token')
    let starToken = localStorage.getItem('starToken')
    console.log("effect...",token);

      if(token&&starToken){
          history.push('/')
      }

  })

  // const [registrationDetails,setRegistrationDetails] = useState();

  // const changeHandler = (event) => {
  //   setRegistrationDetails({
  //     ...registrationDetails,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // console.log(registrationDetails);

  var registerForm = document.getElementById('registerForm');


  const handleSubmit = event => {
    
    event.preventDefault();
    console.log('prooo',values)
    var length = document.getElementById('password').value.length
    if(length>=6){
      console.log('in if')
      axios({
        method: "post",
        url: "http://localhost:3001/checkCelebrityExisting",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          displayName:values.displayName,
          email:values.email,
          phone:values.phone
        },
      }).then((response)=>{
        console.log(response)
        if(response.data.existing){
          console.log(response,'existing');
          document.getElementById('error').textContent = "An account already exists with this credentials"
        }else{
          console.log(response,'new star');
          props.nextStep()
        }
      })

    }else{
      document.getElementById('error').innerHTML = "Password should be more than 6 characters"
    }

    // axios({
    //     method: "post",
    //     url: "http://localhost:3001/celebrityRegister",
    //     headers: {
    //     "Content-Type": "application/json",
    //     },
    //     data: registrationDetails
    // }).then((response)=>{
    //     if(response){
    //         console.log(response);
    //     }
    // })
  
  };
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <img src={Logo} alt='Logo' height="40px;"></img>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register as Celebrity
        </Typography>
        <form id='registerForm' className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="dname"
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display name"
                autoFocus
                onChange={handleChange('displayName')}                
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleChange('email')}                
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                type="number"
                onChange={handleChange('phone')}                
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                maxLength="2"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange('password')}                
                />
            </Grid>
            <p id="error" style={{marginLeft: "9px", color: "red"}}></p>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to the terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Continue
          </Button>
          
        </form>
      </div>
      <Box mt={5}>
        <Copyright/>f
      </Box>
    </Container>
    </Grid>
  );
}