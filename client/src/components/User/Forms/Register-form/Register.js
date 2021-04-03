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



export default function Register() {
  const classes = useStyles();

  const history = useHistory();

  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const changeHandler = (event) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };

  const submitButton = (event) => {
    event.preventDefault();
    
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
          // console.log(response.data);
          console.log(response.data);
          history.push("/");
        })
        .catch((error) => {
           console.error(`Error :${error}`);
        });
    
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
              autoComplete="text"
              autoFocus
              onChange={changeHandler}
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
              onChange={changeHandler}
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
              onChange={changeHandler}
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
              onChange={changeHandler}
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
            />
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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